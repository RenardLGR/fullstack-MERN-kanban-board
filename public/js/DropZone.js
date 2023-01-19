// import KanbanAPI from "../api/KanbanAPI.js"

export default class DropZone{
    static createDropZone(){
        const range = document.createRange() //chain of items

        range.selectNode(document.body) //hooking place i.e context node

        const dropZone = range.createContextualFragment(`
            <div class="kanban__dropzone"></div>
        `).children[0] //HTML-like string to be converted into a document fragment

        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault()
            dropZone.classList.add('kanban__dropzone--active')
        }) //when an item is dragover an other elemnt, add the class that add a darker area

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove('kanban__dropzone--active')
        }) //when an item is dragged away from the dragover

        dropZone.addEventListener("drop", (event) => { //drag and drop logic
            event.preventDefault()

            dropZone.classList.remove('kanban__dropzone--active')

            const columnElement = dropZone.closest('.kanban__column') //find the closest element with the class of kanban__column

            const columnId = Number(columnElement.dataset.id) //get the id of the before closest element

            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone")) //find all the possible dropzones

            const droppedIndex = dropZonesInColumn.indexOf(dropZone) //location where the item was dropped

            const itemId = Number(event.dataTransfer.getData("text/plain"))

            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`)

            const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone //check if it is dropped at the very bottom

            if(droppedItemElement.contains(dropZone)){ //if try to drop the item from where it comes from, do nothing
                return
            }

            insertAfter.after(droppedItemElement) //insert to new location

            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            })//API call

        }) //when an item is dropped

        return dropZone //update UI
    }
}