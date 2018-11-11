const express = require('express');
const bodyparser = require('body-parser');
const _ = require('lodash')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {ObjectID} = require('mongodb')

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.post('/todos', (req, res) => {


    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
         if(!todo) {
             res.status(400).send();
         }
             res.status(200).send(todo)
    }).catch((e) => {
        res.status(400).send(); 
    })
})

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['text','completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();

    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
             res.status(404).send();
        }
        
        res.send({todo})

    }).catch((e) => {
        res.status(400).send();
    })
})

//POST /users
app.post('/users', (req,res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save(body).then((result) => {

        return user.generateAuthToken();


        if(!result) {
            res.status(400).send();
        }
        console.log('Successfully saved user', result)
        res.status(200).send()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
         console.log('Error occurred', e);
         return res.status(400).send()
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})


