//import React from "react"
import React, { useState, useEffect } from "react";

//export default class AiPage_ModalParams extends React.Component {
export default  function AiPage_ModalParams(props)  {
  //const [jsonData,setJsonData] = useState({yury:"rapoport"})
      // useEffect( ()=> {
      //   setJsonData(props.jsonData)
      // }, []
      // )

      if (!props.show) {
        return null;
      }

 
     function onCloseClick() {
        if (props.callBack) props.callBack(props.jsonData)
        props.onClose() 
      }

      const handleInputChange = (e, key) => {
        // e.preventDefault()
        const { value } = e.target;
        // jsonData = { ...jsonData, [key]: value };
        // setJsonData(jsonData)
        props.callBack({ ...props.jsonData, [key]: value })
      };

      //return <div>{this.props.children}</div>;
      return <div className="AiPage_ModalParams_Outer">
        <div className="AiPage_ModalParams_Inner">
            
            <h1>Hello MOdal</h1>
            {/* <br/>
            <input type="text">dasdaddas</input>
            <br/> */}
            {/* <button onClick={props.onClose}>close</button> */}

            {Object.keys(props.jsonData).map((key) => (
                <div key={key}>
                <label>{key}: </label>
                <input
                    type="text"
                    value={props.jsonData[key]}
                    onChange={(e) => handleInputChange(e, key)}
                />
                </div>
            ))}


            <button onClick={onCloseClick}>close</button>
        </div>
      </div>;
    
  }

  //{/* <button onClick={props.onClose}>close</button> */}