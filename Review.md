# Review Questions

## What is Node.js?
- Node.js is an application runtime that allows the developer to write javascript without a browser. 

## What is Express?
- Express is an npm module for Node that acts as a web application framework that abstracts much of the functionality needed to set up a web server in a Node environment, making it easier for the developer and causing them to write less code.

## Mention two parts of Express that you learned about this week.
- Routers and middleware.

## What is Middleware?
- Middleware are addons for Node.js/Express that sit in the middle of the server listener and routes and performs arbitrary actions.

## What is a Resource?
- "Everything is a resource." A resource is a piece of data, generally housed in something like a database or some kind of structured file, that is consumed and then presented by an API.

## What can the API return to help clients know if a request was successful?
- A HTTP 2## status, along with meaningful data.

## How can we partition our application into sub-applications?
- By type, by feature/resource, or a hybrid of the two.

## What is express.json() and why do we need it?
- express.json() takes the body of the user request and formats it into JSON format. Without it, Express would just return undefined when querying req.body.
