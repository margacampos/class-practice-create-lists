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