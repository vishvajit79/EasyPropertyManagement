"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_dao_1 = require("./property.dao");
class PropertyService {
    constructor(dao = new property_dao_1.PropertyDAO()) {
        this.dao = dao;
    }
    listProperties(query = {}, offset = 0, limit = 10) {
        return this.dao.query(query, offset, limit);
    }
    getPropertyId(id = '') {
        return this.dao.getProperty(id);
    }
    insertProperty(query = {}) { return this.dao.insert(query); }
    ;
}
exports.PropertyService = PropertyService;
//# sourceMappingURL=property.service.js.map