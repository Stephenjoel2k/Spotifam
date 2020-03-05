const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const auth = require('./Routes/auth.js')
const queue = require('./Routes/queue.js')

//Middleware
app.use(bodyParser.json())

//Routes
app.use('/auth', auth)
app.use('/queue', queue)

// // Handle production
// if (process.env.NODE_ENV === 'production') {
//   // Static folder
//   app.use(express.static(__dirname + '/public/'));
//   // Handle SPA
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

//Hosting PORT
const port = process.env.PORT || 8888
console.log(`Listening on port ${port}.`)
app.listen(port)
