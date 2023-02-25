import axios from "axios"
import {useNavigate} from "react-router-dom" 
import {useState, useEffect, useRef} from "react" 
import {DoDo, ScratchBackUrl} from '../Utils/gptCall.js'
import AiQnaList from "./AiQnaList.js"
import {immitateSaveRecord} from "../Utils/MiscForApp.js"
import "../App.css";
import {QnA_List}  from '../Logic/CnvClasses.js'


// naive  attempt to use mongo from browser
// import dbStartConection from "../DbStuff/DbStart.js"
// import { saveRecordInner} from "../DbStuff/DbComms.js"

const AiPageQuestionStorageKey='AiPageQuestionStorageKey'


const AiPage = (props) => {
    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState("no answer yet")
    const [query, setQuery] = useState('no query yet')
    const [conversationId, setConversationId] = useState('Default Conversation')

    const [rrCount, setRrCount] = useState(0)

    const [cnvDebugHtml, setCnvDebugHtml] = useState(null)
    const navigate = useNavigate()


    // bad design :
    const [cnvRecords, setCnvRecords] = useState(0)

    console.log('AiPage render ' + question)

    const questionElRef = useRef()

    useEffect(()=>{
        //way_JustIniting = dbStartConection 
        const prevQuestion = window.localStorage.getItem(AiPageQuestionStorageKey) || 'starting from storage'
        console.log('[] UseEffect fired: question:' + question)
        setQuestion(prevQuestion)
        console.log('[] UseEffect fired: prev question:' + prevQuestion)
        questionElRef.current.value = prevQuestion // -<- this is instead of value={question} crap ?
        }
    ,[])
//  stupi elint == Line 36:6:    React Hook useEffect has a missing dependency: 'question'. Either include it or remove the dependency array  react-hooks/exhaustive-deps


    const goBack = async (e) => {
        e.preventDefault()
        navigate('/')
        console.log('AiPage, wen bac to /')
    }
    // console.log('AiPage rendered?')

    


    function delay(t) {
        return new Promise(resolve => setTimeout(resolve, t))
      }
    const findConversationById = async (id) =>{

        try {
            const postData = {conversationId: id}
                
            console.log("AiPage.onFormSubmit: before post: " + JSON.stringify(postData));
            //const response = 
            await axios.post(ScratchBackUrl + '/findConversations'
                            , postData);
        
            } catch (error) {
                console.log("AiPage.onFormSubmit: error in post: " + JSON.stringify(error.response.data));
            }

    }

    const  onFormSubmit  = async (e) => {
        e.preventDefault()
        //setQuestion(this.value)
        console.log('------------------\n onFormSubmit: ' )
        let qq =  questionElRef.current.value
        if (qq === undefined || qq === null || qq.trim() === '') {
            alert('No Empty Questions!');
            return;
        }

        const prefice = '' //QnA_List.createFromRecords(cnvRecords).combined('\n')
        

   
        window.localStorage.setItem(AiPageQuestionStorageKey, qq)

        //setQuestion(qq)
        //console.log('onFormSubmit 2')


        let  mood="as if you are a thief"
            //const mood = moodEl.current.value

        let gptAnswer = "default answer"
        let b = true
        if (b) {
            mood = prefice + '\n' + mood
            mood = ''
            gptAnswer = await DoDo({question:qq, mood:mood}) // fnction will know how to detructure ..
        } else {
            // immitate getting gptAnswer as a copy of question:
            gptAnswer = await delay(1000)
        }

        //gptAnswer = qq

        // db result right away
        // naive - let xxx = await saveRecordInner({question:qq, answer: ddd, mood: mood, ts: new Date()})
        try {
            const postData = {conversationId: conversationId,
                question: qq, answer:gptAnswer, mood: mood, ts : new Date()}
                
            console.log("AiPage.onFormSubmit: before post: " + JSON.stringify(postData));
            //const response = 
            await axios.post(ScratchBackUrl + '/saveRecord'
                            , postData);
        
            } catch (error) {
                console.log("AiPage.onFormSubmit: error in post: " + JSON.stringify(error.response.data));
            }

        //  console.log('onFormSubmit 3')
        
        console.log('handleQuestionChange: a: ' + gptAnswer)
        setAnswer(gptAnswer)

        // trying to rerender the list
        setQuery({q:qq, a:gptAnswer})

        // only after all ai is done - trigger rerendering the list
        setRrCount(rrCount + 1)
    }

    const handleQuestionChange = (e) => {
        //setQuestion(this.value)
        console.log('handleQuestionChange')
    }
    const handleQueryChange = (e) => {
        //setQuery(this.value)
        console.log('handleQueryChange')
    }

    //------------------------------------------
    const doExp = async (e) => {
        e.preventDefault()

        if (false) {
        await immitateSaveRecord(rrCount + 1)
        setRrCount(rrCount + 1)
        } else if (cnvDebugHtml) {
            setCnvDebugHtml(null)
        } else {
            //f('zero', {arg1 : "dsd"},'dada')
            const lsep = "<br/>"
            const txt = QnA_List.createFromRecords(cnvRecords).combined(lsep)
            
            console.log('==> QnA_List : ' + txt)
            
            setCnvDebugHtml(txt)
            
            console.log(txt)
        }
    }

    const cnvCallback = function ({records}) {
        // const records = [
        //   {q:"hi there", a:"hello, i am machine"},
        //   {q:"who are you?", a:"i am machine, stupid"},
        // ]
        setCnvRecords(records)
 
      }
    //----------------------------------------------
    const doRemove = async (e) => {
        e.preventDefault()
        await immitateSaveRecord(rrCount + 1)
        
        try {
            const postData = {filter: {}}
            console.log("...");
            //const response = 
            await axios.post(ScratchBackUrl + '/deleteRecords'
                            , postData);
        
            } catch (error) {
                console.log("AiPage.onFormSubmit: error in post: " + JSON.stringify(error.response.data));
            }
        // tigger the rendering
        setRrCount(rrCount + 1)
    }



    return (
    <div className="App">
    
        <aside className="sidemenu">
      
            <div className="side-menu-button" onClickXXX={goBack}>
                <span>+</span>
                 New session </div>


            <button onClickXXX={goBack}> yyy </button>
            <button onClickXXX={goBack}> zzz </button>
            <button onClick={goBack}> goback </button>
            <button onClick={doExp}> exp </button>
            <button onClick={doRemove}>Remove Selected</button>

        </aside>
        <section className="chatbox">


            <div  className="conversationId">{conversationId}</div>
            <form className="myForm" onSubmit={onFormSubmit}>

                <br></br><input type="submit"/>
                <div>
                    question: 
                    <textarea className="chat-input-textarea"
                    ref={questionElRef} 
                    name="questionArea" colsZZZ="50" rows="5" 
                    onChangeZZZ={handleQuestionChange} valueZZZ={question}
                    >
                        {/* does not matter what's here because it is a controlled component??? {question} */}
                    </textarea>

                </div>
                <div>
                    <textarea style={{"background-color": "gray"}}
                        className="chat-input-textarea"
                        colsZZZ="50" rows="10" value={answer}>
                        {answer}
                    </textarea>
                </div>

            </form>

            <textarea 

                name="queryArea" cols="50" rows="2" 
                onChangeZZZ={handleQueryChange} value={JSON.stringify(query)}
                >
                    {/* does not matter what's here because it is a controlled component??? {question} */}
                </textarea>
            

        
            {(cnvDebugHtml) ? 

                <DebugDisplay rrCount = {rrCount} html={cnvDebugHtml} />  
                : 
                <AiQnaList rrCount = {rrCount} cnvCallBack={cnvCallback}/> 
            }
        </section>


    </div>
    );

} 

const DebugDisplay = (props) => {
    const html = props.html
    //return <div>{html}</div>
    //https://stackoverflow.com/questions/36104302/how-do-i-convert-a-string-to-jsx
    return (
        <div className="Container cnvDebugClass" dangerouslySetInnerHTML={{__html: html}}></div>
      )

}


export default AiPage;