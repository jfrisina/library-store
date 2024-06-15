// set a variable to call in express
const express = require('express');
// set app to be a function that calls express in
const app = express();
// set the port number to the port variable in the environment or port 3000 
const PORT = process.env.PORT || 3000;
// call in the users.js file
const userRouter = require('./routes/users.js');
// call in the items.js file
const itemRouter = require('./routes/items.js');
// call in the orders.js file
const orderRouter = require('./routes/orders.js');

// connect the css
app.use(express.static("public"));
// Body parser middleware
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
// call in express to use the middleware function to parse incoming request bodies that are encoded in URL-encoded format (commonly used in HTML forms)
// parse the URL-encoded data with rich objects and arrays. if set to false, would only parse simpler key-value pairs
// app.use() sets the code to be used every time there is an incoming reuqest
app.use(express.urlencoded({ extended: true }));
// use Express' middleware function to parse incoming bodies in JSON format
app.use(express.json());

// New logging middleware to help us keep track of requests during testing!
app.use((req, res, next) => {
	// set time to be the exact date of now
	const time = new Date();
	// print it to the console:
	console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  // if there are any object keys in the body
  if (Object.keys(req.body).length > 0) {
    // print the statement
	console.log('Containing the data:');
	// print the JSON stringed up version of the body
    console.log(`${JSON.stringify(req.body)}`);
  }
  // move on to the next function
  next();
});


// Routes
app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/orders', orderRouter);

// What shows on the home page
app.get('/', (req, res) => {
	res.send(`
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Library Store</title>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
		<h1>Library Store</h1>
    <section class="items">
		<div class="card">
      <a href="/item/shirt"><img src="" alt="">
        <h3>Shirt</h3>
        <button type="button">Add to cart</button>
      </a>
    </div>
		<div class="card">
      <a href="/item/mug">
        <img src="" alt="">
        <h3>Mug</h3>
        <button type="button">Add to cart</button>
      </a>
    </div>
		<div class="card">
      <a href="/item/tote">
        <img src="" alt=""><h3>Tote</h3>
        <button type="button">Add to cart</button>
      </a>
    </div>
		<div class="card">
      <a href="/item/pen">
        <img src="" alt="">
        <h3>Pen</h3>
        <button type="button">Add to cart</button>
      </a>
    </div>
		<div class="card">
      <a href="/item/pencil">
        <img src="" alt="">
        <h3>Pencil</h3>
        <button type="button">Add to cart</button>
      </a>
    </div>
		<div class="card">
      <a href="/item/bookmark">
      <img src="" alt="">
      <h3>Bookmark</h3>
		  <button type="button">Add to cart</button>
      </a>
      </div>
    </section>
		`)
});

// Adding some HATEOAS links.
app.get('/api', (req, res) => {
  res.json({
    links: [
      {
        href: 'api/users',
        rel: 'users',
        type: 'GET',
      },
      {
        href: 'api/users',
        rel: 'new-user',
        type: 'POST',
      },
      {
        href: 'api/item',
        rel: 'items',
        type: 'GET',
      },
      {
        href: 'api/item',
        rel: 'new-item',
        type: 'POST',
      },
    ],
  });
});

// New Users page
app.get('/users/new', (req, res) => {
  res.send(`
      <div> 
        <h1>Create a User</h1>
        <form action="/api/users?api-key=perscholas"  method="POST">
          Name: <input type="text" name="name" /> <br />
          Username: <input type="text" name="username" /> <br />
          Email: <input type="text" name="email" /> <br />
          <input type="submit" value="Create User" />
        </form>
      </div>
    `);
});

// The only way this middlware runs is if a route handler function runs the "next()" function
app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Resource Not Found' });
});

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});