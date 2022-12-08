import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import chooseFile from "../logos/chooseFile.png"


const Home = () => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        const test =[];
        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data)
        
        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        console.log(parsedData)
      },
    });
  };
  //console.log(tableRows)
  //console.log(parsedData)
  // getting the reconfigured data for mysql upload
  let data, payload;
  const [dashboardState, setDashboardState] = useState(false);
  const parseDataProperHandler = () => {
    data = parsedData.map(item => {
      return {
        date: item.date,
        category: item.category,
        lotTitle: item['lot title'],
        lotLocation: item['lot location'],
        lotCondition: item['lot condition'],
        preTaxAmount: item['pre-tax amount'],
        taxAmount: item['tax amount'],
        taxName: item['tax name']
      }
    })
    payload = data.map((item, index) => ({
      date: item.date,
      category: item.category,
      lotTitle: item.lotTitle,
      lotLocation: item.lotLocation,
      lotCondition: item.lotCondition,
      preTaxAmount: item.preTaxAmount,
      taxAmount: item.taxAmount,
      taxName: item.taxName
    }))
    setDashboardState(true);
  }
  console.log(payload)

  const handleClickUpload = async e => {
    // to prevent page refresh when we click upload to Database button
    e.preventDefault();
    console.log("hello")
    try{
      await axios.post("http://localhost:8800/", 
        payload
      );
      console.log(payload)
    } catch(err){
      console.log(err);
    }
    
  }

  // to navigate between pages
  let navigate = useNavigate();
  
  return (
    <div style={{backgroundColor:"#8fb1fa"}}>
      
      <h1 className="gradient-text-fancy">Welcome to NRI Industrial</h1>
      <div style={{ alignItems:'center', justifyContent: 'center', display:'flex'}}>
        

      {/* File Uploader, Database Upload and Generate Report buttons */}
      <label className="steps-font">Step 1: Choose your CSV File</label>
      <label className="custom-file-upload" > 
        <img className="img-upload-file" src={chooseFile}/>
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "none", margin: "10px auto" }}
        />
      </label>  
      <label className="steps-font"> Step 2: </label>
      <button className="button-upload" onClick={parseDataProperHandler}>Upload Data to RDB</button>
      <label className="steps-font"> Step 3: </label>
      <button className="button-generate-reports" onClick={handleClickUpload}>Generate your Data Reports</button>
      </div>
        {/* Table */}
        <table>
          <thead> 
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      
        {/* Condiitonal rendering for dashboard button once you upload csv data and parse it. */}
        {dashboardState && <button className="button-upload" onClick={() => navigate("/Dashboard")}>Go to Dashboard</button>}
   </div>
  )
}

export default Home