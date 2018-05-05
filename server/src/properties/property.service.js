"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_dao_1 = require("./property.dao");
class PropertyService {
    constructor(dao = new property_dao_1.PropertyDAO()) {
        this.dao = dao;
    }
    /**
     * List all properties from the flat file
     * @param query
     * @param {number} offset
     * @param {number} limit
     * @returns {Promise<Property[]>}
     */
    listProperties(query = {}, offset = 0, limit = 10) {
        return this.dao.query(query, offset, limit);
    }
    /**
     * Get Specific property from the flat file filter by id
     * @param {string} id
     * @returns {Promise<Property>}
     */
    getPropertyId(id = '') {
        return this.dao.getProperty(id);
    }
    /**
     * Insert new property to the file
     * @param query
     * @returns {Promise<String>}
     */
    insertProperty(query = {}) { return this.dao.insert(query); }
    ;
}
exports.PropertyService = PropertyService;
//# sourceMappingURL=property.service.js.map