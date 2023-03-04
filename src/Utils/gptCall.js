import { Configuration, OpenAIApi } from "openai";
import {QnA_Unit} from "../Logic/CnvClasses.js"

// import ddd from "dotenv"
// ddd.config()

// a usefule link on : npm audit fix --force 
//https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported


const kkk = process.env.REACT_APP_OPENAI_API_KEY

console.log ("key: " + kkk)
const KEY = kkk

const configuration = new Configuration({
  apiKey: KEY
});
const openai = new OpenAIApi(configuration);
console.log('=== OpenAIApi ===')

export  async function DoDo_DaVinci({question, mood, modelName = "text-davinci-003"}) {
// "gpt-3.5-turbo"
// "text-davinci-003",
    //return 'not yet xxxx...' + '\n' + KEY

    try {
        const completion = await openai.createCompletion({
          model: modelName,
        //   prompt: "make the answer very optimistic to this question: '" 
        //           + question + "'", //generatePrompt(animal),
            prompt: mood + ": '" 
                  + question + "'", //generatePrompt(animal),
          max_tokens:200,
          temperature: 0.6,
        });
        //res.status(200).json({ result: completion.data.choices[0].text });
        //return completion.data.choices[0].text
        let result = completion.data.choices[0].text
        // completion.then((value) =>{

        //     console.log(value)
        //     result = 'success'

        // },
        //         (error) => {
        //                 console.error(error);
        //                 result = 'failure'
        //         }
        // )

        return result;
  
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
        
          return error.response.data.error.message;
          //  : example :
        //   'That model is currently overloaded with other requests. 
        //   You can retry your request, or contact us through our help 
        //   center at help.openai.com if the error persists. 
        //   (Please include the request ID f2e422e20b4300b37aa43809af260aed
        //      in your message.)'

          
          
          //return error.response.data;
        } else {
          
          return 'failed???' + error.message //JSON.stringify(error)
     
        }
      }

}

// question = null,answer = null, prefix = null, suffix = null, 
//             question_author = null, answer_author = null}) {
//         this.q = question;
//         this.a = answer
//         this.prefix = prefix
//         this.suffix = suffix
//         this.qAuth = question_author // design note [question is just the last in context] actuall the question is just the last in the context?
//         this.aAuth = answer_author

export  async function DoDo({qnaUnits, 
  question, mood = null, prefix = null, modelName = "gpt-3.5-turbo"}) {
//https://platform.openai.com/docs/api-reference/edits/create?lang=node.js
// ["messages": [{"role": "user", "content": "Hello!"},..]

    const prefixSep = '\n'
    let messages = []
    qnaUnits.forEach((qnaUnit, index) => {
      const qContent = (qnaUnit.prefix ? (qnaUnit.prefix + prefixSep) : '' )
                     + qnaUnit.q 
                     + (qnaUnit.suffix ? (qnaUnit.suffix) : '' )

      messages.push({"role":"user",
      "content": qContent})

      const aContent = qnaUnit.a
      messages.push({"role":"assistant",
      "content": aContent})
    })
    //#todo - think thru creating too many lines?

    // now the last:
    const currentQuestionContent = (prefix ? (prefix + prefixSep) : '' )
                     + question 
                    

      messages.push({"role":"user",
      "content": currentQuestionContent})


      try {

          //const response = await openai.listModels();

          const completion = await openai.createChatCompletion({
            model: modelName,
            messages: messages,
            max_tokens:200,
            temperature: 0.6,
          });
          let result = completion.data.choices[0].message.content
  
          return result;
    
        } catch(error) {
          // Consider adjusting the error handling logic for your use case
          if (error.response) {
            console.error(error.response.status, error.response.data);
          
            return error.response.data.error.message;
            //  : example :
          //   'That model is currently overloaded with other requests. 
          //   You can retry your request, or contact us through our help 
          //   center at help.openai.com if the error persists. 
          //   (Please include the request ID f2e422e20b4300b37aa43809af260aed
          //      in your message.)'
  
          } else {
            
            return 'failed???' + error.message //JSON.stringify(error)
       
          }
        }
  
  }


export  function scratchBackUrl() {
  // https://learn.microsoft.com/en-us/azure/app-service/app-service-web-nodejs-best-practices-and-troubleshoot-guide
  //https://stackoverflow.com/questions/25678419/how-to-check-if-code-is-running-on-azure-websites/25695126#25695126
  //https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
  
  //return 'http://localhost:5000'


  // on kudu .. /env : WEBSITE_SITE_NAME = ScratchBackApp .. Rest
  if (true) { //} && !String.IsNullOrEmpty(process.env.GetEnvironmentVariable("WEBSITE_SITE_NAME"))) {
    return 'http://localhost:5000'
  } else if (true) {
    const nm = 'ScratchBackRest'
    return 'https://' + nm + '.azurewebsites.net'
  }
}
export  const ScratchBackUrl = scratchBackUrl();