/*
 * @Project: funny screen
 * @Program name: App.js
 * @Author: Yiwen Liu
 * @Date: 2019-07-15 10:25:27
 * @LastEditTime: 2019-07-16 14:26:02
 * @Description: The Main Enter file
 */

import React from 'react';
import './App.css';
import AppItemList from './AppItemList'

function App() {
  return (
    <div className="App">
      {/* <header className="Appheader">
        <h1>Funny Screen</h1>
        <p>A list of pages to be looped</p>
      </header> */}
      <div className="jumbotron jumbotron-fluid" style = {{marginTop: "100px"}}>
        <div className="container">
          <h1 className="display-4">Funny Screen</h1>
          <p className="lead">A list of pages to be looped.</p>
          <AppItemList></AppItemList>
        </div>
      </div>



    </div>    
  );
}

export default App;
