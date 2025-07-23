
import mongoose from "mongoose"; 


// defining a schema // A schema in Mongoose is a blueprint or structure that defines the shape of documents in a MongoDB collection.
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: Array, required: true, },
    price: {type: Number, required: true},
    offerPrice: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String , required: true},   
    inStock: {type: Boolean, default: true}, // inStock is a boolean that indicates whether the product is available for purchase.

},{timestamps: true }) // timestamps adds createdAt and updatedAt fields to the schema, automatically managing their values.

//Normally Mongoose removes empty objects; this keeps them.




// creating model user using userSchema  //A model provides an interface to interact with the database — to create, read, update, and delete (CRUD) documents based on the rules defined in a schema.
const Product = mongoose.model.product || mongoose.model('product', productSchema)

export  default Product 