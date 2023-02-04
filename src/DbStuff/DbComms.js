import mongoose from "mongoose";
import QnaPair, {dbInfo} from "./DbModel.js";
 
export const getRecords = async (req, res) => {
    //data = req.data
    console.log('--yy-- back: getRecords.. ')
    try {
        const records = await QnaPair.find(); // finds all
        res.json(records);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
// export const getUserById = async (req, res) => {
//     console.log('--yy-- back: getUsersById')
//     try {
//         const user = await User.findById(req.params.id);
//         res.json(user);
//     } catch (error) {
//         res.status(404).json({message: error.message});
//     }
// }
 
export const saveRecord = async (req, res) => {
    console.log('--yy-- back: saveRecord')
    const record = new QnaPair(req.body);
    try {
        const insertedrecord = await record.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({mmm: error.message});
    }
}

export const saveRecordInner_Unused = async (record) => {
    // 
    console.log('--yy-- back: saveRecordInner')
    const insertWhat = new QnaPair(record);
    try {
        const insertedrecord = await insertWhat.save();
        //res.status(201).json(record);
        return "done"
    } catch (error) {
        //res.status(400).json({message: error.message});
        return error.message
    }
}
 
// export const updateUser = async (req, res) => {
//     console.log('--yy-- back: updateUser')
//     try {
//         const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
//         res.status(200).json(updateduser);
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }

// export const deleteUser = async (req, res) => {
//     console.log('--yy--back: deleteUser')
//     try {
//         const deleteduser = await User.deleteOne({_id:req.params.id});
//         res.status(200).json(deleteduser);
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }
export const deleteRecords = async (req, res) => {
    //extract criteria from req.body
    // without mongoose? example : db.users.remove({_id:{$in:[id1, id2, id3, ... ]}})
    // they say that there is only on mongoose for the app so, just like on the start
    //db = mongoose.connection
    //actually i will try it THRU mongoose
    
    //const filter = { age: { $gte: 15 } }
    const filter = req.body.filter
    QnaPair.deleteMany().then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        res.status(400).json({message: error.message});
    });

    console.log('--yy--back: deleteUser')
    try {
        const deleteduser = await User.deleteMany({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
//db.products.deleteMany({ price: 899 })