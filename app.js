
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

    setSrc(src) {
        this.element.src = src;
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
let filteredFilms;
var films = '';
let rowToDelete;


fetch('https://my-json-server.typicode.com/bemaxima/fake-api/movies')
    .then(response => response.json())
    .then(filmsArray => {
        films = filmsArray;
        load();
    });


function clearTbody() {
    document.querySelectorAll("tbody")[0].remove();
}


function load() {
    if (countLoad === 0) {
        filteredFilms = films;
        var container = document.getElementById('dataContainer');

        addModal = builder
            .create('div')
            .setClassName('modal')
            .setParent(container)
            .hide();

        closeDiv = builder
            .create('div')
            .setParent(addModal)
            .setClassName('closeDiv');

        closeBtn = builder
            .create('span')
            .setParent(closeDiv)
            .setClassName('closeBtn')
            .setInnerHtml('&times;')
            .setOnclick(() => addModal.hide());

        dataBox = builder
            .create('div')
            .setClassName('modal')
            .setParent(addModal)
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
            .setParent(addModal);

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

                    addModal.hide();
                    clearTbody();
                    load(films);
                }
                else {
                    alert('Enter Film Name');
                }
            });




        deleteModal = builder
            .create('div')
            .setParent(container)
            .setClassName('deleteModal')
            .hide();


        closeDiv = builder
            .create('div')
            .setParent(deleteModal)
            .setClassName('closeDiv');

        closeBtn = builder
            .create('span')
            .setParent(closeDiv)
            .setClassName('closeBtn')
            .setInnerHtml('&times;')
            .setOnclick(() => deleteModal.hide());

        deleteDataBox = builder
            .create('div')
            .setParent(deleteModal)
            .setClassName('deleteDataBox');

        deleteMessage = builder
            .create('p')
            .setParent(deleteDataBox)
            .setText('Are you sure you want to delete this record?')
            .setClassName('deleteMessage');

        decisionBox = builder
            .create('div')
            .setClassName('decisionBox')
            .setParent(deleteModal);

        cancelBtn = builder
            .create('button')
            .setText('No')
            .setParent(decisionBox)
            .setClassName('cancelBtn')
            .setOnclick(() => deleteModal.hide());

        approveBtn = builder
            .create('button')
            .setText('Yes')
            .setClassName('approveBtn')
            .setParent(decisionBox)
            .setOnclick(() => {
                var rowId = rowToDelete.getAttribute('rowId')
                rowToDelete.remove();
                deleteModal.hide();
                films = films.filter(t => t.id != rowId)
            });





        editModal = builder
            .create('div')
            .setClassName('modal')
            .setParent(container)
            .hide();

        closeDiv = builder
            .create('div')
            .setParent(editModal)
            .setClassName('closeDiv');

        closeBtn = builder
            .create('span')
            .setParent(closeDiv)
            .setClassName('closeBtn')
            .setInnerHtml('&times;')
            .setOnclick(() => editModal.hide());

        dataBox = builder
            .create('div')
            .setClassName('modal')
            .setParent(editModal)
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

        idEditInput = builder
            .create('input')
            .setType('number')
            .setAttribute('min', '1')
            .setId('idEditInput')
            .setClassName('idInput')
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

        rateEditInput = builder
            .create('input')
            .setType('number')
            .setAttribute('step', '0.1')
            .setAttribute('min', '0')
            .setAttribute('max', '10')
            .setId('rateEditInput')
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

        filmNameEditInput = builder
            .create('input')
            .setType('text')
            .setId('filmNameEditInput')
            .setClassName('filmName')
            .setParent(filmPart);

        descPart = builder
            .create('div')
            .setClassName('descPart')
            .setParent(dataBox);

        descLabel = builder
            .create('label')
            .setParent(descPart)
            .setClassName('descLabel')
            .setText('Description: ');

        descEditInput = builder
            .create('textarea')
            .setParent(descPart)
            .setId('descEditInput')
            .setClassName('description');

        decisionBox = builder
            .create('div')
            .setClassName('decisionBox')
            .setParent(editModal);

        saveBtn = builder
            .create('button')
            .setText('Save')
            .setClassName('saveBtn')
            .setParent(decisionBox)
            .setOnclick(() => {

                editingFilm.id = document.getElementById('idEditInput').value;
                editingFilm.name = document.getElementById('filmNameEditInput').value;
                editingFilm.rate = document.getElementById('rateEditInput').value;
                editingFilm.description = document.getElementById('descEditInput').value;

                editModal.hide();
                clearTbody();
                load();

                document.getElementById('idEditInput').value = '';
                document.getElementById('filmNameEditInput').value = '';
                document.getElementById('rateEditInput').value = '';
                document.getElementById('descEditInput').value = '';
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

                clearTbody();
                load(filteredFilms);
            });

        add = builder
            .create('img')
            .setAttribute('src', './images/whitePlus.png')
            .setAttribute('alt', 'add')
            .setParent(searchBox)
            .setClassName('add')
            .setOnclick(() => addModal.show());

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

                    clearTbody();
                    load();


                    if (order == 'asc') {
                        th.setAttribute('order', 'desc');
                    }
                    else {
                        th.setAttribute('order', 'asc');
                    }


                })
        }
        let action = builder
            .create('td')
            .setParent(tr)
            .setText('Actions');
    }

    countLoad = 1;

    const tbody = builder
        .create('tbody')
        .setParent(table);

    for (let film of filteredFilms) {
        let row = builder
            .create('tr')
            .setAttribute('rowId', film.id)
            .setParent(tbody);



        for (let property in film) {
            let td = builder
                .create('td')
                .setParent(row)
                .setText(film[property]);
        }
        let td = builder
            .create('td')
            .setClassName('actionTd')
            .setParent(row);

        let editAction = builder
            .create('img')
            .setParent(td)
            .setSrc("./images/edit.png")
            .setInnerHtml('alt="edit"')
            .setClassName('editAction')
            .setOnclick((event) => {
                rowtoEdit = event.srcElement.parentElement.parentElement;
                rowId = rowtoEdit.getAttribute('rowId');
                editingFilm = films.find(t => t.id == rowId);
                document.getElementById('idEditInput').value = editingFilm.id;
                document.getElementById('rateEditInput').value = editingFilm.rate;
                document.getElementById('filmNameEditInput').value = editingFilm.name;
                document.getElementById('descEditInput').value = editingFilm.description;
                editModal.show();
            });

        let deleteAction = builder
            .create('img')
            .setParent(td)
            .setSrc("./images/delete.png")
            .setInnerHtml('alt="delete"')
            .setClassName('deleteAction')
            .setOnclick((event) => {
                rowToDelete = event.srcElement.parentElement.parentElement;
                deleteModal.show();
            });

    }
}