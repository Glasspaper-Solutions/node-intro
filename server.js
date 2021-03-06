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

app.put('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)

    let item = cart.find(item => item.id === cartId)

    if( !item) {
        res.status(404).send(`We could not find item with id ${cartId}`)
    } else {
        const { id, title, price } = req.body

        const indexInArray = cart.findIndex(item => item.id === cartId)

        item.id = id ? id : item.id
        item.title = title ? title : item.title
        item.price = price ? price : item.price

        cart[indexInArray] = item

        res.send(cart)
    }

})

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
// kj??re npm init fra folderen du har laget
// kj??re npm i express
