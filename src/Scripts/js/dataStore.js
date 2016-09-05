class DataStore {
    constructor(){
        this.store = new Immutable.Map();
        this.listeners = new Immutable.Map();
        this.history = new Immutable.List();

        this.addToStore = this.addToStore.bind(this);
    }
    addToStore(key, value) {
        var hashSet = { key, value };
        this.history.push(this.store);
        this.store = this.store.set(key, value);
        this.listeners.map(func => {
            var obj = {};
            obj[key] = value;
            func(obj);
        });
    }
    updateStore(key, value) {
        var hashSet = { key, value };
        this.history.push(this.store);
        this.store = this.store.update(key, value);
        this.listeners.map(func =>{
            var obj = {};
            obj[key] = value;
            func(obj);
        })
    }
    hasKey(key){
        return this.store.has(key);
    }
    removeFromStore(key){
        this.store = this.store.delete(key)
    }
    addListener(key, listener){
        this.listeners = this.listeners.set(key, listener);
    }
    updateListener(key, listener) {
        var hashSet = { key: key, value: listener };
        this.listeners = this.listeners.update(key, listener);
    }
    removeListener(key){
        this.listeners = this.listeners.delete(key);
    }
}

var ds = new DataStore();