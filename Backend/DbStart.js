/* https://github.com/Automattic/mongoose/issues/11803 
   https://mongoosejs.com/docs/browser.html
     .. Mongoose's browser library is very limited. The only use case it supports is validating documents as shown below.
   mongoose__WEBPACK_IMPORTED_MODULE_1__.connect is not a function
*/

import mongoose from "mongoose";

// see https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/

const dbUri_PREV = "mongodb+srv://yuryra:W9nd42E13PA6yAjm@cluster0.przggaa.mongodb.net/?retryWrites=true&w=majority"
const stockDbUri = 'mongodb://localhost:27017/fullstack_db'

const dbName = "test"

const dbUri = "mongodb+srv://yuryra:W9nd42E13PA6yAjm@cluster0.przggaa.mongodb.net/" + dbName
   + "?retryWrites=true&w=majority"

   console.log("=== EXPORTING MONGO DB : before connect ===")


mongoose.connect(dbUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));


//===================================================================================


// import {getRecords, saveRecord, saveRecordInner} from "./DbComms.js"
// for (let i = 0; i < 2; i++) {
// let constTestRecord = {
//     question: "test question",
//     answer: "test answer",
//     mood: "test mood",
//     ts: new Date()
//   }
  
//   const ddd = await saveRecordInner(constTestRecord)
// }

// express will listen on the port and serve outside
import express from "express";
import cors from "cors";
import UserRoute from "./DbRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
 
app.listen(5000, ()=> console.log('Server up and running...'));


//export default db;
  
//   console.log(ddd)