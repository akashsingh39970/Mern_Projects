import Address from "../models/address.js";


// Add address : /api/address/add
export const addAddress = async (req, res) =>{
    try {
        const {address, userId} = req.body;
        await Address.create({...address, userId})
        res.json({success: true, message: 'Address added'});

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}


// Get all addresses : /api/address/list.

export const getAddressList = async (req, res) => {
    try {
        const { userId } = req.query;
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}
