const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// alert('test')
fetch(url)
  .then(response => response.json())
  .then(dataResponse => {
    const data = dataResponse;
    // console.log(data);

    const otu_ids = [];
    const sample_values = [];
    const otu_labels = []

    data.samples.forEach(sample => {
      if (sample.otu_ids) {
        otu_ids.push(...sample.otu_ids);
      }
    });
    data.samples.forEach(sample => {
      if (sample.sample_values) {
        sample_values.push(...sample.sample_values);
      }
    });
    data.samples.forEach(sample => {
      if (sample.otu_labels) {
        otu_labels.push(...sample.otu_labels);
      }
    });
    // console.log(otu_labels)

    var trace_bubble = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        sizeref: 5,
        colorscale: "Viridis",
        color: otu_ids,
        colorbar: {
          title: "otu_ids"
        }
      }
    };
    
    var bubble_data = [trace_bubble];
    
    var layout = {
      title: 'Marker Size',
      xaxes: "OTU ID",
      showlegend: false,
      height: 600,
      width: 1400
    };
    
    Plotly.newPlot("bubble", bubble_data, layout);
    
  });