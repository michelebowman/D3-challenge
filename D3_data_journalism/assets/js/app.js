// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
// =================================
d3.csv("assets/data/data.csv")
  .then(function(healthData) {
    
    /*, function (error, healthData) {
  if (error) throw error;*/

  // Step 4: Parse the data
  // Format the data
  // =================================
  healthData.forEach(function (data) {
    data.smokes = +data.smokes;
    data.age = +data.age;
  });

  // Step 5: Create the scales for the chart x & y 
  // =================================
  var xLinearScale = d3.scaleLinear()
    .domain([30, d3.max(healthData, d => d.age)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([9, d3.max(healthData, d => d.smokes)])
    .range([height, 0]);


  // Step 6: Create the axis functions
  // =================================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  
  // Step 7: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  // Add y-axis
    chartGroup.append("g")
    .call(leftAxis);


  // Step 8: Append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".75")  

    // Step 9: Append text to circles
  var circlesGroup = chartGroup.selectAll()
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.age))
    .attr("y", d => yLinearScale(d.smokes))
    .style("font-size", "11px")
    .style("text-anchor", "middle")
    .attr("fill", "white")
    .text(d => (d.abbr));  


  // Step 10: Add axis labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 5)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Smokers (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width/2}, ${height + margin.top +30})`)
    .attr("class", "axisText")
    .text("Age (Yr)");

 }
  )