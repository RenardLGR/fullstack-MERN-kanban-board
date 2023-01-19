class Column{
    constructor(num){
        this.elements = {aze: "aze"}
        this.elements.num = num
        this.logElements()
    }


    logElements(){
        (() => {
            console.log(this.elements);
            console.log("hello");
        })()
    }
}

// let col = new Column(1)
// col.logElements()

function extractIntNDec(num) {
    let int = Math.floor(num)
    let n = (""+int).length
    let dec = (num - int).toFixed(n)  *  10 ** n 

    return [int, dec]
}
console.log(extractIntNDec(333.9));

function extract(num) {
    let [int, dec] = num.toString().split('.').map(Number)

    if(dec === undefined){
        dec = 0
    }

    return [int, dec]
}

// console.log(extract(93));
// console.log(extract(93.5));
// console.log(extract(93.55));
