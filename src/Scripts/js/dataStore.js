class DataStore {
    constructor(){
        this.store = new Immutable.Map();
        this.listeners = new Immutable.Map();
        this.history = new Immutable.List();
    }
    updateStore(key, value) {
        var hashSet = { key, value };
        this.history = this.history.push(this.store);
        this.store = this.store.set(key, value);
        this.listeners.map(func => {
            var obj = {};
            obj[key] = value;
            func(obj);
        });
    }
    getFromStore(key){
        return this.store.get(key);
    }
    hasKey(key){
        return this.store.has(key);
    }
    removeFromStore(key){
        this.store = this.store.delete(key)
    }
    updateListener(key, listener){
        this.listeners = this.listeners.set(key, listener);
    }
    removeListener(key){
        this.listeners = this.listeners.delete(key);
    }
}

var ds = new DataStore();