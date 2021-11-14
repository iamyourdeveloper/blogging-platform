
// *** Example / throw away later

// import { MongoClient } from 'mongodb';
// import nc from 'next-connect';
// import { ncOnError } from '../../utils/ncOptions';

// const handler = nc(ncOnError);

// // register new user
// // POST /api/register
// handler.use(auth); // secure route, check the role of user
// handler.post();


// async const handler = (req, res) => {
//   if (req.method === 'POST') {
//     const data = req.body;
//     // should contain username, avatar image, first and last name and passwords 1 and 2
//     const { username, avatar, firstName, lastName, email, password, password2 } = data;
//     let role = visitor;



//     // CHeck if the email already exists. Ensuring uniqueness;


//     try {
//       // store data fields into db of choice
//       const client = await MongoClient.connect('mongodbatlas url here');
//       // grab data from db, if not existing yet it will be created automatically
//       const db = client.db();
  
//       // access data from the users schema, schema can also be given the same name as the db
//       const usersCollection = db.collection('users');
  
//       // insertOne is a built in query command that inserts one new doc (obj) into the collection, in this case no destructuring of data is needed as we work with JS objects essentially
//       // usersCollection.insertOne({username, password, etc})
//       const result = await usersCollection.insertOne('data');
//       console.log(result);

//       // close client upon retrieval or submission of data
//       client.close();

//       return res.status(201).json({
//         status: 'User registration successful!'
//       })
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error.')
//     }
//   };
// };
// export default handler;