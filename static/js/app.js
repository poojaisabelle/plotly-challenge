// Create function to retrieve metadata for each individual in sample data
function retrieveData(id) {
    d3.json("samples.json").then((incomingData) => {

      // Store metadata in a variable 
      var metadata = incomingData.metadata;
      // console.log(metadata)

      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObjects => sampleObjects.id === id)[0];
      // console.log(resultArray);

      // Display the metadata for each id in the panel 
      var demographicInfo = d3.select(".panel-body");

      // Clear the panel before new id chosen 
      demographicInfo.html("");

      // Use forEach to get demo info for respective id 
      Object.entries(resultArray).forEach((data) => {

        // Append demo info to the panel and format 
        demographicInfo.append("h5").text(data[0] + ": " + data[1] + "\n")
        });
      });
  }
retrieveData(978);








