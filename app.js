const express = require('express')
const sequelize = require('./util/sequelize')
const cors = require('cors')
const bodyParser = require('body-parser')
const Task = require('./models/task')

const app = new express()
const server = require('http').createServer(app)
require('dotenv').config()
app.use(cors())

PORT = process.env.PORT

sequelize
.sync({ force: false })
.then(result => {
    server.listen(PORT)
    console.log(`Server is listening on port: ${PORT}`)
})
.catch(err => {
    console.log(err)
});

app.use(bodyParser.json({ extended: true }))

app.post("/createTask", async (req, res, next) => {
    const name = req.body.name
    const description = req.body.description
    const date = req.body.unixDate

    const task = await Task.create({
        name,
        description,
        date,
    })

    if (task) {
        return res.json({ status: true, data: task })
    }
    return res.json({ status: false, data: 'Unable to create new task' })
});

app.get("/getTasks", async (req, res, next) => {
    const tasks = await Task.findAll();
    if (tasks) {
        return res.json({ status: true, data: tasks });
    }
    return res.json({ status: false, data: 'Unable to fetch tasks' })
});

app.post("/deleteTask", async (req, res, next) => {
    const deletedTask = await Task.findOne({ where: { id: req.body.id } });
    const destroy = await Task.destroy({ where: { id: req.body.id } });
    if (destroy) {
        return res.json({ status: true, data: deletedTask })
    }
    return res.json({ status: false, data: 'Unable to delete task' })
})

app.post("/changeTaskStage", async (req, res, next) => {
    const updatedTask = Task.update(
        { done: req.body.done },
        { where: { id: req.body.id } }
    )
    if (updatedTask) {
        return res.json({ status: true, data: req.body.id })
    }
    return res.json({ status: false, data: 'Unable to update task' })
})