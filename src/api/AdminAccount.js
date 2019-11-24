const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})

// AdminSchema.pre("save", function(next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });

const AdminAccnt = mongoose.model("AdminAccnt", AdminSchema);

module.exports = AdminAccnt;