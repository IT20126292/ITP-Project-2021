const mongoose = require("mongoose");
const schema = mongoose.Schema;
const AdminSchema = new schema({
    adminID : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
})

const Admin = mongoose.model("Admin",AdminSchema);

module.exports = Admin;