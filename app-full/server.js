const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')
const port = 5100;

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views' , {
    express:server,
    autoescape: false,
    noCache: true
})

server.get('/' , function (req,res) {
    return res.render('index')
})

server.get('/sobre', function(req,res) {
    const about = {
        avatar_url: "./me.png",
        name: "Eduardo Campos",
        role: "NodeJS, um pouco de Vue e React e mais um pouco de laravel. :D",
        description: 'Desenvolvedor',
        link: [
            {name: "Github", url: "https://github.com/eduardoascampos", option:"_blank"},
            {name: "LinkedIn", url: "https://www.linkedin.com/in/eduardoascampos/" , option:"_blank"},
        ]
    }
    return res.render('about', {about})
})

server.get('/aulas', function(req,res) {
    return res.render('aulas', {items:videos})
})

server.get('/video', function(req,res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if(!video) {
        return res.send('Video not found!')
    }
    return res.render('video', { item: video})
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})