// import { connectToDatabase } from "../../../helper/HelperFunctions";

// export default async function handler(req, res) {
//   const client = await connectToDatabase();

//   const storeData = [];

//   await client
//     .db()
//     .collection("posts")
//     .find()
//     .forEach((post) => storeData.push(post));

//   const data = JSON.parse(JSON.stringify(storeData));

//   res.status(200).json(data);
//   client.close();
// }
