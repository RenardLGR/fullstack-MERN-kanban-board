const Task = require('../models/Task.js')

module.exports = {
    getKanban: async (req, res) => {
        try {
            const tasks = await Task.find().sort().lean();
            const tasksNotStarted = tasks.filter(t => t.status === "Not Started")
            const tasksInProgress = tasks.filter(t => t.status === "In Progress")
            const tasksCompleted = tasks.filter(t => t.status === "Completed")
            const tasksOnHold = tasks.filter(t => t.status === "On Hold")
            res.render("kanban.ejs", { controllerWorks: "Controller works", tasksNotStarted: tasksNotStarted, tasksInProgress: tasksInProgress, tasksCompleted: tasksCompleted, tasksOnHold: tasksOnHold });
        } catch (err) {
            console.log(err);
        }
    },

    postItem: async (req, res) => { //called one add button clicked, description is empty until item is editted which is a different step
        try {
            const newTask = await Task.create({ description: req.body.description, status: req.body.status })
            console.log('Task has been added!')
            res.json(newTask)
        } catch (err) {
            console.log(err)
        }
    },


    editItem: async (req, res) => { //edit item content, for edit status, see below
        try {
            const itemId = req.body.itemId
            const newDescription = req.body.description
            const editedItem = await Task.findOneAndUpdate({ _id: itemId }, { description: newDescription })
            console.log('Updated!')
            //res.json(editedItem) findOneAndUpdate() doesn't return the edited object
            res.json("Item updated in DB")
        } catch (err) {
            console.log(err)
        }
    },

    editStatus: async (req, res) => { //edit item status (change of column), for edit status, see above
        try {
            const itemId = req.body.itemId
            const newDescription = req.body.description
            const newStatus = req.body.status
            const editedItem = await Task.findOneAndUpdate({_id: itemId}, { description: newDescription, status: newStatus })

            console.log("Status changed!")
            res.json("Status changed in DB")
        } catch (err) {
            console.log(err)
        }
    },

    deleteItem: async (req, res) => {
        try{
            const itemId = req.body.itemId
            await Task.findOneAndDelete({_id: itemId})
            console.log('Task deleted!')
            res.json('Task deleted!')
        }catch(err){
            console.log(err)
        }
    }
}