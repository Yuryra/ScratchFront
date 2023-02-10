import { Configuration, OpenAIApi } from "openai";


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

export  async function DoDo({question, mood}) {

    //return 'not yet xxxx...' + '\n' + KEY

    try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
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
export  function scratchBackUrl() {
  // https://learn.microsoft.com/en-us/azure/app-service/app-service-web-nodejs-best-practices-and-troubleshoot-guide
  //https://stackoverflow.com/questions/25678419/how-to-check-if-code-is-running-on-azure-websites/25695126#25695126
  //https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
  
  //return 'http://localhost:5000'


  // on kudu .. /env : WEBSITE_SITE_NAME = ScratchBackApp .. Rest
  if (false && !String.IsNullOrEmpty(process.env.GetEnvironmentVariable("WEBSITE_SITE_NAME"))) {
    return 'http://localhost:5000'
  } else {
    return 'https://' + 'ScratchBackRest' + '.azurewebsites.net'
  }
}
export  const ScratchBackUrl = scratchBackUrl();