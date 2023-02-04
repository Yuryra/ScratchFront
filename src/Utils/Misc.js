


// a function that returns a promise
function fnToGenAPromise(dataToResolve, dataToReject = 'rejected error'
    , resolvedDelayMillis = 500, rejectedDelayMillis = 600) {
  return new Promise((resolveFn, rejectFn) => {
      if (resolvedDelayMillis >= 0) setTimeout(() => resolveFn(dataToResolve), resolvedDelayMillis)
      if (rejectedDelayMillis >= 0) setTimeout(() => rejectFn(dataToReject), rejectedDelayMillis)
    }
  );
}

function isPromise(object) {
    //https://www.debugpointer.com/javascript/check-if-an-object-is-a-promise
    if (Promise && Promise.resolve) {
      return Promise.resolve(object) == object
    } else {
      throw "Promise not supported in your environment" // Most modern browsers support Promises
    }
  }


const fnAsync = async (verbal = false) => {
    //https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token
    const response = await fetch(`http://httpstat.us/500?sleep=1000`
        , {
            //ContentType: 'application/json'
            headers: {Accept: 'application/json'} // Authentication: 'Bearer {token}'
            // ,data: JSON.stringify(SendData)
            }
        );

    if (verbal) console.log('after fetch')
    try {
        const newData = await response.json();
        if (verbal)console.log('after json: ' + JSON.stringify(newData))
    } catch (error) {
        if (verbal)console.log('after json error: ' + JSON.stringify(error))
        return "fn failed"
    }
    
    return "fn() finished"
  };

  if (false) {
    // fnAsync(true);
    // console.log('after fn')
    const b =  isPromise(fnAsync()) 

    // fnAsync(true).then(
    //     (val)=>{console.log('==> fn resolved with : ' + val)},
    //     (val) =>{console.log('==> fn reject with : ' + val)}
    // )

    const p = new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve("aaa")},3000);
        setTimeout(()=>{reject("bbb")},2000);
    })
    p.then((val)=>{console.log('==> resolved with : ' + val); 
        return "First Then Resolved"},
        (val) =>{console.log('==> reject with : ' + val);
        return "First Then Rejected"}
        )
    .then((val)=>{console.log('==> 2 resolved with : ' + val)},
    (val) =>{console.log('==> 2 reject with : ' + val)}
    )
  }

fnToGenAPromise('hi resolved', 'hi rejected', -1, 100 ).then(
  (resolvedResult) =>{
    console.log("==> fnToGenAPromise resolvedResult: " + resolvedResult) 
  }
  ,
  (rejectdResult) =>{
    console.log("==> fnToGenAPromise rejectedResult: " + rejectdResult)
  }
  ).catch((error) => {
    console.log("==> fnToGenAPromise caught: " + error)

  });



/* import React, { useEffect, useState } from 'react';

export default function DataDisplayer(props) {
  const [data, setData] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://httpstat.us/500`);
      const newData = await response.json();
      setData(newData);
    };
    getData();
  }, [props.id]); //<-- This is the dependency array, with a variable

  if (data) {
    return <div>{data.name}</div>;
  } else {
    return null;
  }
}
 */