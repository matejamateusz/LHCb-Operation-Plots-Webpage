var master_plot = (function(window, document, plotData, id) {
  'use strict';
  // Create an SVG element and create an AxesChart inside it
  var makeChart = function(container) {
    return container.append("svg")
      .chart('AxesChart')
      .width(450)
      .height(400);
  };



  // Manipulate the input data to a format accepted by the Histogram chart
  var formatData = function(data) {
    var rtn = [];
    for (var i = 0; i < data['values'].length; i++) {
      var bins = data['binning'][i];
      rtn.push({
        xlow: bins[0],
        xhigh: bins[1],
        y: data['values'][i],
        yerr: data['uncertainties'][i]
      });
    }
    return rtn;
  };


//Manipulate the input data to a format accepted by the LineChart for scatter plot
var formatData2 = function(data) {
    var rtn = [];
    for (var i = 0; i < data['y'].length; i++) {
      rtn.push({
        x: data['x'][i],
        xerr: data['xerr'][i],
        y: data['y'][i],
        yerr: data['yerr'][i]
      });
    }
    return rtn;
  };

 
  // Define histogram datasets
  if (plotData['type'][0] === "histogram"){
  var plotFormatedData = formatData(plotData);}
  else if (plotData['type'][0] === "scatter") {
  var plotFormatedData = formatData2(plotData);
  }

  // Define our charts
  var plotMakeChart = makeChart(d3.select(id))
      .xAxisLabel(plotData['axis_titles'][0])
      .yAxisLabel(plotData['axis_titles'][1]) 
;



  var title = [
    ['', plotData['axis_titles'][2]]];

 
// Draw plotables on to charts
if (plotData['type'][0] === "histogram") {
  plotMakeChart.addPlotable(d3.plotable.Histogram('plotFormatedData', plotFormatedData, {closed: false, color: 'red'})); plotMakeChart.addOrnament(d3.plotable.TextBox('title', title));}
else if (plotData['type'][0] === "scatter") {
 plotMakeChart.addPlotable(d3.plotable.LineChart('plotFormatedData', plotFormatedData, {showPoints: true, showUncertainties: false, interpolation: 'linear', color: 'red'})); plotMakeChart.addOrnament(d3.plotable.TextBox('title', title));}


});



//$(function() {

for (i=0; i<8; i++) {
 $.ajax({url: '/data/histogram' + i + '.json',
  dataType: 'json',
  success: function(data, status, jqXHR) {
    master_plot(window, window.document, data, '#svg' + jqXHR.svg_id);
    var $input = $('<button id="save'+jqXHR.svg_id+'">Save as Image</button>');
    $input.appendTo($('#button_svg' + jqXHR.svg_id));
    //bind_save_button("#save" + jqXHR.svg_id);
    d3.select("#save" + jqXHR.svg_id).on("click", function(){
      save_to_png("svg" + jqXHR.svg_id);
    });
  }}).svg_id = i;
};
/*
jQuery.fn.loadHist = function(filename) {
  $.ajax({url: filename,
                      dataType: 'json',
  success: function(data, status, jqXHR) {
    f1(window, window.document, data, jqXHR.div_id);
  }}).div_id = $(this).attr('id');
}

for (i=0; i<8; i++) {
  $('#svg' + i).loadHist('/data/histogram' + i + '.json');
}

$('root_hist').loadHist();
*/


/*  $.ajax({url: '/data/histogram0.json',
  dataType: 'json',
  success: function(data) {
    f1(window, window.document, data, '#svg0');
  }});
  $.ajax({url: '/data/histogram1.json',
  dataType: 'json',
  success: function(data) {
   f1(window, window.document, data, '#svg1');
 }});
 $.ajax({url: '/data/histogram2.json',
  dataType: 'json',
  success: function(data) {
   f1(window, window.document, data, '#svg2');
 }});
 $.ajax({url: '/data/histogram3.json',
  dataType: 'json',
  success: function(data) {
   f1(window, window.document, data, '#svg3');
 }});
 $.ajax({url: '/data/histogram4.json',
  dataType: 'json',
  success: function(data) {
   f1(window, window.document, data, '#svg4');
 }});
 $.ajax({url: '/data/histogram5.json',
  dataType: 'json',
  success: function(data) {
   f1(window, window.document, data, '#svg5');
 }});
$.ajax({url: '/data/histogram6.json',
  dataType: 'json',
  success: function(data) {
   f1(window, window.document, data, '#svg6');
 }});
$.ajax({url: '/data/histogram7.json',
  dataType: 'json',
  success: function(data) {
   f1(window, window.document, data, '#svg7');
 }}); */
//});


 
