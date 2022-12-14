const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require('mongoose') 

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Social-Network-Api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => 
console.log('MongoDB Endpoint Connection Successful!')
);

mongoose.connection.on('error', (err) => 
console.log(`Mongoose disconnected, error code: ${err}`)
);

mongoose.set('debug', true)

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log((`Server connected on to localhost:${PORT}`))
})