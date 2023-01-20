import NewItem from "./NewItem.js"
import ExistingItem from "./ExistingItem.js"

export default class Column{
    constructor(colDiv){
        this.elements = {}

        this.elements.title = colDiv.querySelector('.kanban__column-title').innerText
        this.elements.items = colDiv.querySelector(".kanban__column-items")
        this.elements.tasks = Array.from(colDiv.querySelectorAll(".kanban__item")).map(div => {
            let colTitle = this.elements.title
            return new ExistingItem(div, colTitle)
        })

        this.elements.addItemButton = colDiv.querySelector('.kanban__add-item')

        this.elements.addItemButton.addEventListener('click', (event) => {
            let colName = event.target.id
            switch (colName) {
                case 'kanban__add__not__started':
                    this.addItem(this.elements.title)
                    break;
    
                case 'kanban__add__in__progress':
                    this.addItem(this.elements.title)
                    break;
    
                case 'kanban__add__completed':
                    this.addItem(this.elements.title)
                    break;
    
                case 'kanban__add__on__hold':
                    this.addItem(this.elements.title)
                    break;
    
                default:
                    throw new Error('Add button on unrecognized column')
                    break;
            }
        })
        
    }

    renderItem(){
        
    }


    // addItemOnClick(event){
    //     let colName = event.target.id
    //     switch (colName) {
    //         case 'kanban__add__not__started':
    //             console.log('not__started clicked');
    //             break;

    //         case 'kanban__add__in__progress':
    //             console.log('in__progress clicked');
    //             break;

    //         case 'kanban__add__completed':
    //             console.log('completed clicked');
    //             break;

    //         case 'kanban__add__on__hold':
    //             console.log('on__hold clicked');
    //             console.log(this.elements);
    //             // this.renderItem(this.elements.title)
    //             break;

    //         default:
    //             throw new Error('Add button on unrecognised column')
    //             break;
    //     }
    // }

    addItem(colTitle){
        const item = new NewItem(colTitle, '')
        item.createItem() //create an item with an empty description in the db
        this.elements.items.appendChild(item.elements.root)
    }
}

