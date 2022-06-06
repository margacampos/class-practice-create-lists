class List {
    constructor(_id, _append, _list) {
        this.id = _id;
        this.div = createAndAppend(_id, "div", _append, "");
        this.numClicked = 0;
        this.list = _list;
    }
    set title (text) {
        const title = document.getElementById(this.id + "title");
        title.innerText = text;
    }
    get title () {
        const title = document.getElementById(this.id + "title");
        if(title){
            return title.innerText;
        }
        return "";
    }
    get description () {
        const desc = document.getElementById(this.id + "desc");
        if(desc){
            return desc.innerText;
        }
        return "";
    }
    set description (text) {
        const desc = document.getElementById(this.id + "desc");
        desc.innerText = text;
    }

    update () {
        removeFromList( this.id + "list" );
        for ( const elem of this.list ) {
            addToList( this.id + "list", elem );
        }
    }

    add (text) {
        this.list.push(text);
        this.update();
        this.numClicked++;
    }
    
    remove (text) {
        const index = this.list.indexOf(text);
        if(index>-1){
            this.list.splice(index, 1);
            this.update();
        }
    }

    addTitle (text) {
        createAndAppend( this.id + "title", "h1", this.id, text );
        return this;
    }

    addDesc (text) {
        createAndAppend( this.id + "desc", "p", this.id, text );
        return this;
    }

    addList () {
        createAndAppend(this.id + "list","ul", this.id, "");
        return this;
    }
};

const createAndAppend = ( id, type, ap, text ) => {
    const node = document.createElement(type);
    const append = document.getElementById(ap);
    if(append){
        if( id !== "none" )node.id = id;
        if( text ){
            const textNode = document.createTextNode(text);
            node.appendChild(textNode);
        }
        append.appendChild(node);
        return document.getElementById(id);
    }
};

const addToList = (list, elem) => {
    const append = document.getElementById(list);
    const node = document.createElement("li");
    node.textContent = elem;
    append.appendChild(node);
};

const removeFromList = (id) => {
    const list = document.getElementById(id);
    list.textContent = '';
};

const first = new List("todo", "container", ["Do my homework", "Study Biology", "Have lunch"]).addTitle("To do list").addDesc("This is a list to keep track of what you have to do today.").addList();
const second = new List("food", "container", ["Apple", "Carrot", "Pasta"]).addTitle("Food List").addList();

let lists = [
    first,
    second
];

const setOptions = (list) => {
    removeFromList("listSelect");
    list.map((i,index) => {
        const option = createAndAppend("selectItem" + index, "option", "listSelect", i.title);
        option.setAttribute("value", i.title);
    });
};

const handleSubmit = (type) => {
    console.log("submitting...");
    const select = document.getElementById('listSelect');
    const value = select.options[select.selectedIndex].value;
    const text = document.getElementById('inputItem').value;
    if(!text)return "error";
    if(type === "add"){
        lists.map((i)=>i.title===value && i.add(text));
    }else{
        lists.map((i)=>i.title===value && i.remove(text));
    }
};

handleCreate = () => {
    const id = document.getElementById("newList").value;
    const title = document.getElementById("newListTitle").value;
    const desc = document.getElementById("newListDesc").value;
    if (doesExist(id))return;
    if(titleExists(title))return;
    const newList = new List( id,"container", [] );
    if(title)newList.addTitle(title);
    if(desc)newList.addDesc(desc);
    newList.addList();
    lists.push(newList);
    setOptions(lists);
};

