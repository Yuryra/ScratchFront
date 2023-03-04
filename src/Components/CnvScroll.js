
import {useNavigate} from "react-router-dom" 
import {useState, useEffect, useRef} from "react" 

// import AiQnaList from "./AiQnaList.js"

// import "../App.css";
import {QnA_List}  from '../Logic/CnvClasses.js'

export const CnvScroll = ({records}, props) => {
    
    console.log('==> XXX ---------------------------------------------------')
    console.log("==> XXX entering CnvScroll, Records : " + JSON.stringify(records))


    const bottomRef = useRef()
    const bottomLiRef = useRef()


    const qnal = QnA_List.createFromRecords(records)
    let units = []
    if (qnal) units = qnal.getUnits()
    // it's already added in the parent :
    //units.add(newUnit)


    // const scrollToBottom = (el) => {
    //     el.scrollIntoView({ behavior: "smooth" });
    //   }

      
    // useEffect(()=>{
    //     //divEl.scrollTop = divEl.scrollHeight;
    //     console.log("==> XXX effect of []")
        
    //         // scrollToBottom(divEl);
    // }, [])


    useEffect(()=>{
        //divEl.scrollTop = divEl.scrollHeight;
        console.log("==> XXX effect of [qnal]")
        if (bottomRef.current) {
            console.log("==> XXX useEffect kickied in")
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [qnal])

    // for now repaint all?
    let xunits = []
    for (let i = 0; i < units.length; i++) {
        let u = units[i]
        //xunits.push(<div><br/><div>{u.q}</div><div>{u.a}</div></div>)
        let litem = null

        // u.q = "aaa"
        // u.a = "bbb"

        litem = <li>
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

    console.log("==> XXX before return of component")
    return (
        <div className="cnvScroll">
            {/* {xunits.map(dd=>dd)} */}
            <ul>{xunits.map(dd=>dd)}</ul>
            <div style={{ float:"left", clear: "both" }}
                ref={bottomRef}>
                    {'======================================'}
            </div>
        </div>
         
    )


}