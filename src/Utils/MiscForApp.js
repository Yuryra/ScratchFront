import axios from "axios"
import {ScratchBackUrl} from '../Utils/gptCall.js'

export async function immitateSaveRecord(cnt){
  try {
    const postData = {question: "QQQuestion" + cnt, answer:"gptAnswer" + cnt, mood: "mmmmmm", ts : new Date()}
    //console.log("AiPage.onFormSubmit: before post: " + JSON.stringify(postData));
    //const response = 
    await axios.post(ScratchBackUrl + '/saveRecord', postData);

  } catch (error) {
    console.log("AiPage.onFormSubmit: error in post: " + JSON.stringify(error.response.data));
  }
}

export async function Get_ScratchBack_Records(conversationId) {
  console.log('===> ScratchBackUrl : ' + ScratchBackUrl)
  // try {

    const response = await axios.get(ScratchBackUrl + '/getRecords');
    // - axios.get might trow an error from the back end by the caller should handle it
    
    const recs = response.data

    //const recs = await immitateGetRecords(records)

    // resort records 
    recs.sort((a,b)=>{
      
    // return (b.ts.getTime() - a.ts.getTime());}) .. the oldest first
      return (new Date(a.ts) - new Date(b.ts))})

    for (let i = 0; i< recs.length; i++) {
      recs[i]["id"] = i
    }

     console.log(' getRecords() finished')

     return recs

// - the call should handle 

  // } catch (error) {
  //   console.log('===>\n' + error);
  //   return {error:error}
  //   //     
  // }
};