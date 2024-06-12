// calling the instance of Express.js
const express = require('express');
// invoking a function from the express instance
const router = express.Router();
// calling the files in the data folder
const items = require('../data/items.js');

// Use the router function to also add a GET route to get all the item data. req and res are the request and response parameters being passed into the callback function. 
router.get('/', (req, res) => {
  // setting a variable to grab the URL, id, and request method
  const links = [
    {
      href: 'items/:id', // URL
      rel: ':id', // id
      type: 'GET',  // request type
    },
  ];
// respond back with a json file of the items and links
  res.json({ items, links }); 
});

// Setting a GET route to get item by ID.
// Calling the router method that was imported from Express.js through a variable. Target the parameter for the id, send the request and response variables as parameters into the callback function, and then go to the next middleware function as the last callback function.
router.get('/:id', (req, res, next) => {
  // Using the Array.find method to find the user with the same id as the one sent with the request
  const item = items.find((p=i) => i.id == req.params.id);
  // setting a variable to provide the URL and request method
  const links = [
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'PATCH',
    },
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'DELETE',
    },
  ];
// if the user's id matches the database's user id, then respond with the item, URL, and request method. 
  if (item) res.json({ item, links });
  // if it doesn't, then move onto the next block of middleware
  else next();
});

// POST - Create a Post 
// use Express's router to handle the post request that will come in for the link, and passes in the request and response as parameters in a callback function. 
// Express' route handler will be triggered when a POST request is made to the root URL of your server. They will send a request and we will respond.
router.post('/', (req, res) => {
  // create a new item within the POST request
  // The client will pass us data and we'll push that data into our items array. The item data that we want to create is inside the req.body.
  // if there is a user ID, title, and content, then do the following thing:
  if (req.body.userId && req.body.title && req.body.content) {
    // If the code gets to this point, we are good to create the item
    // create an item
    const item = {
      // find how many items there are and then add 1 to create a new untaken id number for the item
      id: items.length + 1,
      // set the user ID to the one in the request
      userId: req.body.userId,
      // set the title to the same one in the request
      title: req.body.title,
      // set the content to the same one in the request body
      content: req.body.content,
    };
    // add the item to the users array
    items.push(item);
    // create a json file of the item and send it as our response
    res.json(item);
  // otherwise, if it doesn't match those criteria, then  
  } else {
    // send the 400 status and an error message
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

// PATCH - Update an item
// use Express' router method to find the id, then handle the request, response, and the command to go to the next middleware as parameters in a callback function
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client to make changes to an existing user in the database.
  // look through the items and find the item with the index that will be given
  const item = items.find((item, i) => {
    // if the item id matches the parameter id
    if (item.id == req.params.id) {
      // for...in loop targeting the object key in the request's body. 
      // The request's body is the property, the key is the body value
      for (const key in req.body) {
       // updating the local memory (database record in future lessons) with the values sent in the request body
       // set the value of the item key at index __ to the request body's value
        items[i][key] = req.body[key];
      }
      // update successful
      return true;
    }
  });
// if there's an item
  if (item) {
    // then send a json file of the item back to client
    res.json(item);
  } else {
    // otherwise, go to the next middleware function
    next();
  }
});

// DELETE - Delete an item
// use the Express router method to pass the parameters for the item id, request and response in a callback method
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  // set item to look through all of the items for the item and the index
  const item = items.find((it, i) => {
    // if the id at that index is the same as the id passed as a parameter in the request
    if (i.id == req.params.id) {
      // then take that one item out of the array by targeting it at the index
      items.splice(i, 1);
      // return true when done
      return true;
    }
  });
  // if the item is there, then send it as a json file as a response
  if (item) res.json(item);
  // otherwise, move along
  else next();
});
// exporting the router object so that it can be used in other files. It was created using the express routher method that has all the routes and middleware
module.exports = router;