const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname + '/index.html');
});

app.post("/",function(req,res)
{
    var email = req.body.email;
    email = email.trim();
    var password = req.body.pass;
    password = password.trim();
    if(email == "aagamshah109@gmail.com" && password == "1234")
    {
        res.send("<h1>Welcome to Admin Dashboard</h1>");
    }
    else
    {
        res.sendFile(__dirname + '/index.html');
    }

});

app.listen(3000,function()
{
    console.log('Server is Running at Port 3000');
});