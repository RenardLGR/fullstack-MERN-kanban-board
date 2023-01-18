document.querySelector('h2').innerText += "It works"

import Column from "./Column.js"

const columns = Array.from(document.querySelectorAll('.kanban__column')).map(div => new Column(div))