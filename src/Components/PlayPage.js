// i need a material ui menu strip on top
//https://mui.com/material-ui/react-menu/ - good set of menues


/* #todo

* navbar : 
  https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/ 
* file paths:
  https://stackoverflow.com/questions/37644265/correct-path-for-img-on-react-js
  

*/
//import * as CnvClasses from '../Utils/CnvClasses.js'
import {QnA_List}  from '../Logic/CnvClasses.js'


import SignUp  from "./PlayMuiSample.js"

import React from 'react';
import {useState, useEffect} from "react" 

// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack'
import MaterialTable, { Column } from '@material-table/core'; // - the abandoned in v5 by ofiicial material[dom;]

import "../App.css";
import toggleIcon from "../toggle.ico"; // with import

//  const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },   }));

//   export default function MenuStrip() {   const classes = useStyles();

//   return (     
//   <div className={classes.root}>       
//   <AppBar position="static">         
//     <Toolbar>           
//       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//                       <MenuIcon />           </IconButton>           
//         <Typography variant="h6" className={classes.title}>
//                                       Menu Strip           
//         </Typography>
//         <Button color="inherit">Login</Button>
//       </Toolbar>       
//     </AppBar>     
//   </div>   ); 

const open = Boolean(null);


const listOfItems = ['one', 'two', 'three']

function HorizontalMenu (listOfItems) {


//   return 
//   <Stack direction="row" spacing={2}>
//   {   listOfItems.map((record, index) => 
//        <div>{record}</div>
//      )
//  }

//   </Stack>

return 
  {   listOfItems.map((record, index) => 
       <div>{record}</div>
     )
 }

} 

const Demo=()=>
{
  return (<>
    <h1>Welcome to GeeksforGeeks</h1>
    <button>geek</button>
  </>)
}

const buttonAction = (e) => {
  alert(e.target.innerHTML)

}

const MyComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  fontSize:20,
  padding: 8,
  borderRadius: 4,
});

// }
export default function PlayPage() {

  return (<MyComponent>
    <Demo />
    <Stack  direction="row" spacing={2}>
    <button>first</button>
    {   
      
      listOfItems.map((record, index) => 
      <button onClick={buttonAction} >{record}</button>
      )
        // HorizontalMenu(listOfItems)
    }
    

    </Stack>

    <SignUp />

  </MyComponent>);
}



const CnvDate = (dt) => {

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  
  //console.log(today.toLocaleDateString("en-US")); // 9/17/2016
  return (new Date(dt)).toLocaleString() //"en-US", options)
//https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/

}


export const CnvText = ({records}) => {
  let qq = QnA_List.createFromRecords(records)
  let txt = qq.combined()
  //const txt = QnA_List.createFromRecords(records).combined()

  return <pre>txt</pre>
}

export const CnvTape = ({records}) => {
  let imm = "C:/Windows/WinSxS/amd64_microsoft-windows-userexperience-desktop_31bf3856ad364e35_10.0.19041.2311_none_fb67996b7e84bdb3/Assets/Ninja/CategorySticker.png"
  //imm = "../../public/favicon.ico"

  //return (<img src={"../../public/favicon.ico"}/> )
  return (
    // <div className="cnvTape" style={{position:"relative"}}>
    //     <img src={"../../public/favicon.ico"} style={{
    //       position: "absolute",
    //       top: "0px",
    //       left: "0px",
    //       "z-index":"99"
    //     }}/> 
        // <div className="cnvTape">
        //  {console.log('==> Rerendering  ConversationTape')}
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Cid</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Mood</th>
              <th>Ts</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <>
                <tr key={record._id} className="cnvTapeQuestionRow">
                  <td>{index + 1}</td>
                  <td>{record.conversationId}</td>
                  <td>{record.question}</td>
                  <td>{record.answer}</td>
                  <td>{record.mood}</td>
                  <td>{CnvDate(record.ts)}</td>
                </tr>
                <tr key={record._id} className="cnvTapeAnswerRow">

                  <td>{record.answer}</td>
                  <td>{record.mood}</td>

                </tr>
              </>
            ))}
          </tbody>
        </table>
    // </div>
  );
  };


export const CnvTable = ({records}) => {

  const columns_Table = [
    { title: "Id", field: "id", width:70 },
    { title: "Cid", field: "conversationId", width:70 },
    { title: "Question", field: "question" },
    { title: "Answer", field: "answer" },
    { title: "Mood", field: "mood" },
    { title: "Ts", field: "ts", type: "date" },
    ]
  
  
    //materaiTable with cells not wider than 50 pixels
  
    return <MaterialTable 
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        }
      ]}
  
  
      onSelectionChange = {()=>alert('selection change')} 
  
      options={{ sorting: true,
        selection: true,
        
       }}
       title="Conversing Table" 
       columns={columns_Table} data={records} 
       
       enableColumnResizing
       layoutMode="grid" //instead of the default "semantic" layout mode
       muiTableHeadCellProps={{
         sx: {
           flex: '0 0 auto',
           "background-color": "yellow"
         },
       }}
       muiTableBodyCellProps={{
         sx: {
           flex: '0 0 auto',
         },
       }}
       />;
  
   ////////////////////////////////////////////////
  };

export const CnvShow = ({records}, isText=false) => {
  
  const [isTape, setIsTape] = useState(true)
  const handleToggle = (e) => {
    e.preventDefault();
    if (isTape) {
      setIsTape(false)
    } else {
      setIsTape(true)
    }

  }

  // rerender if toggled
  useEffect(
    ()=>{
      // no action
    }
    ,[isTape]
  )

  return (
    <div className="cnvToggle" style={{position:"relative"}}>
      <img onClick={handleToggle}
        src={toggleIcon} style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        "z-index":"99"
      }}/> 
          {/* <p id="toggle">
              <span onClick={() => setSelected(0)}> Employer </span>
              <span onClick={() => setSelected(1)}> Location </span>     
          </p> */}
          <CnvText records={records} />
          {/* {(isText === true) && <CnvText records={records} />} */}
          {(isTape === true) && <CnvTape records={records} />}
          {(isTape === false) && <CnvTable records={records} />}
      </div>
  )
  // x = (y && z)
};



