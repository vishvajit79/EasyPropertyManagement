"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("../datastore/datastore");
class PropertyDAO {
    constructor(db = datastore_1.Datastore.getDB()) {
        this.db = db;
    }
    async insert(property) {
        const result = await this.propertyCollection().insert(property);
        return result._id;
    }
    async query(query, offset, limit) {
        const properties = await this.propertyCollection().find(query);
        return properties.slice(offset, offset + limit);
    }
    getProperty(id) {
        return this.propertyCollection().findById(id);
    }
    clearAll() {
        return this.propertyCollection().destroy();
    }
    propertyCollection() {
        return this.db.collection('properties');
    }
}
exports.PropertyDAO = PropertyDAO;
//# sourceMappingURL=property.dao.js.map