var chart = nv.models.lineChart()
    .showXAxis(true)
    .showYAxis(true)
    .color(d3.scale.category10().range());
var data = [{
    'key': 'Slam 0 ATE Averages',
    'values': [{
        'x': 0,
        'y': 0.047767,
    }, {
        'x': 1,
        'y': 0.007455,
    }, {
        'x': 2,
        'y': 0.05668,
    }, {
        'x': 3,
        'y': 0.007268,
    }, {
        'x': 4,
        'y': 0.009379,
    }, {
        'x': 5,
        'y': 0.012635,
    }, ]



}];

chart.xAxis.tickFormat(d3.format('g')).axisLabel('Dataset Shortcode');
chart.yAxis.tickFormat(d3.format('0.6f')).axisLabel('Time');

nv.addGraph(loadGraph);

function loadGraph() {
    d3.select('#chart svg')
        .datum(data)
        .transition().duration(500)
        .call(chart);
    nv.utils.windowResize(chart.update);
    return chart;
};
