import axios from "axios"

export async function immitateSaveRecord(cnt){
  try {
    const postData = {question: "QQQuestion" + cnt, answer:"gptAnswer" + cnt, mood: "mmmmmm", ts : new Date()}
    //console.log("AiPage.onFormSubmit: before post: " + JSON.stringify(postData));
    const response = await axios.post(`http://localhost:5000/saveRecord`, postData);

  } catch (error) {
    console.log("AiPage.onFormSubmit: error in post: " + JSON.stringify(error.response.data));
  }
}