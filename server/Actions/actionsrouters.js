const express = require('express');
const actionsTable = require('../data/helpers/actionModel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// ~~~ GET ~~~ //
// - `get()`: calling get returns an array of all the resources contained in the database.
router.get('/', (req, res, next) => {
    actionsTable.get()
        .then((actionsList) => {
            res.status(200).json(actionsList);
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// - `get(id)`: If you pass an `id` to this method it will return the resource with that id if one is found.
router.get('/:id', (req, res, next) => {
    actionsTable.get(req.params.id)
        .then((action) => {
            if(action !== undefined) {
                res.status(200).json(action);
            } else {
                next(["h404", `Action with ID ${req.params.id} not found.`]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// ~~~ POST ~~~ //
// - `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
router.post('/', (req, res, next) => {
    const { project_id, description, notes } = req.body;
    if(project_id && description && notes) {
        const newActionObj = {project_id, description, notes};
        actionsTable.insert(newActionObj)
            .then((newAction) => {
                if(newAction !== null) {
                    res.status(201).json(newAction);
                } else {
                    next(["h500", "Database didn't return the new action. Likely due to an invalid project_id property."])
                }
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing object properties"]);
    }
});

// ~~~ PUT ~~~ //
// - `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
// TODO: Fix PUT
router.put('/:id', (req, res, next) => {
    const { project_id, description, notes } = req.body;
    if(project_id && description && notes) {
        const updateObj = {project_id, description, notes};
        actionsTable.update(req.params.id, updateObj)
            .then((action) => {
                if(action !== null) {
                    res.status(200).json(action);
                } else {
                    next(["h404", `Action with ID ${req.params.id} not found`])
                }
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing object property."]);
    }
});

// ~~~ DELETE ~~~ //
// - `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete('/:id', (req, res, next) => {
    actionsTable.remove(req.params.id)
        .then((deleteCount) => {
            if(deleteCount > 0) {
                res.status(204).json();
            } else {
                next(["h404", `Action with ID ${req.params.id} doesn't exist.`])
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.use(errorHandler);

module.exports = router;
