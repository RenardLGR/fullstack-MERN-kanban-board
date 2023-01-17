// const Task = require('../models/Task.js')

module.exports = {
    getKanban: async (req, res) => {
        try {
            // const tasks = await Task.find().sort().lean();
            // const tasksNotStarted = tasks.filter(t => t.status === "Not Started")
            const tasksNotStarted = {title : "It works"}
            res.render("kanban.ejs", { tasksNotStarted: tasksNotStarted });
          } catch (err) {
            console.log(err);
          }
    }

}