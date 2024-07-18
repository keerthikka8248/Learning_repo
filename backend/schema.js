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


const SubtopicSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  explanation: { type: String, required: true },
  code: { type: String },
  image: { type: String }
});


const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  commonHeading: { type: String },
  subtopics: [SubtopicSchema]
});


const CourseSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  courseName: { type: String, required: true },
  sections: [SectionSchema],
  interviewQuestions: [{ type: String }],
  learningResources: [{ type: String }]
});

const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('Userdetails',Userdetail_Schema)
const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = {User,Quiz,Course} 