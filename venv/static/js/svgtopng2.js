d3.select("#save").on("click", function(){
  d3.selectAll(".Histogram .line")
	.style({"shape-rendering": "crispEdges"})
  d3.selectAll(".LineChart .line")
  	.style({"stroke-width": "2px"})
  d3.selectAll(".Histogram2D .tile")
	.style({"shape-rendering": "crispEdges"})
  d3.selectAll(".uncertainty")
	.style({"stroke-width": "1px", "shape-rendering": "crispEdges"})
  d3.selectAll(".axis path")
	.style({"fill": "none", "stroke": "#000", "stroke-width": "1px", "shape-rendering": "crispEdges"})
  d3.selectAll(".axis .tick line")
	.style({"stroke": "#000", "stroke-width": "1px", "shape-rendering": "crispEdges"})
  d3.selectAll(".grid")
	.style({"fill": "none", "stroke": "#e0e0e0", "shape-rendering": "crispEdges"})
  d3.selectAll(".axis-label")
	.style({"font-size": "0.9em"})
  d3.selectAll(".TextBox rect")
	.style({"shape-rendering": "crispEdges"})
  d3.selectAll(".brush .extent")
	.style({"fill": "#000", "fill-opacity": "0.125", "stroke": "#000", "stroke-opacity": "0.2", "stroke-width": "1px", "shape-rendering": "crispEdges"})
  d3.selectAll(".clear-button")
	.style({"cursor": "pointer"})
  d3.selectAll(".clear-button rect")
	.style({"fill": "#eee", "stroke": "#000", "stroke-width": "1px", "stroke-opacity": "0.125", "border-radius": "2px"})
  d3.selectAll(".clear-button:hover rect")
	.style({"fill": "#e4e4e4"})
  d3.selectAll(".clear-button:active rect")
	.style({"fill": "#ddd"})
  d3.selectAll(".zscale-box")
	.style({"stroke": "#000", "stroke-width": "1px", "shape-rendering": "crispEdges"})

  var html = d3.select('#svg1 svg')
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
	.attr("encoding", "UTF-8")
        .node().parentNode.innerHTML;

  //console.log(html);
//var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
  var imgsrc = 'data:image/svg+xml;utf8,'+ encodeURIComponent(html);
  var img = '<img src="'+imgsrc+'">'; 
  d3.select("#svgdataurl").html(img);

  var srcCanvas = document.querySelector("canvas"),
	  context = srcCanvas.getContext("2d");

  var image = new Image;
  image.src = imgsrc;
  image.onload = function() {
	  context.drawImage(image, 0, 0);  
	  destinationCanvas = document.createElement("canvas");
          destinationCanvas.width = srcCanvas.width;
          destinationCanvas.height = srcCanvas.height;

          destCtx = destinationCanvas.getContext('2d');

//create a rectangle with the desired color
          destCtx.fillStyle = "#FFFFFF";
          destCtx.fillRect(0,0,srcCanvas.width,srcCanvas.height);

//draw the original canvas onto the destination canvas
          destCtx.drawImage(srcCanvas, 0, 0);
	  var canvasdata = destinationCanvas.toDataURL("image/png");

	//  var pngimg = '<img src="'+canvasdata+'">'; 
  	//  d3.select("#pngdataurl").html(pngimg);

	  var a = document.createElement("a");
	  a.download = "sample.png";
	  a.href = canvasdata;
          document.body.appendChild(a);
	  a.click();
  };
});
