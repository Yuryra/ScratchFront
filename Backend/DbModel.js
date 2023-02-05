import mongoose from "mongoose"
const QnaPair = mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    mood:{
        type: String,
        required: true
    },
    ts:{
        type: Date,
        requied: true 
    }
});

export const dbInfo = {
    dbname: "test",
    dbCollectionName: 'QnaPair'
}

export default mongoose.model('QnaPair', QnaPair);