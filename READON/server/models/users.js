
import mongoose from "mongoose"; 


// defining a schema // A schema in Mongoose is a blueprint or structure that defines the shape of documents in a MongoDB collection.
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartItems: {type: Object, default: {}},

},{minimize: false}) // minimize: false tells Mongoose to store empty objects (e.g., {}) instead of stripping them out.

//Normally Mongoose removes empty objects; this keeps them.




// creating model user using userSchema  //A model provides an interface to interact with the database — to create, read, update, and delete (CRUD) documents based on the rules defined in a schema.
const User = mongoose.model.user || mongoose.model('user', userSchema)

export  default User