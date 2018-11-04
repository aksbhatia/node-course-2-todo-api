const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

if(err) {
    return console.log('Unable to connect to MongoDB server');
}
console.log('Connected to MongoDB server');

const db = client.db('TodoApp');

// db.collection('Todos').find({
//     _id: new ObjectID('5bdbaae81c7936981cd555c5')
// }).toArray().then((docs) => {
//     console.log('Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
// }, (err) => {
//     console.log('unable to fetch todos);')
// })

// db.collection('Todos').find().count().then((count) => {
//     console.log(`Todos count:${count}`);
//     console.log(JSON.stringify(count, undefined, 2));
// }, (err) => {
//     console.log('unable to fetch todos);')
// })

db.collection('Users').find({name: 'Akshay Bhatia'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
    console.log('Unable to fetch Users');
});


});
