const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/users.js');
const itemRouter = require('./routes/items.js');
const orderRouter = require('./routes/orders.js');

// Body parser middlware
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});


// API Routes
app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/orders', orderRouter);

// What shows on the home page
app.get('/', (req, res) => {
	res.send(`
		<h1>Library Store</h1>
		<div><a href="/item/shirt"><img src="" alt=""><h3>Shirt</h3></a>
		<button type="button">Add to cart</button></div>
		<div><a href="/item/mug"><img src="" alt=""><h3>Mug</h3></a>
		<button type="button">Add to cart</button></div>
		<div><a href="/item/tote"><img src="" alt=""><h3>Tote</h3></a>
		<button type="button">Add to cart</button></div>
		<div><a href="/item/pen"><img src="" alt=""><h3>Pen</h3></a>
		<button type="button">Add to cart</button></div>
		<div><a href="/item/pencil"><img src="" alt=""><h3>Pencil</h3></a>
		<button type="button">Add to cart</button></div>
		<div><a href="/item/bookmark"><img src="" alt=""><h3>Bookmark</h3></a>
		<button type="button">Add to cart</button></div>
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
        rel: 'users',
        type: 'POST',
      },
      {
        href: 'api/posts',
        rel: 'posts',
        type: 'GET',
      },
      {
        href: 'api/posts',
        rel: 'posts',
        type: 'POST',
      },
    ],
  });
});

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