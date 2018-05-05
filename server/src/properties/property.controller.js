"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const property_service_1 = require("./property.service");
const propertyService = new property_service_1.PropertyService();
const controller = express.Router();
exports.PropertyController = controller;
controller.post('/', async (req, res) => {
    const query = req.body;
    const properties = await propertyService.listProperties(query, req.query.offset, req.query.limit);
    res.send(properties);
});
controller.get('/:_propId', async (req, res) => {
    const property = await propertyService.getPropertyId(req.params._propId);
    res.send(property);
});
controller.post('/new', async (req, res) => {
    const query = req.body;
    const property = await propertyService.insertProperty(query);
    res.send(property);
});
//# sourceMappingURL=property.controller.js.map