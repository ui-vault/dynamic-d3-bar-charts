datasetTotal = [
    { label: 'Category 1', value: 19 },
    { label: 'Category 2', value: 5 },
    { label: 'Category 3', value: 13 },
    { label: 'Category 4', value: 17 },
    { label: 'Category 5', value: 19 },
    { label: 'Category 6', value: 27 }
];

datasetOption1 = [
    { label: "Category 11", value: 22 },
    { label: "Category 12", value: 33 },
    { label: "Category 13", value: 4 },
    { label: "Category 14", value: 15 },
    { label: "Category 15", value: 36 },
    { label: "Category 16", value: 0 }
];

datasetOption2 = [
    { label: "Category 21", value: 10 },
    { label: "Category 22", value: 20 },
    { label: "Category 23", value: 30 },
    { label: "Category 24", value: 5 },
    { label: "Category 25", value: 12 },
    { label: "Category 26", value: 23 }
];

d3.selectAll("input").on("change", selectDataset);

    function selectDataset()
    {
        var value = this.value;
        if (value == "total")
        {
            updateData(datasetTotal);
        }
        else if (value == "option1")
        {
            updateData(datasetOption1);
        }
        else if (value == "option2")
        {
            updateData(datasetOption2);
        }
    }



var margin = 40,
    valueMargin = 12,
    labelMargin = 25,
    width = parseInt(d3.select('body').style('width'), 10),
    height = parseInt(d3.select('body').style('height'), 10),
    barHeight = 40,
    barPadding = 25,
    data, svg, scale, labelWidth = 0;



svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);


function updateData(newData) {

    max = d3.max(newData, function(d) {
        return d.value;
    });


    scale = d3.scale.linear()
        .domain([0, max])
        .range([0, width - margin * 2 - labelWidth]);

    var bar = svg.selectAll(".bar")
                .data(newData);

    var barExit = bar.exit().remove();

    var barEnter = bar.enter()
                    .append("g")
                    .attr("class", "bar");

    var barLables = barEnter.append('text')
                        .attr('class', 'label')
                        .attr('transform', function(d, i) {
                            return 'translate(-5,' + (i * (barHeight + barPadding) + barPadding) + ')';
                        })
                        .attr('dx', valueMargin) //margin right
                        .attr('dy', '25') //vertical align middle
                        .text(function(d) {
                            return d.value + '%';
                        }).each(function() {
                            labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
                        });

    var barRects = barEnter.append('rect')
        .attr('transform', function(d, i) {
            return 'translate(' + margin + ',' + (i * (barHeight + barPadding) + barPadding) + ')';
        })
        .attr('height', barHeight)
        .attr('width', 0) //for animation purpose; start with width=0
        .transition().duration(750)//time in ms
        .attr('width', function(d) {
            return scale(d.value);
        });

    var barTexts = barEnter.append('text')
        .attr('class', 'value')
        .attr('transform', function(d, i) {
            return 'translate(' + margin + ',' + (i * (barHeight + barPadding) + barPadding) + ')';
        })
        .attr('dx', valueMargin) //margin right
        .attr('dy', '25') //vertical align middle
        .attr('text-anchor', 'start')
        .text(function(d) {
            return (d.label);
        });

    // updated data:
    var barLabelUpdate = bar.select('.label').transition()
        .duration(750)
        .attr('transform', function(d, i) {
            return 'translate(-5,' + (i * (barHeight + barPadding) + barPadding) + ')';
        })
        .attr('dx', valueMargin) //margin right
        .attr('dy', '25') //vertical align middle
        .text(function(d) {
            return d.value + '%';
        }).each(function() {
            labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
        });

    var barRectUpdate = bar.select('rect').transition()
        .duration(750)
        .attr('transform', function(d, i) {
            return 'translate(' + margin + ',' + (i * (barHeight + barPadding) + barPadding) + ')';
        })
        .attr('height', barHeight)
        .attr('width', function(d) {
            return scale(d.value);
        });

    var barTextsUpdate = bar.select('.value').transition()
        .duration(750)
         .attr('transform', function(d, i) {
            return 'translate(' + margin + ',' + (i * (barHeight + barPadding) + barPadding) + ')';
        })
        .attr('dx', valueMargin) //margin right
        .attr('dy', '25') //vertical align middle
        .attr('text-anchor', 'start')
        .text(function(d) {
            return (d.label);
        });

    
}

updateData(datasetTotal);
