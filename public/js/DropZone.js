// import KanbanAPI from "../api/KanbanAPI.js"

export default class DropZone {
    static createDropZone() {
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

        dropZone.addEventListener("drop", async (event) => { //drag and drop logic
            event.preventDefault()

            dropZone.classList.remove('kanban__dropzone--active');

            async function onBlur(dropZone) {
                try {
                    const columnElement = dropZone.closest('.kanban__column') //find the closest element with the class of kanban__column //target side
                    const colName = columnElement.querySelector('.kanban__column-title').innerText //target col name
                    const itemId = event.dataTransfer.getData("text/plain") //grab the data transfer, transfer initialized in NewItem.js and ExistingItem.js at drag start
                    const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`)
                    const content = droppedItemElement.querySelector('.kanban__item-input').innerText
        
                    console.log(colName, itemId, content);
                    const response = await fetch('/editStatus', {
                        method: 'PUT',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            itemId: itemId,
                            description: content,
                            status: colName
                        })
                    })
                    const data = await response.json()
                    console.log(data)

                    const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone; //make elements move around

                    if (droppedItemElement.contains(dropZone)) {
                        return;
                    } //make elements move around
        
                    insertAfter.after(droppedItemElement); //make elements move around
                    //location.reload()
                } catch (err) {
                    console.log(err)
                }
            }

            await onBlur(dropZone)

        }) //when an item is dropped
        return dropZone //update UI
    }

}