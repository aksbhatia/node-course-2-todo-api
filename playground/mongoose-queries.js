const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb')
const {User} = require('../server/models/user');


var id = '5bde6d6959569606f2f';
var user_id = '5be1ef82c34eded5424e4744'

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// })

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('id not found');
    }
    console.log('Todo', todo);
}).catch((e) => {console.log(e)});


User.findById(user_id).then((user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log('Found User', user);
}).catch((e) => {
    return console.log('Error occurred', e);
})
