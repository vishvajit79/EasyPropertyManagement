import * as express from 'express';

import { PropertyService } from './property.service';

const propertyService = new PropertyService();

const controller = express.Router();

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
controller.get('/:_propId', async (req,res) => {
    const property = await propertyService.getPropertyId(req.params._propId);
    res.send(property);
});

/**
 * POST request for adding new property and its units
 */
controller.post('/new', async (req,res) => {
    const query = req.body;
    const property = await propertyService.insertProperty(query);
    res.send(property);
});

export { controller as PropertyController };
