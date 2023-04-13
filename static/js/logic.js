const url = 'http://127.0.0.1:5000/api/data';

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

  // Group data by ageGroup
  const groupedData = d3.group(data, d => d.ageGroup);

  // Loop through the grouped data and create plot3 traces for each ageGroup
  const traces_plot3 = Array.from(groupedData, ([ageGroup, groupData]) => {
    const restingECG = groupData.map(obj => obj.restingECG);
    const maxHR = groupData.map(obj => obj.maxHR);

    return {
      x: restingECG,
      y: maxHR,
      mode: 'markers',
      type: 'bar',
      name: ageGroup
    };
  });

  // Create plot3 layout object
  const layout_plot3 = {
    title: 'Resting ECG vs Max Heart Rate',
    xaxis: {
      title: 'Resting ECG'
    },
    yaxis: {
      title: 'Max Heart Rate'
    },
    legend : {
      title: {
        text: "   Age groups"
      }
    },
    barmode: 'group'
  };

  // Create plot on plot3 div
  Plotly.newPlot('plot3', traces_plot3, layout_plot3);
});