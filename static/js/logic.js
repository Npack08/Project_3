const URL = 'http://127.0.0.1:5000/api/data';

// Fetch the JSON data and console log it
d3.json(URL).then(function(data) {
  console.log(data);

  // Group data by ageGroup
  const GROUPED_DATA = d3.group(data, d => d.ageGroup);

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
});