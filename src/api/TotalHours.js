const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TotalHoursSchema = Schema(
    {
        totalHours: {type: Number, required: true},
        hoursRequested: [{
            minutes: {type: Number, required: true},
            date: {type: Date, required: true}
        }],
    }, 
);

const TotalHours = mongoose.model("TotalHours", TotalHoursSchema);

module.exports = TotalHours;