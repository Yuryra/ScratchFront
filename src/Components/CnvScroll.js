
import {useNavigate} from "react-router-dom" 
import {useState, useEffect, useRef} from "react" 

// import AiQnaList from "./AiQnaList.js"

// import "../App.css";
import {QnA_List}  from '../Logic/CnvClasses.js'

export const CnvScroll = ({records}, props) => {
    const [markedXunitIdx, setMarkedXunitIdx] = useState(-1)
    //[xunits, setXunits] = useState([])

    const handleItemClick = (idx) => { 

        setMarkedXunitIdx(idx)
        // find previously marked
        // and 
    }
    
    console.log('==> XXX ---------------------------------------------------')
    console.log("==> XXX entering CnvScroll, Records : " + JSON.stringify(records))


    const bottomRef = useRef()
    const bottomLiRef = useRef()


    const qnal = QnA_List.createFromRecords(records)
    let units = []
    if (qnal) units = qnal.getUnits()



    useEffect(()=>{
        //divEl.scrollTop = divEl.scrollHeight;
        console.log("==> XXX effect of [qnal]")
        if (bottomRef.current && markedXunitIdx == -1) {
            console.log("==> XXX useEffect kickied in")
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [qnal])



    // for now repaint all?
    function xUnitsGen(units) {


        let xunits = []
        for (let i = 0; i < units.length; i++) {
            let u = units[i]
            //xunits.push(<div><br/><div>{u.q}</div><div>{u.a}</div></div>)
            let litem = null

            // u.q = "aaa"
            // u.a = "bbb"

            litem = <li key={i} 
                onClick={()=>handleItemClick(i)}
                
                style={{
                    backgroundColor: i == markedXunitIdx? 'yellow' : 'white',
                }}
                >
                <br/>
                <div className="cnvQuestion">{u.q}</div>
                <div className="cnvAnswer">{u.a}</div>
                </li>

            // if (i ==  units.length - 1) {
            //     litem = <li ref={bottomLiRef} ><br/><div>{u.q}</div><div>{u.a}</div></li>
            // } else {
            //     litem = <li><br/><div>{u.q}</div><div>{u.a}</div></li>
                
            // }
            
            xunits.push(litem)
            
        }
        return xunits
    }

    const xunits = xUnitsGen(units)

    console.log("==> XXX before return of component")
    return (
        <div className="cnvScroll">
            

            <ul>{xunits.map(dd=>dd)}</ul>
            <div style={{ float:"left", clear: "both" }}
                ref={bottomRef}>
                    {'======================================'}
            </div>
  
        </div>
         
    )


}