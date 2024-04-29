const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()

const PORT = 3000

const createPathHTNL = (page) => path.resolve(__dirname, 'dst/html', `${page}.html`)

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static('dst/js'))

app.get('/', (req, res) => {
    res.sendFile(createPathHTNL('index'))
})

app.get('/home', (req, res) => {
    res.redirect('/')
})

app.use((req, res) => {
    res
    .status(404)
    .send('<h1>Page Not Found (404)</h1>')
})