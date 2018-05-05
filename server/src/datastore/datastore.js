"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const shortid = require("shortid");
const datadir = path.join(__dirname, path.sep, '..', path.sep, '..', path.sep, 'data');
class Collection {
    constructor(collection, collectionFile = path.join(datadir, `${collection}.json`)) {
        this.collection = collection;
        this.collectionFile = collectionFile;
    }
    /**
     *
     * @returns {Promise<string>}
     */
    filestore() {
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(this.collectionFile)) {
                    fs.writeFileSync(this.collectionFile, '[]');
                }
                resolve(this.collectionFile);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    /**
     *
     * @returns {Promise<T[]>}
     */
    async readFilestore() {
        if (!!this.contents) {
            return this.contents;
        }
        const file = await this.filestore();
        const data = fs.readFileSync(file);
        const contents = JSON.parse(data.toString());
        this.contents = contents;
        return this.contents;
    }
    /**
     *
     * @returns {Promise<any>}
     */
    async writeFilestore() {
        const file = await this.filestore();
        fs.writeFileSync(file, JSON.stringify(this.contents));
        this.contents = null;
    }
    /**
     *
     * @param query
     * @returns {Promise<T[]>}
     */
    async find(query) {
        const data = await this.readFilestore();
        if (!query) {
            console.log(`NO Q: ${query}`);
            return data;
        }
        return data.filter((e) => {
            const keys = _.keys(query);
            return keys.reduce((acc, key) => {
                const value = _.get(e, key, null);
                const queryObj = _.get(query, key, null);
                if (typeof queryObj === 'object') {
                    return this.executeConditions(value, queryObj);
                }
                console.log(`vale: ${value} valq: ${queryObj}`);
                return acc && value === queryObj;
            }, true);
        });
    }
    /**
     *
     * @param value
     * @param queryObj
     * @returns {boolean}
     */
    executeConditions(value, queryObj) {
        const queryKeys = _.keys(queryObj);
        return queryKeys.reduce((acc, key) => {
            const queryValue = _.get(queryObj, key, null);
            if (key === '$eq') {
                return acc && value === queryValue;
            }
            else if (key === '$ne') {
                return acc && value !== queryValue;
            }
            else if (key === '$gt') {
                return acc && value > queryValue;
            }
            else if (key === '$gte') {
                return acc && value >= queryValue;
            }
            else if (key === '$lt') {
                return acc && value < queryValue;
            }
            else if (key === '$lte') {
                return acc && value <= queryValue;
            }
            else if (key === '$regex') {
                if (typeof queryValue !== 'string') {
                    throw new Error(`$regex operator must provide a valid regular expression: invalid '${queryValue}'`);
                }
                const parts = queryValue.split('/');
                const regexp = parts.length === 2 ? new RegExp(parts[0], parts[1]) : new RegExp(parts[0]);
                return acc && regexp.test(value);
            }
            else if (key === '$in') {
                if (!Array.isArray(queryValue)) {
                    throw new Error(`$in operator must be used with an array value`);
                }
                return acc && queryValue.indexOf(value) >= 0;
            }
            else if (key === '$nin') {
                if (!Array.isArray(queryValue)) {
                    throw new Error(`$nin operator must be used with an array value`);
                }
                return acc && queryValue.indexOf(value) < 0;
            }
            throw new Error(`Unknown operator ${key}`);
        }, true);
    }
    /**
     *
     * @param {string} id
     * @returns {Promise<T>}
     */
    async findById(id) {
        return this.first(e => e._id === id);
    }
    /**
     *
     * @param {(elem: T) => boolean} predicate
     * @returns {Promise<T>}
     */
    async first(predicate) {
        const data = await this.readFilestore();
        const one = data.filter(predicate);
        return one.length === 0 ? null : one[0];
    }
    /**
     *
     * @param {T} elem
     * @returns {Promise<T>}
     */
    async insert(elem) {
        elem._id = shortid.generate();
        const data = await this.readFilestore();
        data.push(elem);
        await this.writeFilestore();
        return elem;
    }
    /**
     *
     * @param {T} elem
     * @returns {Promise<T>}
     */
    async update(elem) {
        if (!elem._id) {
            throw new Error('Updating elements must have a valid _id');
        }
        this.contents = this.contents.map(e => {
            if (e._id === elem._id) {
                return elem;
            }
            return e;
        });
        await this.writeFilestore();
        return elem;
    }
    /**
     *
     * @param {T} elem
     * @returns {Promise<void>}
     */
    async remove(elem) {
        this.contents.filter(e => {
            return e._id !== elem._id;
        });
        await this.writeFilestore();
    }
    /**
     *
     * @returns {Promise<void>}
     */
    async destroy() {
        this.contents = [];
        await this.writeFilestore();
    }
}
exports.Collection = Collection;
class datastore {
    constructor() {
        this.db = this;
        console.log(`Connecting to DB ${datadir}`);
        this.setupdb();
    }
    setupdb() {
        if (!fs.existsSync(datadir)) {
            fs.mkdirSync(datadir);
        }
    }
    getDB() {
        return this.db;
    }
    collection(name) {
        return new Collection(name);
    }
}
const ds = new datastore();
exports.Datastore = ds;
//# sourceMappingURL=datastore.js.map