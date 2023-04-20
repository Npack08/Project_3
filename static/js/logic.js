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
  chestPain(data);

});

// Fetch the JSON data
d3.json(ALL_SEX_CHOL_URL).then(function(data) {

  ALL_SEX_CHOL = d3.group(data, d => d.heartDisease);

  updateAvgCholesterol();

});

// Fetch the JSON data
d3.json(MALE_CHOL_URL).then(function(data) {

  MALE_CHOL = d3.group(data, d => d.heartDisease);

});

// Fetch the JSON data
d3.json(FEMALE_CHOL_URL).then(function(data) {

  FEMALE_CHOL = d3.group(data, d => d.heartDisease);

});

//////////////////////////////////////////////
//         Chest Pain vs Cholesterol        //
//////////////////////////////////////////////
function chestPain(data) {

  let GROUPED_DATA = d3.group(data, d => d.chestPainType);
  
  //Loop through the grouped data and create a plot trace
  const TRACES = Array.from(GROUPED_DATA, ([chestPainType, groupedData]) => {
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
    title: 'Average Cholesterol vs Chest Pain',
    xaxis: {
      title: 'Chest Pain Types'
    },
    yaxis: {
      title: 'Average Cholesterol'
    },
    legend: {
      title: {
        text: 'Chest Pain Types'
      }
    },
    barmode: 'group'
  };

  Plotly.newPlot('plot1', TRACES, LAYOUT);
};

//////////////////////////////////////////////
//     Average Cholesterol vs Age Group     //
//////////////////////////////////////////////
d3.selectAll("#selDataset").on("change", updateAvgCholesterol);

function updateAvgCholesterol() {

  let dropdownMenu = d3.select("#selDataset");
  let dataset = dropdownMenu.property("value");
  let group_data;

  if (dataset == 'All Sexes') {
    group_data = ALL_SEX_CHOL;
  }

  else if (dataset == 'Male') {
    group_data = MALE_CHOL;
  }

  else if (dataset == 'Female') {
    group_data = FEMALE_CHOL;
  };

  // Loop through the grouped data and create plot3 traces for each ageGroup
  const TRACES_PLOT2 = Array.from(group_data, ([heartDisease, groupData]) => {
    const RESTING_ECG = groupData.map(obj => obj.ageGroup);
    const MAX_HR = groupData.map(obj => obj.cholesterol);

    return {
      x: RESTING_ECG,
      y: MAX_HR,
      mode: 'markers',
      type: 'bar',
      name: heartDisease
    };
  });

  // Create plot3 layout object
  const LAYOUT_PLOT2 = {
    title: 'Age Group vs Average Cholesterol',
    xaxis: {
      title: 'Age Group'
    },
    yaxis: {
      title: 'Average Cholesterol'
    },
    legend : {
      title: {
        text: 'Heart Disease'
      }
    },
    barmode: 'group'
  };

  // Create plot on plot3 div
  Plotly.newPlot('plot2', TRACES_PLOT2, LAYOUT_PLOT2);
};

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
        text: '   Age Groups'
      }
    },
    barmode: 'group'
  };

  // Create plot on plot3 div
  Plotly.newPlot('plot3', TRACES_PLOT3, LAYOUT_PLOT3);
};
