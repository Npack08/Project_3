const ALL_DATA_URL = 'http://127.0.0.1:5000/api/data';
const MALE_CHOL_URL = 'http://127.0.0.1:5000//api/male_cholesterol';
const FEMALE_CHOL_URL = 'http://127.0.0.1:5000//api/female_cholesterol';
const ALL_SEX_CHOL_URL = 'http://127.0.0.1:5000//api/all_sex_cholesterol';

var AGE_SORT;
var MALE_CHOL;
var FEMALE_CHOL;
var ALL_SEX_CHOL;

// Fetch the JSON data
d3.json(ALL_DATA_URL).then(function(data) {

  AGE_SORT = data.sort((a, b) => d3.ascending(a.ageGroup, b.ageGroup))

  // invoke function for first graph with sorted data
  restingECG();

});

// Fetch the JSON data
d3.json(MALE_CHOL_URL).then(function(data) {

  MALE_CHOL = data;

});

// Fetch the JSON data
d3.json(FEMALE_CHOL_URL).then(function(data) {

  FEMALE_CHOL = data;

});

// Fetch the JSON data
d3.json(ALL_SEX_CHOL_URL).then(function(data) {

  ALL_SEX_CHOL = data;

  // invoke function for second graph with sorted data
  let xValues = Object.keys(ALL_SEX_CHOL);
  let yValues = Object.values(ALL_SEX_CHOL).map(d => d.cholesterol);

  let trace1 = {
    x: xValues,
    y: yValues,
    mode: 'markers',
    type: 'bar',
    name: yValues
  };

  // Create plot3 layout object
  const layout1 = {
    title: 'Average Cholesterol vs Age Group ',
    xaxis: {
      title: 'Age Group'
    },
    yaxis: {
      title: 'Average Cholesterol'
    },
    barmode: 'group'
  };

  Plotly.newPlot('plot2', [trace1]);

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
d3.selectAll("#selDataset").on("change", updateAvgCholesterol);

function updateAvgCholesterol() {

  let dropdownMenu = d3.select("#selDataset");
  let dataset = dropdownMenu.property("value");
  let xValues;
  let yValues;

  if (dataset == 'All Sexes') {
    xValues = Object.keys(ALL_SEX_CHOL);
    yValues = Object.values(ALL_SEX_CHOL).map(d => d.cholesterol);
  }

  else if (dataset == 'Male') {
    xValues = Object.keys(MALE_CHOL);
    yValues = Object.values(MALE_CHOL).map(d => d.cholesterol);
    console.log(xValues);
  }

  else if (dataset == 'Female') {
    xValues = Object.keys(FEMALE_CHOL);
    yValues = Object.values(FEMALE_CHOL).map(d => d.cholesterol);
  };

  Plotly.restyle('plot2', "x", [xValues]);
  Plotly.restyle('plot2', "y", [yValues]);
};