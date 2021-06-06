
class ElementBuilder {
    constructor(name) {
        this.element = document.createElement(name);
    }

    setText(text) {
        this.element.textContent = text;
        return this;
    }

    setType(type) {
        this.element.type = type;
        return this;
    }

    build() {
        return this.element;
    }

    setParent(parent) {
        if (parent instanceof ElementBuilder) {
            parent.element.appendChild(this.element);
        }
        else {
            parent
                .appendChild(this.element);
        }
        return this;

    }

    setHtml(htmlValue) {
        this.element.innerHTML = htmlValue;
        return this;
    }

    setClassName(className) {
        this.element.className = className;
        return this;
    }

    setOnclick(fn) {
        this.element.onclick = fn;
        return this;
    }

    setAttribute(attributeName, attributeValue) {
        this.element.setAttribute(attributeName, attributeValue);
        return this;
    }
}


const builder = {
    create(name) {
        return new ElementBuilder(name);
    }
}

let countLoad = 0;
let table, thead, tr;
var persons = JSON.parse(data);
function load() {

if(countLoad === 0){
    var container = document.getElementById('dataContainer');
   

    table = builder
        .create('table')
        .setParent(container);
        countLoad = 1;

    thead = builder
        .create('thead')
        .setParent(table);

    tr = builder
        .create('tr')
        .setParent(thead);

    for (let prop in persons[0]) {
        let th = builder
            .create('td')
            .setParent(tr)
            .setClassName('thead')
            .setText(prop)
            .setAttribute('order', 'asc')
            .setOnclick(function (event) {
                let property = event.srcElement.textContent;
                let order = event.srcElement.attributes.order.value;

                
                persons = persons.sort((first, second) => {

                    if (order == 'asc') {

                        if (first[property] > second[property]) {
                            return 1;
                        }

                        else if (first[property] < second[property]) {
                            return -1;
                        }

                        return 0;


                    }

                    else if (order == 'desc') {

                        if (first[property] < second[property]) {
                            return 1;
                        }

                        else if (first[property] > second[property]) {
                            return -1;
                        }

                        return 0;


                    }

                });
                document.querySelectorAll("tbody")[0].remove();
                load();

                if (order == 'asc') {
                    th.setAttribute('order', 'desc');
                }
                else {
                    th.setAttribute('order', 'asc');
                }
            });
    }}
    countLoad =1;

    const tbody = builder
        .create('tbody')
        .setParent(table);

    for (let person of persons) {
        let row = builder
            .create('tr')
            .setParent(tbody);

        for (let property in person) {
            let td = builder
                .create('td')
                .setParent(row)
                .setText(person[property]);
        }
    }

}