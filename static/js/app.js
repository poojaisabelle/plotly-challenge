// Create function to retrieve metadata for each individual 
function retrieveMetaData(id) {
    d3.json("samples.json").then((Data) => {

      // Store metadata in a variable 
      var metadata = Data.metadata;
      // console.log(metadata)

      // Filter the metadata by id number 
      var metaResult = metadata.filter(row => row.id === id)[0];
      // console.log(metaResult);

      // Display the metadata for each id in the panel 
      var demographicInfo = d3.select("#sample-metadata");

      // Clear the panel before new id chosen 
      demographicInfo.html("");

      // Use forEach to get demo info for respective id 
      Object.entries(metaResult).forEach((row) => {

        // Append demo info to the panel and format 
        demographicInfo.append("h5").text(row[0] + ": " + row[1] + "\n");
        });
      });
  }
retrieveMetaData(978);


// Create function to retrieve samples array 
function buildCharts(id) {
  d3.json("samples.json").then((Data) => {

    // Store the samples array in a new array 
    var samplesData = Data.samples;
    //console.log(samplesData);

    // Filter the samples data by the individual id
    var result = samplesData.filter(row => row.id == id);
    var sampleResult = result[0];
    // console.log(sampleResult);

    // Sort the sample values in descending order using slice and .reverse()

    /// Get the OTU IDs
    var otuId = sampleResult.otu_ids;
    //console.log(otuId);

    /// Obtain the top 10 sample values 
    var topTenSamples = sampleResult.sample_values.slice(0,10).reverse();
    //console.log(topTenSamples);

    /// Obtain the respective labels 
    var topTenLabels = sampleResult.otu_labels.slice(0,10).reverse();
    console.log(topTenLabels);

    /// Obtain the top 10 respective OTU IDs
    var topTenIds = otuId.slice(0,10).reverse();
    console.log(topTenIds);

    // 1. BAR PLOT 

    /// Create the trace
    var traceBar = {
      x: topTenSamples,
      y: topTenIds.map(x => "OTU" + x),
      text: topTenLabels,
      type: "bar",
      orientation: "h", 
      marker: {
        color: sampleResult.otu_ids
      }
    };

    /// Create the data variable 
    var dataBar = [traceBar];

    /// Create the layout of the chart 
    var layoutBar = {
      title: "<b>The Top Ten OTUs</b>",
      height: 550,
      width: 550,
      yaxis: {
        tickmode: "linear"
      }
    };
    
    /// Create the bar plot 
    Plotly.newPlot("bar", dataBar, layoutBar);

    // 2. BUBBLE CHART 

    /// Create the trace
    var traceBubble = {
      x: sampleResult.otu_ids,
      y: sampleResult.sample_values,
      mode: "markers",
      marker: {
        size: sampleResult.sample_values,
        color: sampleResult.otu_ids
      },
      text: sampleResult.otu_labels
    };

    // Create the data variable 
    var dataBubble = [traceBubble];

    // Create the layout 
    var layoutBubble = {
      title: "<b>OTU Bubble Chart Representation</b>",
      xaxis: {
        title: "OTU ID"
      },
      showlegend: false,
      height: 600, 
      width: 1200
    };

    // Create the bubble chart 
    Plotly.newPlot("bubble", dataBubble, layoutBubble);
  });
}
  buildCharts(978);







