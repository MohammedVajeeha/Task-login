const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors')

const app = express();

app.use(bodyParser.json());

const corsOptions = {

  origin: 'http://localhost:3000', // Replace with your frontend URL

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

  credentials: true,

  optionsSuccessStatus: 204,

};

app.use(cors(corsOptions));

const username = 'vajeeha';

const password = 'vajeehadb';

const clusterUrl = 'cluster0.3uinwya.mongodb.net';

const dbName = 'taskDb';

const databaseUrl = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`;

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {

    console.log('Connected to the database');

  })

  .catch(error => {

    console.error('Error connecting to the database:', error);

  });



const userSchema = new mongoose.Schema({

  firstName: String,

  lastName: String,

  employeeId: String,

  email: String,

  password: String,

  phoneNumber: String,

  designation: String,

  location: String,

  profilePicture: String,

  agreeTerms: Boolean,


});



const User = mongoose.model('Userdata', userSchema);


app.post('/signup', async (req, res) => {



  const userData = req.body;



  console.log(userData);



  try {



    const newUser = new User(userData);



    await newUser.save();



    res.status(201).json({ message: 'User signed up successfully' });



  } catch (error) {



    console.error('An error occurred while signing up:', error);



    res.status(500).json({ error: 'Failed to sign up' });



  }



});

app.put('/updateProfile', async (req, res) => {
  const updatedFields = req.body;

  try {
    const userEmail = updatedFields.email; // Assuming you have the user's email in the updated data
    await User.findOneAndUpdate({ email: userEmail }, updatedFields);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {



  console.log(`Server is running on port ${PORT}`);



});





app.get('/profile/:email', async (req, res) => {

  // const userEmail = req.query.email;
  const userEmail = req.params.email;
  // console.log("11111",req.params)



  try {
    console.log("email", userEmail)
    const user = await User.findOne({ email: userEmail });

    if (user) {

      res.status(200).json({ user });

    } else {

      res.status(404).json({ error: 'User not found' });

    }

  } catch (error) {

    console.error('Error fetching user profile:', error);

    res.status(500).json({ error: 'Failed to fetch user profile' });

  }

});



app.get(("/"), (req, res) => {



  res.send("Hi from Backend")



})




app.post('/signin', async (req, res) => {

  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email, password });
    if (user) {

      // User exists, valid credentials


      res.status(200).json({ message: 'Sign in successful', usernameMatch: true, user });


    } else {
      res.status(401).json({ error: 'Invalid credentials', usernameMatch: false });
    }

  } catch (error) {

    console.error('An error occurred while signing in:', error);


    res.status(500).json({ error: 'Failed to sign in' });
  }
});

module.exports = router;







