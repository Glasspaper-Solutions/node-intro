const express = require('express')
const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let cart = [
    {"id": 1, "title": "Bread", "price": 30},
    {"id": 2, "title": "Milk", "price": 20},
    {"id": 3, "title": "Butter", "price": 25}
]

app.post('/cart', (req, res) => {
    const item = req.body
    cart.push(item)

    console.log('Trigger post cart', item)
    res.send(item)
})

/* app.put('/cart/:id', (req, res) => {
    const cartId = req.params.id

    const item = cart.find(item => item.id === parseInt(cartId))

    if( !item) {
        res.status(404).send(`We could not find item with id ${cartId}`)
    } else {
        const { id, title, price } = req.body
        const newItem = {...item, id, title, price }

        const newCart = [...cart, ]

    }

}) */

app.delete('/cart/:id', (req, res) => {
    let itemId = parseInt(req.params.id)

    const newCart = cart.filter(item => item.id !== itemId)

    cart = newCart

    res.send(newCart)
})

app.get('/cart', (req, res) => {
    res.send(cart)
})

app.get('/hello2/:firstname/:lastname', (req, res) => {

    res.send(`${req.params.firstname}${req.params.lastname}`)
})



app.get('/cart/:id', (req, res) => {
    const paramId = req.params.id

    const cartItem = cart.find(item => item.id === parseInt(paramId))

    if(!cartItem) {
        res.status(404).send(`We could not find item with id ${paramId}`)
    } else {
        res.send(cartItem)
    }
})

app.get('/hello', (req, res) => {
    res.send('Hello From here')
})

app.get('/hello/:name', (req, res) => {
    // http://localhost:3001/hello/Glenn?lastname=Nytveit
    res.send(`Hello ${req.params.name} ${req.query.lastname}`)
})

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(port, () => {
    console.log(`This application running on ${port}`)
})



// lage en ny folder
// lage en js fil
// kjøre npm init fra folderen du har laget
// kjøre npm i express
