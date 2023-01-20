// import KanbanAPI from "../api/KanbanAPI.js"
import DropZone from "./DropZone.js"

export default class NewItem{
    constructor(colTitle, content){

        const bottomDropZone = DropZone.createDropZone()

        this.elements = {}
        this.elements.colTitle = colTitle
        this.elements.root = NewItem.createRoot()
        this.elements.input = this.elements.root.querySelector(".kanban__item-input")
        this.elements.root.dataset.id
        this.elements.input.textContent = content
        this.content = content

        this.elements.root.appendChild(bottomDropZone) //append our dropzone to our elements

        const onBlur = async () => { //when we click away from the input bow of a new/edit item //when focus is lost
        //if the content has changed, update local storage
            const newContent = this.elements.input.textContent.trim()

            if(newContent === this.content) {
                return
            }

            this.content = newContent
            try{
                let itemId = this.elements.root.dataset.id
                console.log(itemId, this.content)
                const response = await fetch('/editItem', {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        itemId: itemId,
                        description: this.content,
                    })
                })
                const data = await response.json()
                console.log(data)
                // location.reload()
            }catch(err){
                console.log(err)
            }
        }

        this.elements.input.addEventListener('blur', onBlur)//when click away from the input event

        this.elements.root.addEventListener('dblclick', () => { //deleting item by double clicking
            const check = confirm("Are you sure you want to delete this task")

            if(check){ //if ok/confirm was clicked
                //KanbanAPI.deleteItem(id) //local storage call
                this.elements.input.removeEventListener("blur", onBlur)
                this.elements.root.parentElement.removeChild(this.elements.root) //user interface call
            }

        })//when double click the input event //double click will delete the item

        this.elements.root.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", id)
        })

        this.elements.input.addEventListener("drop", (event) => {
            event.preventDefault()
        })
    }

    async createItem(){ //create item in the DB
        try{
            const response = await fetch('/postItem', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    description: 'empty',
                    // description: (new Date()).toString(),
                    status: this.elements.colTitle
                })
            })
            const data = await response.json()
            console.log(data)
            this.elements.root.dataset.id = data._id
            //location.reload()
        }catch(err){
            console.log(err)
        }
    }

    static createRoot(){
        const range = document.createRange() //chain of items

        range.selectNode(document.body) //hooking place i.e context node

        return range.createContextualFragment(`
        <div class="kanban__item" draggable="true">
            <div class="kanban__item-input" contenteditable></div>
        </div>
        `).children[0] //HTML-like string to be converted into a document fragment
    }
}