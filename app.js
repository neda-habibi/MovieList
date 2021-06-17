
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

    setId(id) {
        this.element.id = id;
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

    hide() {
        this.element.style.display = 'none';
        return this;
    }

    show() {
        this.element.style.display = 'block';
        return this;
    }
}


const builder = {
    create(name) {
        return new ElementBuilder(name);
    }
}


let countLoad = 0;
let table,
    thead,
    tr,
    filteredFilms,
    modal,
    closeDiv,
    closeBtn,
    dataBox,
    filmPart,
    filmLabel,
    filmNameInput,
    rateLabel,
    rateInput,
    descPart,
    descLabel,
    descInput,
    decisionBox,
    saveBtn;
var films = '';


fetch('https://my-json-server.typicode.com/bemaxima/fake-api/movies')
    .then(response => response.json())
    .then(filmsArray => {
        films = filmsArray;
        load();
    });


function load() {
    if (countLoad === 0) {
        filteredFilms = films;
        var container = document.getElementById('dataContainer');

        modal = builder
            .create('div')
            .setClassName('modal')
            .setParent(container)
            .hide();

        closeDiv = builder
            .create('div')
            .setParent(modal)
            .setClassName('closeDiv');

        closeBtn = builder
            .create('span')
            .setParent(closeDiv)
            .setClassName('closeBtn')
            .setInnerHtml('&times;')
            .setOnclick(() => modal.hide());

        dataBox = builder
            .create('div')
            .setClassName('modal')
            .setParent(modal)
            .setClassName('dataBox');

        idPart = builder
            .create('div')
            .setClassName('dataPart')
            .setParent(dataBox);

        idLabel = builder
            .create('label')
            .setParent(idPart)
            .setClassName('idLabel')
            .setText('Film ID: ')

        idInput = builder
            .create('input')
            .setType('number')
            .setAttribute('min', '1')
            .setId('idInput')
            .setClassName('idInput')
            .setPlaceHolder('Enter ID')
            .setParent(idPart);

        ratePart = builder
            .create('div')
            .setClassName('dataPart')
            .setParent(dataBox);

        rateLabel = builder
            .create('label')
            .setParent(ratePart)
            .setClassName('rateLabel')
            .setText('Rate: ');

        rateInput = builder
            .create('input')
            .setType('number')
            .setAttribute('step', '0.1')
            .setAttribute('min', '0')
            .setAttribute('max', '10')
            .setId('rateInput')
            .setParent(ratePart)
            .setClassName('rate');

        filmPart = builder
            .create('div')
            .setClassName('dataPart')
            .setParent(dataBox);

        filmLabel = builder
            .create('label')
            .setParent(filmPart)
            .setClassName('filmLabel')
            .setText('Film Name: ')

        filmNameInput = builder
            .create('input')
            .setType('text')
            .setId('filmNameInput')
            .setClassName('filmName')
            .setPlaceHolder('Film Name ...')
            .setParent(filmPart);

        descPart = builder
            .create('div')
            .setClassName('descPart')
            .setParent(dataBox);

        descLabel = builder
            .create('label')
            .setParent(descPart)
            .setClassName('descLabel')
            .setText('Description: ')

        descInput = builder
            .create('textarea')
            .setParent(descPart)
            .setId('descInput')
            .setClassName('description')
            .setPlaceHolder('Enter Description ...');

        decisionBox = builder
            .create('div')
            .setClassName('decisionBox')
            .setParent(modal);

        saveBtn = builder
            .create('button')
            .setText('Save')
            .setClassName('saveBtn')
            .setParent(decisionBox)
            .setOnclick(() => {
                var newFilm = {
                    "id": document.getElementById('idInput').value,
                    "name": document.getElementById('filmNameInput').value,
                    "rate": document.getElementById('rateInput').value,
                    "description": document.getElementById('descInput').value
                }

                if (document.getElementById('filmNameInput').value != '') {

                    films.push(newFilm);
                    document.getElementById('idInput').value = '';
                    document.getElementById('filmNameInput').value = '';
                    document.getElementById('rateInput').value = '';
                    document.getElementById('descInput').value = '';

                    modal.hide();
                    load(films);
                }
                else {
                    alert('Enter Film Name');
                }
            });

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
                filteredFilms = films.filter(film =>
                    film.name.toLowerCase().includes(keyword.toLowerCase())
                    || film.description.toLowerCase().includes(keyword.toLowerCase())
                    || film.rate == keyword
                    || film.id == keyword
                );
                document.querySelectorAll("tbody")[0].remove();
                load(filteredFilms);
            });

        add = builder
            .create('img')
            .setAttribute('src', './images/whitePlus.png')
            .setAttribute('alt', 'add')
            .setParent(searchBox)
            .setClassName('add')
            .setOnclick(() => modal.show());

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

        for (let prop in films[0]) {
            let th = builder
                .create('td')
                .setParent(tr)
                .setText(prop)
                .setAttribute('order', 'asc')
                .setAttribute('property', prop)
                .setOnclick(function (event) {

                    var indicatedHeaders = document.querySelectorAll('.asc , .desc');
                    indicatedHeaders.forEach(x => x.className = '');

                    let property = event.srcElement.getAttribute('property');
                    let order = event.srcElement.attributes.order.value;


                    filteredFilms = films.sort((first, second) => {

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

    for (let film of filteredFilms) {
        let row = builder
            .create('tr')
            .setParent(tbody);

        for (let property in film) {
            let td = builder
                .create('td')
                .setParent(row)
                .setText(film[property]);
        }
    }



}