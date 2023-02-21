
import {BrowserRouter, Routes, Route} from "react-router-dom"
import MainPage from "./Components/MainPage.js"
import DbPage from "./Components/DbPage.js"
import AiPage from "./Components/AiPage.js"
import PlayPage from "./Components/PlayPage.js"

//hi there v1

function App() {
  return (

    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/dbpage" element={<DbPage />}/>
          <Route path="/aipage" element={<AiPage />}/>
          <Route path="/" element={<MainPage />}/>
          <Route path="/playPage" element={<PlayPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )

}


// import AiQnaList from "./Components/AiQnaList.js"
// import {useState, useEffect, useRef} from "react" 
// import axios from "axios"
// import immitateSaveRecord from "../Utils/MiscForApp.js"



// function App_Debug() {
//   const [rrCount, setRrCount] = useState(0)
//   //let rrCount = 111
//   const incrCount = async ()=>{
//     await immitateSaveRecord(rrCount + 1)
//     setRrCount(rrCount + 1)
//   }
//   return ( 
//     <div>
//       <button onClick={incrCount}>increment</button>
//       <AiQnaList rrCount = {rrCount}/>
//     </div>    
//     )

// }

export default App;


