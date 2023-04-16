const URL = 'http://127.0.0.1:5000/api/data';

var AGE_SORT;

// Fetch the JSON data and console log it
d3.json(URL).then(function(data) {

  AGE_SORT = data.sort((a, b) => d3.ascending(a.ageGroup, b.ageGroup))

  // invoke function for first graph with sorted data
  restingECG();
  avgCholestrol();

});


///////////////////////////////////////////////
//       Resting ECG vs Max Heart Rate       //
///////////////////////////////////////////////
function restingECG() {
  // Group data by ageGroup
  const GROUPED_DATA = d3.group(AGE_SORT, d => d.ageGroup);
  
  // Loop through the grouped data and create plot3 traces for each ageGroup
  const TRACES_PLOT3 = Array.from(GROUPED_DATA, ([ageGroup, groupData]) => {
    const RESTING_ECG = groupData.map(obj => obj.restingECG);
    const MAX_HR = groupData.map(obj => obj.maxHR);

    return {
      x: RESTING_ECG,
      y: MAX_HR,
      mode: 'markers',
      type: 'bar',
      name: ageGroup
    };
  });

  // Create plot3 layout object
  const LAYOUT_PLOT3 = {
    title: 'Resting ECG vs Max Heart Rate',
    xaxis: {
      title: 'Resting ECG'
    },
    yaxis: {
      title: 'Max Heart Rate'
    },
    legend : {
      title: {
        text: '   Age groups'
      }
    },
    barmode: 'group'
  };

  // Create plot on plot3 div
  Plotly.newPlot('plot3', TRACES_PLOT3, LAYOUT_PLOT3);
};

//////////////////////////////////////////////
//     Average Cholesterol vs Age Group     //
//////////////////////////////////////////////
function avgCholestrol() {

  let cholData = Array.from(d3.rollup(AGE_SORT, 
    v => d3.mean(v, d => d.cholesterol), d => d.ageGroup));
    
  let xValues = cholData.map(d => d[0]);
  let yValues = cholData.map(d => Number((d[1]).toFixed(2)));

  let trace1 = {
    x: xValues,
    y: yValues,
    mode: 'markers',
    type: 'bar',
    name: yValues
  };

  Plotly.newPlot('plot2', [trace1]);
};