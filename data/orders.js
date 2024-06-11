// Creating the simple data structures we'll work with.
// How we choose to store and organize this data is very important!
// Different options and techniques for storing data and
// creating relationships between different data sets will be
// explored during lessons on database integrations and techniques.

// The "posts" data will include information about
// social media posts that the users make.
const orders = [
	{
	  id: 1,
	  userId: 1,
	  item: 'Mug',
	  quantity: 1,
	  cost: 15,
	  pickupLocation: 'Kilton',
	},
	{
	  id: 2,
	  userId: 1,
	  item: 'Mug',
	  quantity: 1,
	  cost: 15,
	  pickupLocation: 'Lebanon',
	},
	{
	  id: 3,
	  userId: 1,
	  item: 'Shirt',
	  size: "S",
	  quantity: 1,
	  cost: 15,
	  pickupLocation: 'Kilton',
	},
	{
	  id: 4,
	  userId: 2,
	  item: 'Pen',
	  quantity: 1,
	  cost: 5,
	  pickupLocation: 'Kilton',
	},
	{
	  id: 5,
	  userId: 2,
	  item: 'Bookmark',
	  quantity: 3,
	  cost: 3,
	  pickupLocation: 'Lebanon',
	},
	{
	  id: 6,
	  userId: 2,
	  item: 'Tote',
	  quantity: 1,
	  cost: 10,
	  pickupLocation: 'Kilton',
	},
	{
	  id: 7,
	  userId: 3,
	  item: 'Pencil',
	  quantity: 2,
	  cost: 4,
	  pickupLocation: 'Kilton',
	},
	{
	  id: 8,
	  userId: 3,
	  item: 'Mug',
	  quantity: 1,
	  cost: 15,
	  pickupLocation: 'Lebanon',
	},
	{
	  id: 9,
	  userId: 3,
	  item: ['Pen', 'Pencil'],
	  quantity: 1,
	  cost: 7,
	  pickupLocation: 'Kilton',
	},
  ];
  
  module.exports = orders;