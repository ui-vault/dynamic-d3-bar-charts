datasetTotal = {
    "1": ["www.youtube.com", "9.56 KB", "47.9"],
    "2": ["accounts.youtube.com", "7.74 KB", "38.8"],
    "3": ["portal.mockcompany.com", "2.67 KB", "13.4"],
    "4": ["ds-aksb-a.akamaihd.net", "0.00 B", "0.0"],
    "5": ["hp.mockcompany.com", "0.00 B", "0.0"],
};

datasetOption1 = {
    "1": ["source.functional.mockcompany.com", "808.57 MB", "93.7"],
    "2": ["devops.mockcompany.com", "20.21 MB", "2.3"],
    "3": ["cnnios-f.akamaihd.net", "14.24 MB", "1.7"],
    "4": ["espnfw-a.akamaihd.net", "6.43 MB", "0.7"],
    "5": ["gm1.ggpht.com", "4.80 MB", "0.6"],
    "6": ["portal.mockcompany.com", "2.09 MB", "0.2"],
    "7": ["i.cdn.cnn.com", "1.28 MB", "0.1"],
    "8": ["172.31.28.190", "1.13 MB", "0.1"],
    "9": ["www.youtube.com", "972.87 KB", "0.1"],
    "10": ["r4---sn-nx5e6n7s.googlevideo.com", "827.14 KB", "0.1"]
};

datasetOption2 = {
    "1": ["vmahajan@mockcompany.com", "773.61 MB", "89.4"],
    "2": ["jchanak@mockcompany.com", "75.34 MB", "8.7"],
    "3": ["testuser7@mockcompany.com", "7.93 MB", "0.9"],
    "4": ["asingh@mockcompany.com", "4.66 MB", "0.5"],
    "5": ["pdesai@mockcompany.com", "4.25 MB", "0.5"],
    "6": ["testuser1@mockcompany.com", "17.29 KB", "0.0"],
    "7": ["testuser4@mockcompany.com", "201.00 B", "0.0"],
    "8": ["hpadhye@mockcompany.com", "0.00 B", "0.0"]
};

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



var margin = 60,
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

    newData = Object.values(newData);

    max = d3.max(newData, function(d) {
        return parseInt(d[2]);
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
                            return d[1];
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
            return scale(parseInt(d[2]));
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
            return (d[0]);
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
            return d[1];
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
            return scale(parseInt(d[2]));
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
            return (d[0]);
        });

    
}

updateData(datasetTotal);