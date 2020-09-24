const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const alunos = require('./controllers/alunos')


routes.get('/', function (req, res) {
    return res.redirect("/instructors")
})

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post("/instructors", instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)




routes.get('/alunos', alunos.index)
routes.get('/alunos/create', alunos.create)
routes.get('/alunos/:id', alunos.show)
routes.get('/alunos/:id/edit', alunos.edit)
routes.post("/alunos", alunos.post)
routes.put("/alunos", alunos.put)
routes.delete("/alunos", alunos.delete)



module.exports = routes