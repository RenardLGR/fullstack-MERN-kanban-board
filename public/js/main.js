document.querySelector('h2').innerText += " JS works"

import Column from "./Column.js"

const columns = Array.from(document.querySelectorAll('.kanban__column')).map(div => new Column(div))