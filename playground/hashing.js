const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var password = '123abc'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        //console.log(hash)
    })
})

var hashedPassword = '$2a$10$T80X9owPski2n6uag7d6A.bWPdoyd8.J/MRuWQkKPD1KFf3LvaANm'

bcrypt.compare(password, hashedPassword, (error, res) => {
    console.log(res)
})



// var data = {
//     id: 10
// }

// var token = jwt.sign(data, '123abc')
// console.log(token)
// var decoded = jwt.verify(token, '123abcd')
// console.log('Decoded', decoded)

// var message = 'I am user number 3'
// var hash = SHA256(message).toString()

// console.log(`Message ${message}`)
// console.log(`Hash ${hash}`)

// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // //man in the middle
// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// }
// else {
//     console.log('Data was changed. Dont Trust')
// }
