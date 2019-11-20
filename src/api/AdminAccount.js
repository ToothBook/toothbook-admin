const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, required: true }
    }, 
);

const AdminAccnt = mongoose.model("AdminAccnt", AdminSchema);

module.exports = AdminAccnt;