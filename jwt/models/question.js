const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
  //  post: { type: String, ref: 'question' },
    username: { type: String, required: true },
    content: { type: String, required: true },
    Dateofcomment: { type: Date, required: true, default: Date.now() },
});
module.exports = mongoose.model("comment", commentSchema);
const questionSchema = new mongoose.Schema({
    question: { type: String, default: null, required: true },
    discription: { type: String, default: null, required: true },
    username: { type: String, required: true },
    Dateofquestion: { type: Date, required: true, default: Date.now() },
    comments: [commentSchema]

});

module.exports = mongoose.model("question", questionSchema);
