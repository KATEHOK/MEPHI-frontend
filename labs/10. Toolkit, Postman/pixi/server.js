const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()

const PORT = 3000

const createPathHTNL = (page) => path.resolve(__dirname, 'html', `${page}.html`)
const createPathModule = (module) => path.resolve(__dirname, 'node_modules', `${module}.js`)

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static('js'))
app.use(express.static('img'))

app.get('/', (req, res) => {
    res.sendFile(createPathHTNL('index'))
})

app.get('/pixi.js', (req, res) => {
    res.sendFile(createPathModule('pixi'))
})

app.get('/home', (req, res) => {
    res.redirect('/')
})

app.use((req, res) => {
    res
    .status(404)
    .send('<h1>Page Not Found (404)</h1>')
})