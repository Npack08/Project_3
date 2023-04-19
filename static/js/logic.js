const URL = 'http://127.0.0.1:5000/api/data';

var GROUPED_DATA;

// Fetch the JSON data and console log it
d3.json(URL).then(function(data) {
  // invoke function for first graph with sorted data
  groupType(data.sort((a, b) => d3.ascending(a.ageGroup, b.ageGroup)));

});
const groupedData = d3.group(data, d => d.chestPainType);

//Loop through the grouped data and create a plot trace
const TRACES = Array.from(groupedData, ([chestPainType, groupedData]) => {
  const CHOLESTEROL = d3.mean(groupedData, d => d.cholesterol);

  return{
    x: [chestPainType],
    y: [CHOLESTEROL],
    type: 'bar',
    name: chestPainType
  };
});
// Create the plot layout object
const LAYOUT = {
  title: 'Average cholesterol rates by chest pain',
  xaxis: {
    title: 'Chest Pain Types'
  },
  yaxis: {
    title: 'Average Cholesterol Rate'
  },
  legend: {
    title: {
      text: 'Chest Pain Types'
    }
  },
  barmode: 'group'
};

Plotly.newPlot('plot', TRACES,LAYOUT)

///////////////////////////////////////////////
//       Resting ECG vs Max Heart Rate       //
///////////////////////////////////////////////
function groupType(data) {
  // Group data by ageGroup
  GROUPED_DATA = d3.group(data, d => d.ageGroup);
  
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