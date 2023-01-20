import Item from "./Item.js"

export default class Column{
    constructor(colDiv){
        this.elements = {}

        this.elements.title = colDiv
        this.elements.items = colDiv.querySelector(".kanban__column-items")
        this.elements.tasks = Array.from(colDiv.querySelectorAll(".kanban__item")).map(div => {
            let colTitle = this.elements.title
            let content = div.querySelector('.kanban__item-input').innerText
            console.log(content);
            return new Item(colTitle, content)
        })

        this.elements.addItemButton = colDiv.querySelector('.kanban__add-item')

        this.elements.addItemButton.addEventListener('click', (event) => {
            let colName = event.target.id
            switch (colName) {
                case 'kanban__add__not__started':
                    console.log('not__started clicked');
                    this.addItem('Not Started')
                    break;
    
                case 'kanban__add__in__progress':
                    console.log('in__progress clicked');
                    this.addItem('In Progress')
                    break;
    
                case 'kanban__add__completed':
                    console.log('completed clicked');
                    this.addItem('Completed')
                    break;
    
                case 'kanban__add__on__hold':
                    console.log('on__hold clicked');
                    this.addItem('On Hold')
                    break;
    
                default:
                    throw new Error('Add button on unrecognized column')
                    break;
            }
        })
        
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
        const item = new Item(colTitle, '')
        item.createItem()
        this.elements.items.appendChild(item.elements.root)
    }
}

