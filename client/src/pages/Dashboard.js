import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import "./pages.css"




const Dashboard = () => {
  
// useState to save data from api
const [csvData, setCsvData] = useState([]);
  useEffect(()=>{
      const fetchAllData = async () => {
          try {
              const res = await axios.get("http://localhost:8800/csvdata");
              setCsvData(res.data);
          } catch(err){
              console.log(err)
          }
      }
      fetchAllData();
  }, []); 

  // refactoring data for bar graph to account for double api calls in react build mode. 
  let refactoredcsvData = csvData.slice(0,csvData.length/2);

  // data labels for bar graph
  let preTaxAmountData = refactoredcsvData.map(a => a.preTaxAmount)
  let dateLabels = refactoredcsvData.map(a => a.date)

  // refactoring data for category pie chart
  let categories = new Map();
  // set map values to 0
  for(let i = 0; i < refactoredcsvData.length; i++) {
      if(!categories.has(refactoredcsvData[i].category)){
        categories.set(refactoredcsvData[i].category, 0);
      }
  }
  // enter preTaxAmount values for each category key
  for(let i = 0; i < refactoredcsvData.length; i++){
    if(categories.has(refactoredcsvData[i].category)){
      categories.set(refactoredcsvData[i].category, categories.get(refactoredcsvData[i].category) + refactoredcsvData[i].preTaxAmount);
    }
  }

  // set the label and value arrays for category pie chart
  let categoryLabels = [];
  let categoryValues = [];
  const categoryIterator = categories.keys();
  const categoryValuesIterator = categories.values();
  for(let i = 0; i < categories.size; i++){
    categoryLabels.push(categoryIterator.next().value)
    categoryValues.push(categoryValuesIterator.next().value)
  }

  // refactoring data for conditions pie chart
  let conditions = new Map();
  // set map values to 0
  for(let i = 0; i < refactoredcsvData.length; i++) {
    if(!conditions.has(refactoredcsvData[i].lotCondition)){
      conditions.set(refactoredcsvData[i].lotCondition, 0);
    }
  }
  // enter preTaxAmount values for each condition key
  for(let i = 0; i < refactoredcsvData.length; i++){
    if(conditions.has(refactoredcsvData[i].lotCondition)){
      conditions.set(refactoredcsvData[i].lotCondition, conditions.get(refactoredcsvData[i].lotCondition) + refactoredcsvData[i].preTaxAmount);
    }
  }

  // set the label and value arrays for condition pie chart
  let conditionLabels = [];
  let conditionValues = [];
  const conditionIterator = conditions.keys();
  const conditionValuesIterator = conditions.values();
  for(let i = 0; i < conditions.size; i++){
    conditionLabels.push(conditionIterator.next().value)
    conditionValues.push(conditionValuesIterator.next().value)
  }

  // for dynamic color insertion for our graphs
  function getRandomColor(len) { 
    var colors = [];
    for (var i = 0; i < len; i++) {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var x = 0; x < 6; x++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
    return colors;
  }  

  

  return (
    <div style={{backgroundColor:"#8fb1fa"}}>
      <h1 className="gradient-text-fancy" style={{ textAlign: "center"}}>Dashboard</h1>
      <div>
      <h2 style={{ fontStyle:"italic", color:"darkblue",textAlign: "center"}}>Bar Chart showing total (pre-tax amount) amount per day</h2>
        <div style={{ position: "relative", margin: "auto" }}>
            <div style={{height:"30vh", display: 'flex',  justifyContent:'center', alignItems:'center'}}><Bar 
                data={{
                  label:"Dates in MM/DD/YYYY format",
                  labels: dateLabels,
                  datasets: [
                    {
                      // Label for bars
                      label: "Total amount (pre-tax amount)",
                      // Data or value of your each variable
                      data: preTaxAmountData,
                      backgroundColor: getRandomColor(dateLabels.length),
                    },
                  ],
                }}
            /></div>
            <h2 style={{ fontStyle:"italic", color:"darkblue", textAlign: "center"}}>Pie chart showing total amount per category</h2>
            <div style={{position: "relative", margin: "auto", width: "80vw", height: '40vh' , display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Pie 
              data={{
                label:"Categories",
                labels: categoryLabels,
                datasets: [
                  {
                    // Label for bars
                    label: "Total amount (pre-tax amount)",
                    // Data or value of your each variable
                    data: categoryValues,
                    backgroundColor: getRandomColor(dateLabels.length),
                  },
                ],
              }}
            /></div>
            <h2 style={{ fontStyle:"italic", color:"darkblue",textAlign: "center"}}>Pie chart showing total amount per condition</h2>
            <div style={{position: "relative", margin: "auto", width: "80vw", height: '40vh' , display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Pie 
            data={{
              label:"Conditions",
              labels: conditionLabels,
              datasets: [
                {
                  // Label for bars
                  label: "Total amount (pre-tax amount)",
                  // Data or value of your each variable
                  data: conditionValues,
                  backgroundColor: getRandomColor(dateLabels.length),
                },
              ],
            }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard