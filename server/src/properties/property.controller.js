"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const property_service_1 = require("./property.service");
const propertyService = new property_service_1.PropertyService();
const controller = express.Router();
exports.PropertyController = controller;
/**
 * POST request to get list of all properties
 */
controller.post('/', async (req, res) => {
    const query = req.body;
    const properties = await propertyService.listProperties(query, req.query.offset, req.query.limit);
    res.send(properties);
});
/**
 * GET Request to get the specific property form the flat file based on the id
 */
controller.get('/:_propId', async (req, res) => {
    const property = await propertyService.getPropertyId(req.params._propId);
    res.send(property);
});
/**
 * POST request for adding new property and its units
 */
controller.post('/new', async (req, res) => {
    const query = req.body;
    const property = await propertyService.insertProperty(query);
    res.send(property);
});
//# sourceMappingURL=property.controller.js.map