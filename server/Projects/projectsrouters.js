const express = require('express');
const projectsTable = require('../data/helpers/projectModel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// ~~~ GET ~~~ //
// - `get()`: calling get returns an array of all the resources contained in the database.
router.get('/', (req, res, next) => {
    projectsTable.get()
        .then((projectsList) => {
            res.status(200).json(projectsList);
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// - `get(id)`: If you pass an `id` to this method it will return the resource with that id if one is found.
router.get('/:id', (req, res, next) => {
    projectsTable.get(req.params.id)
        .then((project) => {
            if(project !== undefined) {
                res.status(200).json(project);
            } else {
                next(["h404", `Project with ID ${req.params.id} not found.`]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// - `getProjectActions(projectId)` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.
router.get('/:id/actions', (req, res, next) => {
    projectsTable.getProjectActions(req.params.id)
        .then((actionsList) => {
            if(actionsList !== undefined) {
                res.status(200).json(actionsList);
            } else {
                next(["h404", `Project with ID ${req.params.id} doesn't exist.`]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// ~~~ POST ~~~ //
// - `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
router.post('/', (req, res, next) => {
    const { name, description } = req.body;
    if(name && description) {
        const newProjectObj = { name, description };
        projectsTable.insert(newProjectObj)
            .then((newProject) => {
                res.status(201).json(newProject);
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
router.put('/:id', (req, res, next) => {
    // const { name, description } = req.body;
    if(req.body.name && req.body.description) {
        const updateObj = {"name": req.body.name, "description": req.body.description};
        projectsTable.update(req.params.id, updateObj)
            .then((updatedProject) => {
                if(updatedProject !== null) {
                    res.status(200).json(updatedProject);
                } else {
                    next(["h404", "Project doesn't exist."]);
                }
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing object properties."]);
    }
    
});

// ~~~ DELETE ~~~ //
// - `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete('/:id', (req, res, next) => {
    projectsTable.remove(req.params.id)
        .then((deleteCount) => {
            if(deleteCount > 0) {
                res.status(204).json();
            } else {
                next(["h404", `Project with ID ${req.params.id} doesn't exist.`])
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.use(errorHandler);

module.exports = router;
