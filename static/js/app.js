const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// alert('test')
fetch(url)
  .then(response => response.json())
  .then(dataResponse => {
    const data = dataResponse;
    // console.log(data);

    const names = data.names;
    const metadata = data.metadata;
    const meta_id = metadata.map(item => item.id);
    const ethnicity = metadata.map(item => item.ethnicity);
    const gender = metadata.map(item => item.gender);
    const age = metadata.map(item => item.age);
    const bbtype = metadata.map(item => item.bbtype);
    const wfreq = metadata.map(item => item.wfreq);
    const sample = data.samples;
    const sample_id = sample.map(item => item.id);
    const otu_ids = sample.map(item => item.otu_ids);
    // const otu_ids = []
    const sample_values = sample.map(item => item.sample_values);
    const otu_labels = sample.map(item => item.otu_labels);


    const dropdown_selection = document.getElementById("selDataset");
    
    const dropdown_values = names;

    dropdown_values.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.text = item;  
        dropdown_selection.appendChild(option); 
      });

      dropdown_selection.addEventListener("change", function() {
        const selected_one = dropdown_selection.value;
        // alert("Selected Value: " + selected_one);
        updateGraph(selected_one);
      });
        
      

function updateGraph(selected_one) {


    const filtered_metadata = metadata.filter(obj => obj.id === parseInt(selected_one));
    const filtered_sample = sample.filter(obj => obj.id === String(selected_one));
    
    
    const plot_otu_ids = filtered_sample[0].otu_ids.slice(0,10);
    const plot_otu_otu_labels = filtered_sample[0].otu_labels.slice(0,10);
    const plot_sample_values = filtered_sample[0].sample_values.slice(0,10);

    var metadataDiv = document.getElementById("sample-metadata");
    var dataToDisplay = "id: " + selected_one + "<br>ethnicity: " + filtered_metadata[0].ethnicity
    +  "<br>gender: " + filtered_metadata[0].gender + "<br>age: " + filtered_metadata[0].age
    + "<br>location: " + filtered_metadata[0].location + "<br>bbtype: " + filtered_metadata[0].bbtype
    + "<br>wfeq: " + filtered_metadata[0].wfreq;

    metadataDiv.innerHTML = dataToDisplay;


    var trace_bar = {
        x: plot_sample_values, 
        y: String(plot_otu_ids), 
        text: plot_otu_otu_labels,
        type: "bar",
        orientation: "h", 
        // marker: {
        //     yaxis: {
        //         categoryorder: "category descending" 
        //       },
        // }
      };
      var bar_data = [trace_bar];

      var layout_bar = {
        yaxis: {title: String(plot_otu_ids),
            automargin: true
        },
        showlegend: false,
        height: 400,
        width: 600
      };



    var trace_bubble = {
      x: filtered_sample[0].otu_ids,
      y: filtered_sample[0].sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: filtered_sample[0].sample_values,
        sizeref: 1,
        color: filtered_sample[0].otu_ids,
        colorscale: "Viridis",
        colorbar: {
          title: "otu_ids"
        }
      }
    };
    
    var bubble_data = [trace_bubble];{
    
    var layout_bubble = {
      xaxis: { title: "OTU ID" },
      showlegend: false,
      height: 600,
      width: 1400
    };
    
    Plotly.newPlot("bubble", bubble_data, layout_bubble);
    Plotly.newPlot("bar", bar_data, layout_bar);
    }
}
});
