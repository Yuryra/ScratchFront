import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import "bulma/css/bulma.min.css"; // links etc look better

// stupid advice by cht?? process.env.CI = false; // chatGPT says so!\

//alert('hi there')
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);


// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import MaterialTable from 'material-table'

// class App extends Component {
//   render() {
//     return (
//       <div style={{ maxWidth: '100%' }}>
//         <MaterialTable
//           columns={[
//             { title: 'Adı', field: 'name' },
//             { title: 'Soyadı', field: 'surname' },
//             { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
//             { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
//           ]}
//           data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
//           title="Demo Title"
//         />
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root')); //react-div'));