//index.js

const express = require("express")
const app = express()

const {mongoose} = require("mongoose")

const {User,Quiz} = require("./schema.js")

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require("cors")
app.use(cors())

const bcrypt = require('bcrypt');

const port = process.env.PORT || 8000

async function DBconnection(){
    try{
        await mongoose.connect("mongodb://localhost:27017/elearning")
        app.listen(port,function(){
            console.log(`Connected to DB,Listening to port : ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}
DBconnection()

app.get("/",function(request,response){
    response.send("Welcome to Learning APP")
})

// **User Signup** //
app.post("/signup", async function(request, response) {
    try {
        const { username, emailid, password } = request.body;

        // Check if email is already in use
        const existingUser = await User.findOne({ emailid });
        if (existingUser) {
            return response.status(409).json({ error: "User with this email already exists. Please login." });
        }

        // Check if username is already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return response.status(409).json({ error: "Username is already taken. Please choose another one." });
        }
        

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailid)) {
            return response.status(400).json({ error: "Invalid email format." });
        }

        // Validate password strength (e.g., minimum length)
        if (password.length < 6) {
            return response.status(400).json({ error: "Password must be at least 6 characters long." });
        }

        // Hash the password
        const encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({
            username,
            emailid,
            password: encryptedUserPassword
        });

        response.status(201).json({ status: "success", msg: "User added successfully." });
    } catch (error) {
        console.error("Error during signup:", error);
        response.status(500).json({ status: "failure", msg: "Couldn't signup. Please try again later.", error: error.message });
    }
});

app.post("/login", async (request, response) => {
    try {
      const emailid = request.body.emailid;
      const password = request.body.password;
      if (!(emailid && password)) {
        return response.status(400).json({ error: "Email and password are required." });
      }
  
      const user = await User.findOne({ emailid });
      if (!user) {
        return response.status(400).json({ error: "User not found." });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return response.status(400).json({ error: "Password is incorrect." });
      }

      
  
      console.log("Login Successful!!!");
      response.status(200).json({ message: "Login successful", username: user.username, emailid: user.emailid });
    } catch (error) {
      console.error("Error during login:", error);
      return response.status(500).json({ error: "An unexpected error occurred during login." });
    }
  });


  // Route to add quiz questions
app.post('/add-quiz', async (req, res) => {
  try {
    const { conceptId, questions } = req.body;
    let quiz = await Quiz.findOne({ conceptId });

    if (!quiz) {
      quiz = new Quiz({ conceptId, questions });
    } else {
      quiz.questions.push(...questions);
    }

    await quiz.save();
    res.status(201).json({ message: 'Quiz questions added successfully' });
  } catch (error) {
    console.error('Error adding quiz questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add this to your existing routes in index.js
app.get('/quiz/:conceptId', async (req, res) => {
  const conceptId = req.params.conceptId;

  try {
    const quiz = await Quiz.findOne({ conceptId });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz questions not found' });
    }

    const formattedQuestions = quiz.questions.map(question => ({
      _id: question._id,
      questionText: question.questionText,
      questionType: question.questionType,
      options: question.options,
      correctAnswer: question.correctAnswer
    }));

    res.json(formattedQuestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route to submit quiz answers and calculate score
app.post("/quiz/:conceptId/submit", async (req, res) => {
  const conceptId = req.params.conceptId;
  const { userId, answers } = req.body;

  try {
    const quiz = await Quiz.findOne({ conceptId });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    let score = 0;
    quiz.questions.forEach((question) => {
      if (question.correctAnswer === answers[question._id]) {
        score += 1;
      }
    });

    // You can save the score to a database here if needed
    // This example will just return the score without saving it

    res.json({ score }); // Send the score as JSON
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//fetching Users
app.get('/fetchusers', async (req, res) => {
  try {
    const users = await User.find({}, 'username emailid');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//deleting Users

app.delete('/deleteusers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
