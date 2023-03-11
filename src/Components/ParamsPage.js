import React, { useState } from "react";
import {useNavigate} from "react-router-dom" 
//import {useState, useEffect} from "react" 



    

const ParamsPage = (props) => {
  const [stringParam, setStringParam] = useState("");
  const [numberParam, setNumberParam] = useState(0);
  const [enumParam, setEnumParam] = useState("");


  const navigate = useNavigate()
  const goBack = async (e) => {
      
      navigate(-1) // go back to the caller
      console.log('DbPage, wen bac to /')
  }

  const handleStringParamChange = (event) => {
    setStringParam(event.target.value);
  };

  const handleNumberParamChange = (event) => {
    setNumberParam(event.target.valueAsNumber);
  };

  const handleEnumParamChange = (event) => {
    setEnumParam(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("String parameter:", stringParam);
    console.log("Number parameter:", numberParam);
    console.log("Enumeration parameter:", enumParam);
    // TODO: Save changes to the server or local storage
  };

  return (
    <div className="edit-parameters-page">
      <div>
        <button onClick={goBack}> goback </button>
      </div>
      <h1>Edit Parameters</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="string-param">String Parameter</label>
          <input
            type="text"
            id="string-param"
            value={stringParam}
            onChange={handleStringParamChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number-param">Number Parameter</label>
          <input
            type="number"
            id="number-param"
            value={numberParam}
            onChange={handleNumberParamChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="enum-param">Enumeration Parameter</label>
          <select id="enum-param" value={enumParam} onChange={handleEnumParamChange}>
            <option value="">-- Select an option --</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ParamsPage;
