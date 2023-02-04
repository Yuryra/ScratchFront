
// const db = null;
// import express from "express";
//const app = express();

import mongoose from "mongoose";


console.log("=== EXPORTING MONGO DB ===")




// see https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/

const dbUri_PREV = "mongodb+srv://yuryra:W9nd42E13PA6yAjm@cluster0.przggaa.mongodb.net/?retryWrites=true&w=majority"
const stockDbUri = 'mongodb://localhost:27017/fullstack_db'

const dbName = "test"

const dbUri = "mongodb+srv://yuryra:W9nd42E13PA6yAjm@cluster0.przggaa.mongodb.net/" + dbName
   + "?retryWrites=true&w=majority"


   console.log("=== just before .. ===")

   
mongoose.connect(dbUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));


export default db;