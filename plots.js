// Load the data
d3.json("samples.json").then(function(data){
    console.log(data);
});

// Create function to append IDs to dropdownmenu
function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
})};

init();

// Create optionChanged function
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
};

// Create buildMetadata function
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");
        // Add each key and value pair to the panel
        Object.entries(result).forEach(([key,value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}