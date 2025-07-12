const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    class: String,
    batchYear: Number,
    gender: String,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
