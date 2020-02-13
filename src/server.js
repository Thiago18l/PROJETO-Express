const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const porta = 3000
const app = express()

/*
app.get('/produtos',  (req, res, next)=>{
    console.log('Middleware 1...')
    next()
})*/ 

app.use(bodyParser.urlencoded({ extended: true })) // se não utilizar o extended vai dizer que esta depreciado.


app.get('/produtos', (req, res, next) =>{
    res.send(db.getProdutos()) // Converte automaticamente para JSON.
}) // middleware pattern 

app.get('/produtos/:id', (req, res, next) =>{
    res.send(db.getProduto(req.params.id))
})

app.post('/produtos', (req, res, next) =>{
    const produto = db.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) // converte em JSON
})

app.put('/produtos/:id',(req, res, next) =>{
    const produto = db.salvarProduto({
        id: req.params.id, // o ID vem pelo parametro... 'produtos/id'
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto)
})

app.delete('/produtos/:id',(req, res, next)=>{
        const produto = db.excluirProduto(req.params.id) // deleta pelo ID que vem pelo parametro
        res.send(produto)
})

app.listen(porta, ()=> {
    console.log(`Servidor sendo executado na porta ${porta}.`)
})

