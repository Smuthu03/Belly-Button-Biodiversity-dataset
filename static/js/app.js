// API extract of sample file 

const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
//Design variables
var width = 800;
var height = 400;
var barWidth = width / 275;
//Step1: reading jason d3 object and processing the initial sample value for defalut to populated the barchat, bubble chart and metadata info
//const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
d3.json(url).then(function(data) { 
   // Data variables
    const sampleExtrct = data.samples;
    const sampleIndex = sampleExtrct[0];
    const idVal = data.names;
    const metadataExtrct = data.metadata;
    let sample =  "940"
   
    // storing array object based on sample

    let smpResultArray = sampleExtrct.filter(sampleObj => sampleObj.id == sample);
    let metaResultArray = metadataExtrct.filter(sampleObj => sampleObj.id == sample);
    console.log("Sample value: ", smpResultArray);
    console.log("Metadata value: ", metaResultArray);
   
    let slicedOtuid = sampleIndex.otu_ids.slice(0, 10).reverse();
    let slicedOtuLbl = sampleIndex.otu_labels.slice(0, 10);
    let slicedsmpVal = sampleIndex.sample_values.slice(0, 10).reverse();

   // initializing for Bar chart    
    var smplVal = slicedsmpVal;
    console.log("sampleValue: ", smplVal);
  //  var smpVluMx = d3.max(smplVal);
    var otuId = slicedOtuid;
    console.log("OTUID: ", otuId.length );
    let otu_id1 = [];

    // Loop through the array of ratings with appropriate lable 
    for (let i =0; i < otuId.length; i++) {
   
       row = "OTU_" + otuId[i];
         otu_id1.push(row);
    }
    console.log("OTUID: ", otu_id1);

    let trace1 = {
      x: smplVal,
      y: otu_id1,
      text: slicedOtuLbl,
      type: 'bar',
      orientation: 'h'    
    };
    
    let chartdata = [trace1];

    let layout = {
         title: "A Plotly bar plot"
        };
// creating Bar chart leveraging Plotly

    Plotly.newPlot("bar", chartdata, layout);

//******************************************************* */
//******************************************************* */
   // initializing for Bubble Chart
   let Otuid = sampleIndex.otu_ids;
   let OtuLbl = sampleIndex.otu_labels;
   let smpVal = sampleIndex.sample_values;
 
   var trace2 = {
    x: Otuid,
    y: smpVal,
    text: OtuLbl,
    mode: 'markers',
    marker: {
      color:  Otuid,
      size: (smpVal),
      opacity: [1, 0.8, 0.6, 0.4],
      size: smpVal
    }
  };
  
  var bubChart = [trace2];
  
  var layout1 = {
    title: 'Bubble Chart',
    showlegend: false,
    height: 600,
    width: 1000
  };
// creating Bubble chart leveraging Plotly

  Plotly.newPlot('bubble', bubChart, layout1);

  console.log("Metadata: ",metadataExtrct);
  const sampleMetadata = metadataExtrct[0];
   
// Dropdown selection 
let idDropdwn = d3.select(".well").text();
console.log("text1 says: ", idDropdwn);
//********************************************************************* */
//********************************************************************* */
 //  On change to the DOM listing and capturing the sample changes value

 document.getElementById("selDataset").innerHTML = `
 <select id="selDataset" onchange="optionChanged(this.value)">
    ${idVal.map(option => `<option>${option}</option>`).join("")};
 </select>`;

// Display each key-value pair from the metadata JSON object somewhere on the page.

    var metaStr = sampleMetadata;

    var  metaStr = JSON.stringify(metaStr, null, '\t');

    console.log("non-stringify:", metaStr);

    //   displaying the correspoding metadata value for the default

    document.getElementById("sample-metadata").innerHTML = 
        `<div id="sample-metadata" class="panel-body"> </div> ${metaStr}`;
    
}) ;
// On change to the DOM passing the onchage sample value to capture the data then create bar and bubble chart with new sample value
 
function buildMeta(sample) {
      d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then(function(data1) { 
   
           const sampleExtrct1 = data1.samples;
           let smpResultArray = sampleExtrct1.filter(sampleObj => sampleObj.id == sample);
           const sampleIndex = smpResultArray[0];
            console.log("Sample Extract: ", sampleIndex);
            
            console.log("Sample value: ", smpResultArray);
   
            let slicedOtuid = sampleIndex.otu_ids.slice(0, 10).reverse();
            let slicedOtuLbl = sampleIndex.otu_labels.slice(0, 10);
            let slicedsmpVal = sampleIndex.sample_values.slice(0, 10).reverse();
     
           console.log(slicedOtuid);
           console.log(slicedOtuLbl);
           console.log(slicedsmpVal);
       
           // Bar chart refreshed with new sample selected  
        var smplVal = slicedsmpVal;
         console.log("sampleValue: ", smplVal);
         var smpVluMx = d3.max(smplVal);
         var otuId = slicedOtuid;
         console.log("OTUID: ", otuId.length );
         let otu_id1 = [];
     
         // Loop through the array of ratings
         for (let i =0; i < otuId.length; i++) {
        
            row = "OTU_" + otuId[i];
       
           otu_id1.push(row);
         }
         console.log("OTUID: ", otu_id1);
     
         let trace1 = {
           x: smplVal,
           y: otu_id1,
           text: slicedOtuLbl,
           type: 'bar',
           orientation: 'h'
           
         };
         
         let chartdata = [trace1];
     
         let layout = {
              title: "A Plotly bar plot"
             };
     
     Plotly.newPlot("bar", chartdata, layout);
     
     
        // Bubble Chart refreshed on changed sample selection

        let Otuid = sampleIndex.otu_ids;
        let OtuLbl = sampleIndex.otu_labels;
        let smpVal = sampleIndex.sample_values;
      
        var trace2 = {
         x: Otuid,
         y: smpVal,
         text: OtuLbl,
         mode: 'markers',
         marker: {
           color:  Otuid,
           size: (smpVal),
           opacity: [1, 0.8, 0.6, 0.4],
           size: smpVal
         }
       };
       
       var bubChart = [trace2];
       
       var layout1 = {
         title: 'Bubble Chart',
         showlegend: false,
         height: 600,
         width: 1000
       };
       
       Plotly.newPlot('bubble', bubChart, layout1);
      //*****************************************************************************
            const metadataExtrct1 = data1.metadata;
 
            let metaResultArray = metadataExtrct1.filter(sampleObj => sampleObj.id == sample);
            console.log("Metadata value: ", metaResultArray);
 
  var sampleMetadata = metaResultArray;
   console.log("build Meta", sampleMetadata);
  var sampleMetadata = JSON.stringify(sampleMetadata, null, '\t');

  document.getElementById("sample-metadata").innerHTML = 
`<div id="sample-metadata" class="panel-body"> </div> ${sampleMetadata}`;

})
};
 
function optionChanged(drpId) {
  console.log("idfunction:",drpId );
   buildMeta(drpId);
 // buildCharts(drpId);
 };

 function grabData(sample) {
      console.log("idfunction:",sample );
};

