const express = require('express');
const actionsTable = require('../data/helpers/actionModel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// - `get()`: calling get returns an array of all the resources contained in the database.
// - `get(id)`: If you pass an `id` to this method it will return the resource with that id if one is found.
// - `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
// - `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
// - `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

router.use(errorHandler);

module.exports = router;
