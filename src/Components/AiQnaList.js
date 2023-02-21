import React, { useState, useEffect } from "react";
import axios from "axios";
import {ScratchBackUrl} from '../Utils/gptCall.js'
import {CnvTape, CnvTable, CnvShow} from './PlayPage.js'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//import MaterialTable from " @material-table/core@next"; // a splinter group : https://stackoverflow.com/questions/69783973/mui-the-fade-color-utility-was-renamed-to-alpha-to-better-describe-its-func#:~:text=material-table%20package%20is%20not%20actively%20maintained%20anymore%20and,by%20installing%20the%20next%20version%3A%20npm%20install%20%40material-table%2Fcore%40next
import MaterialTable, { Column } from '@material-table/core';
//import MaterialTable from 'material-table'; // ?? https://mui.com/material-ui/migration/migration-v4/

//import { Link } from "react-router-dom";

const AiQnaList = (props) => {
  
    const [records, setRecords] = useState([]);
    // let records = []
    // function setRecords(recs) {
    //     records = recs
    // }



 
  console.log('AiQnaList [re]rendering start :' + JSON.stringify(props))

  // useEffect( () => {
  //   console.log('AiQnaList useEffect() on [], ' + records.length)
  // },[]);

  useEffect( () => {
    console.log('AiQnaList useEffect() before getRecords :' + JSON.stringify(props))
    getRecords();
    console.log('AiQnaList useEffect() after getRecords, ' + records.length)
  },[props.rrCount]);
 
  async function immitateGetRecords (prevRecords)
  {
    
    let recs = []
    for (let i = 0; i< props.rrCount; i++) {
      if (i < prevRecords.length ) {
        recs.push(prevRecords[i])
      } else {
        // id: is for data table. _id is for react by hand list
        //_id: i
        recs.push({id:i, question: "qqq" + i, answer: "aaa" + i, mood: "mmm", ts: new Date()})
      }
      
    }
    return recs
  }


  async function getRecords() {
    console.log('===> ScratchBackUrl : ' + ScratchBackUrl)
    try {
      const response = await axios.get(ScratchBackUrl + '/getRecords');
 
      
      const recs = response.data

      //const recs = await immitateGetRecords(records)

      // resort records 
      recs.sort((a,b)=>{
        
      // return (b.ts.getTime() - a.ts.getTime());})
        return (new Date(b.ts) - new Date(a.ts))})

      for (let i = 0; i< recs.length; i++) {
        recs[i]["id"] = i
      }

      setRecords(recs);
      console.log('AiQnaList getRecords() finished')

    } catch (error) {
      console.log('===>\n' + error);
      
      //     
    }
  };

  //getRecords().then(()=>{})
 

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(ScratchBackUrl + /users/${id}`);
//       getUsers();
//     } catch (error) {
//       console.log(error);
//     }
//   };

const FmtDate = (dt) => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    
    //console.log(today.toLocaleDateString("en-US")); // 9/17/2016
    return (new Date(dt)).toLocaleString() //"en-US", options)
//https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/

}
 
// const data = [
//   { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
//   { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
// ];

// const columns = [
//   { title: "Name", field: "name" },
//   { title: "Surname", field: "surname" },
//   { title: "Birth Year", field: "birthYear", type: "numeric" },
// ];


// return <MaterialTable title="Basic Table" columns={columns} data={data} />;

// const columns = [
//   { title: "Id", field: "_id" },
//   { title: "Question", field: "name" },
//   { title: "Answer", field: "surname" },
//   { title: "Mood", field: "mood" },
//   { title: "Tsr", field: "ts", type: "date" },
// ];


// return <MaterialTable title="History" columns={columns} data={records} />;

  if (false)
  return (
    <div className="columns mt-5">
      <div className="column is-half">


        {/* <Link to="add" className="button is-success">
          Add New
        </Link>

        &nbsp;<Link to="exp" className="button is-success">
          Exp
        </Link> */}
        {console.log('==> Rerendering')}
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
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.conversationId}</td>
                <td>{record.question}</td>
                <td>{record.answer}</td>
                <td>{record.mood}</td>
                <td>{FmtDate(record.ts)}</td>
                {/* <td>
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-info is-small mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


////////////////////////////////////////////////////////////////////////////////////////

// see also https://mui.com/material-ui/getting-started/installation/
// npm install @mui/material @emotion/react @emotion/styled
// then for react table that is not supported in v5 ::  npm i @material-table/core 

// Uncaught Error: MUI: The data grid component requires all rows to have a unique `id` property.
// Alternatively, you can use the `getRowId` prop to specify a custom id for each row.

// this is about [not data] Grid :https://stackoverflow.com/questions/61525832/material-ui-long-text-wrapped-in-grid
// this is Grid : https://mui.com/material-ui/react-grid/

// https://www.material-react-table.com/docs/examples/editing-crud
// https://blog.logrocket.com/material-table-react-tutorial-with-examples/


const columns_Grid = [
  { headerName: "Id", field: "id", width:70 },
  { headerName: "Question", field: "question" },
  { headerName: "Answer", field: "answer" },
  { headerName: "Mood", field: "mood" },
  { headerName: "Ts", field: "ts", type: "date" },
];

if (false)
return (

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={records}
        columns={columns_Grid}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );


  const columns_Table = [
  { title: "Id", field: "id", width:70 },
  { title: "Cid", field: "conversationId", width:70 },
  { title: "Question", field: "question" },
  { title: "Answer", field: "answer" },
  { title: "Mood", field: "mood" },
  { title: "Ts", field: "ts", type: "date" },
  ]


  //materaiTable with cells not wider than 50 pixels

  if (false)
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
  return <CnvShow records={records} />
};
export default AiQnaList;