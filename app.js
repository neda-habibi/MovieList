
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

    setClassName(className) {
        this.element.className = className;
        return this;
    }

    setOnclick(fn) {
        this.element.onclick = fn;
        return this;
    }

    setKeyUp(fn) {
        this.element.onkeyup = fn;
        return this;
    }

    setName(name) {
        this.element.name = name;
        return this;
    }

    setAttribute(attributeName, attributeValue) {
        this.element.setAttribute(attributeName, attributeValue);
        return this;
    }

    setPlaceHolder(text) {
        this.element.placeholder = text;
        return this;
    }

    setInnerHtml(htmlValue) {
        this.element.innerHTML = htmlValue;
        return this;
    }
}


const builder = {
    create(name) {
        return new ElementBuilder(name);
    }
}

const hearderMapper = [
    {
        property: 'userId',
        columnName: 'Index'
    },
    {
        property: 'firstName',
        columnName: 'First Name'
    },
    {
        property: 'lastName',
        columnName: 'Last Name'
    },
    {
        property: 'age',
        columnName: 'Age'
    },
    {
        property: 'phoneNumber',
        columnName: 'Phone Number'
    }
]

let countLoad = 0;
let table, thead, tr;
var persons = JSON.parse(data);
function load() {

    if (countLoad === 0) {
        var container = document.getElementById('dataContainer');

        searchBox = builder
            .create('div')
            .setClassName('searchBox')
            .setParent(container);

        input = builder
            .create('input')
            .setName('input')
            .setClassName('searchInput')
            .setType('text')
            .setPlaceHolder('Keyword...')
            .setParent(searchBox)
            .setKeyUp(function () {
                const keyword = document.getElementsByName('input')[0].value;
                persons = persons.filter(person =>
                    person.firstName.toLowerCase().includes(keyword.toLowerCase())
                    || person.lastName.toLowerCase().includes(keyword.toLowerCase())
                    || person.age == keyword
                    || person.phoneNumber.includes(keyword)
                );
                document.querySelectorAll("tbody")[0].remove();
                load(persons);
                //document.getElementsByName('input')[0].value = '';
            });

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
                .setText(hearderMapper.find(obj => prop == obj.property).columnName)
                .setAttribute('order', 'asc')
                .setAttribute('property', prop)
                .setOnclick(function (event) {

                    var indicatedHeaders = document.querySelectorAll('.asc , .desc');
                    indicatedHeaders.forEach(x => x.className = '');

                    let property = event.srcElement.getAttribute('property');
                    let order = event.srcElement.attributes.order.value;


                    persons = persons.sort((first, second) => {

                        if (order == 'asc') {
                            th.setClassName('asc');

                            if (first[property] > second[property]) {
                                return 1;
                            }

                            else if (first[property] < second[property]) {
                                return -1;
                            }

                            return 0;


                        }

                        else if (order == 'desc') {
                            th.setClassName('desc');

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


                })
        }
    }

    countLoad = 1;

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
    persons = JSON.parse(data);

}