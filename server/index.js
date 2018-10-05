const express = require('express');
const cors = require('cors');
const headers = require('helmet');
const actionsRoutes = require('./Actions/actionsrouters');
const projectsRoutes = require('./Projects/projectsrouters');

// ~~~~~ SERVER INITIALIZATION ~~~~~ //
const server = express();
server.use(cors());
server.use(headers());
server.use(express.json());

// ~~~~~ MIDDLEWARE ~~~~~ //
// :P

// ~~~~~ ROUTES ~~~~~ //
server.use('/api/actions', actionsRoutes);
server.use('/api/projects', projectsRoutes);

server.use((req, res) => {
    res.status(404).json({"error": `The path '${req.url}' doesn't exist.`});
});

// ~~~~~ LISTENER ~~~~~ //
const port = 8080;
server.listen(port, () => console.log(`\n~~~ Server listening on port ${port} ~~~\n`));
