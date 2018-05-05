import * as express from 'express';

import { PropertyService } from './property.service';

const propertyService = new PropertyService();

const controller = express.Router();

controller.post('/', async (req, res) => {
  const query = req.body;
  const properties = await propertyService.listProperties(query, req.query.offset, req.query.limit);
  res.send(properties);
});

controller.get('/:_propId', async (req,res) => {
    const property = await propertyService.getPropertyId(req.params._propId);
    res.send(property);
});

controller.post('/new', async (req,res) => {
    const query = req.body;
    const property = await propertyService.insertProperty(query);
    res.send(property);
});


export { controller as PropertyController };
