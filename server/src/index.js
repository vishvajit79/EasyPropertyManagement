"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const property_controller_1 = require("./properties/property.controller");
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/properties', property_controller_1.PropertyController);
app.listen(3000, () => console.log('Server started at http://localhost:3000/'));
//# sourceMappingURL=index.js.map