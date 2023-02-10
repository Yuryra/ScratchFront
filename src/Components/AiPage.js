import axios from "axios"
import {useNavigate} from "react-router-dom" 
import {useState, useEffect, useRef} from "react" 
import {DoDo, ScratchBackUrl} from '../Utils/gptCall.js'
import AiQnaList from "./AiQnaList.js"
import {immitateSaveRecord} from "../Utils/MiscForApp.js"



// naive  attempt to use mongo from browser
// import dbStartConection from "../DbStuff/DbStart.js"
// import { saveRecordInner} from "../DbStuff/DbComms.js"

const AiPageQuestionStorageKey='AiPageQuestionStorageKey'


const AiPage = (props) => {
    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState("no answer yet")
    const [query, setQuery] = useState('no query yet')
    const [rrCount, setRrCount] = useState(0)
    const navigate = useNavigate()

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
    //,[])
//   Line 36:6:    React Hook useEffect has a missing dependency: 'question'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    )

    const goBack = async (e) => {
        e.preventDefault()
        navigate('/')
        console.log('AiPage, wen bac to /')
    }
    // console.log('AiPage rendered?')

    


    function delay(t) {
        return new Promise(resolve => setTimeout(resolve, t))
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

   
        window.localStorage.setItem(AiPageQuestionStorageKey, qq)

        //setQuestion(qq)
        //console.log('onFormSubmit 2')


        const mood="as if you are a thief"
            //const mood = moodEl.current.value

        let gptAnswer = "default answer"
        let b = true
        if (b) 
            gptAnswer = await DoDo({question:qq, mood}) // fnction will know how to detructure ..
        else
            // immitate getting gptAnswer as a copy of question:
            gptAnswer = await delay(1000)

        //gptAnswer = qq

        // db result right away
        // naive - let xxx = await saveRecordInner({question:qq, answer: ddd, mood: mood, ts: new Date()})
        try {
            const postData = {question: qq, answer:gptAnswer, mood: mood, ts : new Date()}
            console.log("AiPage.onFormSubmit: before post: " + JSON.stringify(postData));
            //const response = 
            await axios.post(ScratchBackUrl + '/saveRecord'
                            , postData);
        
            } catch (error) {
                console.log("AiPage.onFormSubmit: error in post: " + JSON.stringify(error.response.data));
            }

        //  console.log('onFormSubmit 3')
        
        console.log('handleQuestionChange: a: ' + gptAnswer)
        setAnswer(gptAnswer + '\n nooooanswer for: - ' + qq)

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
    const doExp = async (e) => {
        e.preventDefault()
        await immitateSaveRecord(rrCount + 1)
        setRrCount(rrCount + 1)

    }
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
    <>
    <form onSubmit={onFormSubmit}>
        <button onClick={goBack}> goback </button>
        <button onClick={doExp}> exp </button>
        <br></br><input type="submit"/>
        <div>
            question: 
            <textarea 
            ref={questionElRef} 
            name="questionArea" cols="50" rows="3" 
            onChangeZZZ={handleQuestionChange} valueZZZ={question}
            >
                {/* does not matter what's here because it is a controlled component??? {question} */}
            </textarea>

        </div>
        <div>
            <textarea cols="50" rows="10" value={answer}>
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
    <button onClick={doRemove}>Remove Selected</button>
    <AiQnaList rrCount = {rrCount}/>
    </>
    )

} 

export default AiPage;