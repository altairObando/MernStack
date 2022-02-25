import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import 'react-datasheet-grid/dist/style.css'
if(!window.validateGUID){
  window.validateGUID = (GUID) => {
    let pattern = /^[0-9a-fA-F]{24}$/;
    return pattern.test(GUID);
  }
}

window.BigInt.prototype.toJSON = function() { return this.toString()  }



ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
