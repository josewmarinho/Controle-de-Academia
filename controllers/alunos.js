const fs = require('fs')
const data = require("../data.json")
const {  date } = require("../utils")

//index
exports.index = function (req, res) {
    return res.render("alunos/index", { alunos: data.alunos })
}

// create
exports.create = function (req, res) {
    return res.render("alunos/create")
}

// post
exports.post = function (req, res){


    const keys = Object.keys(req.body)
    
    for(key of keys){
        if (req.body[key] ==""){
            return res.send('Please, fill all fields!')
        }
    }

    

    //let {
    //    avatar_url, 
    //    birth, 
    //    name,
    //    email,
    //    gender,
    //    blood,
    //    weight,
    //    height
    //    } = req.body

    birth = Date.parse(req.body.birth)

    let id = 1
    const lastUser = data.alunos[data.alunos.length - 1]

    if (lastUser) {
        id = lastUser.id + 1
    }



    data.alunos.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect(`/alunos/${id}`)
    })
    
    // return res.send(req.body)
}

//show
exports.show = function(req, res) {
    const { id } = req.params

    const foundAluno = data.alunos.find(function(aluno){
        return aluno.id == id

    })
    
    if (!foundAluno) return res.send("Aluno not found!")


    const aluno = {
        ...foundAluno,
        birth: date(foundAluno.birth).birthDay
    }

    return res.render("alunos/show", {aluno})
}

//edit
exports.edit = function (req, res){   
    const { id } = req.params

    const foundAluno = data.alunos.find(function(aluno){
        return aluno.id == id

    })
    
    if (!foundAluno) return res.send("Aluno not found!")
    

    const aluno = {
        ...foundAluno,
        birth: date(foundAluno.birth).iso
    }


    return res.render('alunos/edit', { aluno })
}

//update
exports.put = function (req, res){
    const { id } = req.body
    let index = 0

    const foundAluno = data.alunos.find(function(alunos, foundIndex){
        if (id == alunos.id) {
            index = foundIndex
            return true
        }
    })
    
    if (!foundAluno) return res.send("Aluno not found!")

    const aluno = {
        ...foundAluno,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.alunos[index] = aluno

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write erro!")

        return res.redirect(`/alunos/${id}`)
    })
}

//delete
exports.delete = function (req, res) {
    const { id } = req.body
    
    const filteredAlunos = data.alunos.filter(function(aluno){
        return aluno.id != id
    })

    data.alunos = filteredAlunos

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/alunos")
    })
}

