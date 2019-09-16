const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyC6j6eiC_1Xiqji-qrsFLJKDhOqJSWh4hY",
    authDomain: "fir-nodejs-6588e.firebaseapp.com",
    databaseURL: "https://fir-nodejs-6588e.firebaseio.com",
    projectId: "fir-nodejs-6588e",
    storageBucket: "",
    messagingSenderId: "875141678251",
    appId: "1:875141678251:web:a39582795959a2732023ee"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname + '/index.html');
});

var login = 1;

app.post("/",function(req,res)
{
    var email = req.body.email;
    email = email.trim();
    var password = req.body.pass;
    password = password.trim();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          console.log('Wrong password.');
          login = 0;
        }
         else {
            login = 0;
        }
        // [END_EXCLUDE]
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) 
        {
            console.log('Logged in');
        } else 
        {
            console.log('Wrong');
        }
      });
});

app.listen(3000,function()
{
    console.log('Server is Running at Port 3000');
});