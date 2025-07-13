import Order from "../models/order.js";
import Product from "../models/product.js";

import  stripe, { Stripe } from "stripe";
import User from '../models/users.js';  


//place order COD : /api/order/cod
// export const placeOrderCod = async (req, res) =>{
//     try {
//         const { items, address }= req.body;
//         const userId = req.user;
//         if(!address || items.lenght === 0){
//             return  res.json({success: flase, message: ' Invalid data'});
//         }
//         //calculate amount using items
//         let amount = await items.reduce(async (acc, item) =>{
//             const prodduct = await Product.findById(item.product);
//             return (await acc) + prodduct.offerPrice * item.quantity;

//         }, 0)

//         //Add tax charge  (2%)
//         amount += Math.floor(amount * 0.2);

//         await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType: 'COD',
//         });

//         return res.json({success: true, message: 'order placed'});

//     } catch (error) {
//         console.log(error.message);
//         return res.json({success: false, message: error.message});
        
//     }
// }


//place order COD : /api/order/cod
export const placeOrderCod = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.user;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: 'Invalid data' });
        }

        
        //calculate amount using items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // calculating 2% tax
        amount += Math.floor(amount * 0.2);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD',
        });
        
console.log("✅ Order created:", Order);

        return res.json({ success: true, message: 'order placed' });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};





// Get Order by USerId   : /api/order/user

export const getUserOrder = async (req, res) =>{
    try {
        const userId = req.user;
        console.log("REQ.USER:", req.user);
        
        const orders = await Order.find({
            userId,
            $or: [{paymentType: 'COD'},{isPaid: true}]
        }).populate('items.product address').sort({createdAt: -1});
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


//Get All order for selelr/admin:  /api/order/seller

export const getAllOrders = async (req, res) =>{
    try {
       
        const orders = await Order.find({
            $or: [{paymentType: 'COD'},{isPaid: true}]
        }).populate('items.product address').sort({createdAt: -1});
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


//place order STRIPE : /api/order/stripe
export const placeOrderStripe  = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.user;
        const {origin} = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: 'Invalid data' });
        }

        let productData = [];


        //calculate amount using items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        //adding 2% tax
        amount += Math.floor(amount * 0.2);

       const  order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'Online',
        });
        
        //stripe gateway initliazie
            const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

            //CREATE LINE ITEMS FOR STRIPE
            const line_items = productData.map((item)=>{
                return {
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: item.name,

                        },
                        unit_amount: Math.floor(item.price + item.price * 0.02) * 100

                    },
                    quantity: item.quantity,

                }
            })

            // create session
            const session = await stripeInstance.checkout.sessions.create({
                line_items,
                mode: 'payment',
                success_url: `${origin}/loader?next=myorders`,
                cancel_url: `${origin}/cart`,
                metadata:{
                    orderId: order._id.toString(),
                    userId,
                }

            })

        return res.json({ success: true, url: session.url});

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};


// Stripe Webhooks to verify payments Action : /stripe
export const stripeWebhooks = async (req, res) =>{
    //stripe gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET,
        );
    } catch (error) {
            res.status(400).send(`Webhook Error: ${error.message}`)
    }

    // handel the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntnetId = paymentIntent.id;

            //getting session metadata
            const session = await stripeInstance.checkout.session.list({
                payment_intent: paymentIntnetId,
            });

            const {orderId, userId} = session.data[0].metadata;
            //Mark payment as paid
            await Order.findByIdAndUpdate(orderId, {isPaid: true})
            //Clear user cart
            await User.findByIdAndUpdate(userId, {cartItems: {}});
                        break;

        }
         case "payment_intent.payment_failed ":{
            const paymentIntent = event.data.object;
            const paymentIntnetId = paymentIntent.id;

            //getting session metadata
            const session = await stripeInstance.checkout.session.list({
                payment_intent: paymentIntnetId,
            });

            const {orderId} = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;

         }
            
    
        default:
            console.error(`unhadeled event type: ${event.type}`)
            break;
    }
    res.json(  {received: true} );


}



