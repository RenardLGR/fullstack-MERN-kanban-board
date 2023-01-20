const Task = require('../models/Task.js')

module.exports = {
    getKanban: async (req, res) => {
        try {
            // const tasks = await Task.find().sort().lean();
            // const tasksNotStarted = tasks.filter(t => t.status === "Not Started")
            // res.render("kanban.ejs", {title: {title: "it works"}});
            // res.render("kanban.ejs", { tasksNotStarted: {title : "It works"}, controllerWorks: {title : "It works"}});
            res.render("kanban.ejs", {controllerWorks: "Controller works"});
          } catch (err) {
            console.log(err);
          }
    },

    postItem: async (req, res) => { //called one add button clicked, description is empty until item is editted which is a different step
        try{
            const newTask = await Task.create({description: req.body.description, status: req.body.status})
            console.log('Task has been added!')
            res.json(newTask)
        }catch(err){
            console.log(err)
        }
    },


    editItem: async (req, res) => { //edit item content, for edit status, see below
        try {
            const itemId = req.body.itemId
            const newDescription = req.body.description
            const editedItem = await Task.findOneAndUpdate({_id: itemId}, {description: newDescription})
            console.log('Updated!')
            //res.json(editedItem) findOneAndUpdate() doesn't return the edited object
            res.json("Item updated in DB")
        } catch (err) {
            console.log(err)
        }
    },

    editStatus: async (req, res) => {

    }
}