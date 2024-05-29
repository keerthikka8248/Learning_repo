const mongoose = require("mongoose")

const Userdetail_Schema = mongoose.Schema({
    
    username:{
        type : String
    },
    emailid:{
        type : String
    },
    password:{
        type : String
    }
},{ versionKey: false })

const QuizSchema = new mongoose.Schema({
  conceptId: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      questionType: { type: String, enum: ['multipleChoice', 'trueFalse', 'shortAnswer'], required: true },
      options: { type: [String] },
      correctAnswer: { type: String, required: true },
    },
  ],
});

const User = mongoose.model('Userdetails',Userdetail_Schema)
const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = {User,Quiz} 