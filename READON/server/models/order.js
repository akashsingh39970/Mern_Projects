// import mongoose from "mongoose";


// const orderSchema = mongoose.Schema({
//     userId: {type: String, required: true, ref: 'user'},
//     items: [{
//         product: {type: String, required: true, ref: 'product'}, //reference to product model
//         quantity: {type: Number, required: true}
//     }],
//     amount: {type: Number, required: true},
//     address: {type: String, required: true, ref: 'address'},
//     status: {type: String, default: 'order placed'},
//     paymentType: {type: String, required: true},
//     isPaid: {type: Boolean, required: true, default: false},
// },{timestamps: true})

// const Order = mongoose.models.order || mongoose.model('order', orderSchema);

// export default Order;
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    amount: { type: Number, required: true },
    address: { type: Schema.Types.ObjectId, ref: 'address', required: true },
    status: { type: String, default: 'order placed' },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
}, { timestamps: true });

const Order = models.order || model('order', orderSchema);
export default Order;
