import axios from "axios"
import {useNavigate, useHistory, Link} from "react-router-dom" 
import {useState, useEffect, useRef} from "react" 
import {DoDo, ScratchBackUrl} from '../Utils/gptCall.js'
import AiQnaList from "./AiQnaList.js"
import {immitateSaveRecord, Get_ScratchBack_Records} from "../Utils/MiscForApp.js"
import "../App.css";
import {QnA_List, QnA_Unit}  from '../Logic/CnvClasses.js'
import {CnvScroll} from "./CnvScroll.js"
import AiPage_ModalParams from "./AiPage_ModalParams.js"

// - works only on server node.js .. import { readFileSync, writeFileSync } from 'fs' //
import MiscParamsDefault from "./MiscParams.json"

// alternative technique:
import {Apd,AiPageDefaults} from "./AiPageDefaults.js"

////////////////////// end of imports //////////////////////
const MiscParamsLocalStorageKey="AiPageMiscParams"

console.log("==> loading aipage.js")
console.log("==> AiPageDefaults: " + JSON.stringify(AiPageDefaults));
console.log("==> Apd: " + JSON.stringify(Apd()));
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

    const [noPreface, setNoPreface] = useState(false)

    // bad design :
    const [cnvRecords, setCnvRecords] = useState(0)
    // const [cnvNewUnit, setCnvNewUnit] = useState(null)
    // const [cnvUnits, setCnvUnits] = useState(null)

    const [miscParams, setMiscParams] = useState(null)
    const [miscParamsDialogOn, setMiscParamsDialogOn] = useState(false)

    const [jsonData, setJsonData] = useState(null);


    console.log('AiPage render ' + question)

    const questionElRef = useRef()

    const jsonData_Fpath = "./MiscParams.json"

    useEffect(()=>{
        //way_JustIniting = dbStartConection 
        const prevQuestion = window.localStorage.getItem(AiPageQuestionStorageKey) || 'starting from storage'
        console.log('[] UseEffect fired: question:' + question)
        setQuestion(prevQuestion)
        console.log('[] UseEffect fired: prev question:' + prevQuestion)
        questionElRef.current.value = prevQuestion // -<- this is instead of value={question} crap ?
        
        // when component is mounted :
        // const data = readFileSync(jsonData_Fpath);
        // setJsonData(JSON.parse(data));
        console.log("==> Apd: " + JSON.stringify(Apd()));
        let jd = window.localStorage.getItem(MiscParamsLocalStorageKey)
        try{
            jd=JSON.parse(jd)
        } catch {
            jd = null
        }
        
        if (!jd) jd = Apd() //AiPageDefaults //MiscParamsDefault
        setJsonData(jd)
        
        // Return a cleanup function to be run when the component is unmounted
        // thanks chatGPT for reminding me that :)!
        return () => {
            // This code will run when the component is unmounted

            /* //    design note ["closure" of jsonData happens only once on the mounting]
                // it is better to write to localstorage EVERY time the [jsonData] changes
                console.log('==> jsonDat on return useEffect(..[]) ' + JSON.stringify(jsonData));
                window.localStorage.setItem(MiscParamsLocalStorageKey,JSON.stringify(jsonData)) 
            */

            console.log('Component is unmounted.');
            // Do any cleanup work here, such as removing event listeners or clearing intervals
            };

        }
    ,[])

    useEffect(()=>{
        if (jsonData != null) {
            // see design note ["closure" of jsonData happens only once on the mounting]
            console.log('==> jsonDat on useEffect(..[jsonData]) ' + JSON.stringify(jsonData));
            window.localStorage.setItem(MiscParamsLocalStorageKey,JSON.stringify(jsonData))
        }} 
        ,[jsonData])
    //

//////////////////////////////////////////////////////////////////////////

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


      
        window.localStorage.setItem(AiPageQuestionStorageKey, qq)

        //setQuestion(qq)
        //console.log('onFormSubmit 2')


        let  mood="as if you are a thief"
            //const mood = moodEl.current.value

        let gptAnswer = "default answer"
        let b = true
        if (b) {
            const qnal = QnA_List.createFromRecords(cnvRecords)
            const preface = (noPreface ? '' 
              : qnal.combined('\n'))

            const expandedQuestion = preface + '\n' + qq + '\n' + mood
            // - to immitate 'context of the conversation'
            // see design note [question is just the last in context] 

            // gptAnswer = await DoDo_DaVinci({question:expandedQuestion
            //     , mood:mood}) // fnction will know how to detructure ..

            let units = qnal.getUnits()
            gptAnswer = await DoDo({ qnaUnits: units
                , question:qq
                , mood:mood})

                const xxx = 1

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

        //         // // Update cnv units so that they will be redisplayed
        //         // const cnvNewUnit = setCnvNewUnit(new QnA_Unit({q:qq, a:gptAnswer}))
        // cnvUnits.add(cnvNewUnit)
 
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
            // 
            
            const recs = Get_ScratchBack_Records(null)
            setCnvRecords(recs)

            } catch (error) {
                setCnvDebugHtml(JSON.stringify(error.response.data))
                console.log("AiPage.onFormSubmit: error in post: " + JSON.stringify(error.response.data));
            }

        // tigger the rendering
        setRrCount(rrCount + 1)
    }

//////////////////////

    
//////////////////////

const miscParams_CallBack = (jData) => {
    //alert(data)
    setJsonData(jData) //{ ...jsonData, [key]: value });
    // and what the hell - update the whole local storage on every call?
    //window.localStorage.setItem(MiscParamsLocalStorageKey,JSON.stringify(jData))
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

            <Link to={{pathname:"../ParamsPage", par0:"dasdads"}} aaa={123} bbb='dasad'>
                    Change parameters.
            </Link>

       
            <button  onClick={e => {
                setMiscParamsDialogOn(true)
            }} > Change Parameters Modal </button>
            <AiPage_ModalParams onClose={(arg)=>{setMiscParamsDialogOn(false)}} show={miscParamsDialogOn} 
                callBack={miscParams_CallBack} 
                jsonData={jsonData}
            />

        </aside>
        <section className="chatbox">


            <div  className="conversationId">{conversationId}</div>
            <CnvScroll records={cnvRecords} />
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
            

        if (false) {} else 
            {(cnvDebugHtml) ? 

                <DebugDisplay rrCount = {rrCount} html={cnvDebugHtml} records={cnvRecords}/>  
                : 
                <AiQnaList rrCount = {rrCount} cnvCallBack={cnvCallback}/> 
            }
        
        </section>


    </div>
    );

} 

const DebugDisplay = (props) => {
    const html = props.html
    const cnvRecords = props.records
    const lsep = "<br/>"
    const qnal = QnA_List.createFromRecords(cnvRecords)

   
    let pars = []
    const units = qnal.getUnits()
    for (let i = 0; i < units.length; i++) {
        const u = units[i]
        let paragraph = u.combined()
        pars.push(<div><div>{u.q}</div><div>{u.a}</div></div>)
    }
    return (
        <div className="cnvDebugClass">
            {pars.map(dd=>dd)}
        </div>
         
    )

    qnal.combined(lsep)

    console.log("==> got cnvRecords")
    //return <div>{html}</div>
    //https://stackoverflow.com/questions/36104302/how-do-i-convert-a-string-to-jsx
    return (
        <div className="Container cnvDebugClass" dangerouslySetInnerHTML={{__html: html}}></div>
      )

}


export default AiPage;