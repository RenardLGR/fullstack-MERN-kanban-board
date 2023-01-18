export default class Column{
    constructor(colDiv){
        this.elements = {}
        this.elements.addItemButton = colDiv.querySelector('.kanban__add-item')
        this.elements.addItemButton.addEventListener('click', this.addItemOnClick)
    }


    addItemOnClick(event){
        let colName = event.target.id
        switch (colName) {
            case 'kanban__add__not__started':
                console.log('not__started clicked');
                break;

            case 'kanban__add__in__progress':
                console.log('in__progress clicked');
                break;

            case 'kanban__add__completed':
                console.log('completed clicked');
                break;

            case 'kanban__add__on__hold':
                console.log('on__hold clicked');
                break;

            default:
                throw new Error('Add button on unrecognised column')
                break;
        }
    }
}

