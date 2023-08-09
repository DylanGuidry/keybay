const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

//Middleware
const app = express();
//Parse the body of the request into json. Goes after app is defined
app.use(bodyParser.json());
//Allow cross origin requests
app.use(cors());

//Temporary database (hard coded)
const database = {
    users: [{
            id: '123',
            name: 'John',
            email: 'jon@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '1234',
            name: 'Bill',
            email: 'bill@gmail.com',
            password: 'buns',
            entries: 0,
            joined: new Date()
        }
    ], 
    login: [{
        id: '987',
        hash: '',
        email: 'john@gmail.com'
    }]
}

//Routes (endpoints)
app.get('/', (req, res) => {
    res.json(database.users);
});

//Signin route (POST)
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('error logging in');
        }
});

//Profile route (GET)
app.get('/profile/:id', (req, res) => {
    //Destructure the request parameters (id)
    const { id } = req.params;
    //Set found to false (default)
    let found = false;
    //Loop through the database users and find the user with the matching id
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    //If user is not found
    if (!found) {
        res.status(404).json('no such user');
    }
});

//Image route (PUT)
app.put('/image', (req, res) => {
    //Destructure the request body
    const { id } = req.body;
    //Set found to false (default)
    let found = false;
    //Loop through the database users and find the user with the matching id
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    //If user is not found
    if (!found) {
        res.status(404).json('no such user');
    }
});


//Register route (POST)
app.post('/register', (req, res) => {
    //Destructure the request body
    const { email, name, password } = req.body;
    //Push new user to database
    database.users.push({
        id: '12345',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    //Return the last user in the database
    res.json(database.users[database.users.length-1]);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
