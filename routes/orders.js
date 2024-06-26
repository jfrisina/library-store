const express = require('express');
const router = express.Router();
const orders = require('../data/orders.js');

//GET route to get all post data
router.get('/', (req, res) => {
  const links = [
    {
      href: 'orders/:id',
      rel: ':id',
      type: 'GET',
    },
  ];

  res.json({ orders, links });
});

// GET route to get a post by ID
router.get('/:id', (req, res, next) => {
  // Using the Array.find method to find the user with the same id as the one sent with the request
  const order = orders.find((p) => o.id == req.params.id);

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

  if (order) res.json({ order, links });
  else next();
});

// POST Create a Post
router.post('/', (req, res) => {
  // Within the POST request we will create a new post.
  // The client will pass us data and we'll push that data into our psots array.
  // the post data that we want to create is inside the req.body
  if (req.body.userId && req.body.title && req.body.content) {
    // If the code gets to this point, we are good to create the post
    const order = {
      id: orders.length + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };

    orders.push(post);
    res.json(post);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

//PATCH Update a Post
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const order = orders.find((o, i) => {
    if (o.id == req.params.id) {
      for (const key in req.body) {
        // Applying the updates within the req.body to the in-memory post
        orders[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (order) {
    res.json(order);
  } else {
    next();
  }
});

// DELETE Delete a post
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  const order = orders.find((o, i) => {
    if (o.id == req.params.id) {
      orders.splice(i, 1);
      return true;
    }
  });

  if (order) res.json(order);
  else next();
});

module.exports = router;