"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataStore = function () {
    function DataStore() {
        _classCallCheck(this, DataStore);

        this.store = new Immutable.Map();
        this.listeners = new Immutable.Map();
        this.history = new Immutable.List();

        this.addToStore = this.addToStore.bind(this);
    }

    _createClass(DataStore, [{
        key: "addToStore",
        value: function addToStore(key, value) {
            var hashSet = { key: key, value: value };
            this.history.push(this.store);
            this.store = this.store.set(key, value);
            this.listeners.map(function (func) {
                var obj = {};
                obj[key] = value;
                func(obj);
            });
        }
    }, {
        key: "updateStore",
        value: function updateStore(key, value) {
            var hashSet = { key: key, value: value };
            this.history.push(this.store);
            this.store = this.store.update(key, value);
            this.listeners.map(function (func) {
                var obj = {};
                obj[key] = value;
                func(obj);
            });
        }
    }, {
        key: "hasKey",
        value: function hasKey(key) {
            return this.store.has(key);
        }
    }, {
        key: "removeFromStore",
        value: function removeFromStore(key) {
            this.store = this.store.delete(key);
        }
    }, {
        key: "addListener",
        value: function addListener(key, listener) {
            this.listeners = this.listeners.set(key, listener);
        }
    }, {
        key: "updateListener",
        value: function updateListener(key, listener) {
            var hashSet = { key: key, value: listener };
            this.listeners = this.listeners.update(key, listener);
        }
    }, {
        key: "removeListener",
        value: function removeListener(key) {
            this.listeners = this.listeners.delete(key);
        }
    }]);

    return DataStore;
}();

var ds = new DataStore();
