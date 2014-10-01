/* functions */

var txtLabel = false;
function brushed() {
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    focus.select(".area").attr("d", area);

    //console.log(brush.extent()[1] - brush.extent()[0]);

    var dateLength = 35031114606;

    

    //console.log(txtLabel);
    if ((brush.extent()[1] - brush.extent()[0]) < dateLength && (brush.extent()[1] - brush.extent()[0]) !== 0) {
            if (txtLabel === false) {
                focus.selectAll(".gps").append("text").attr("class","txtName").attr("transform", "translate(25, 6)").append("tspan").text(function(d,i) {return d.name;}).attr("text-anchor", "middle");
                txtLabel = true;  
            }

    
    } else {
        focus.selectAll(".txtName").remove();
        txtLabel = false;
    }
    //focus.selectAll(".circle").attr("cx", function (d,i) {return x(parseDate(d.launch)); });

    focus.selectAll(".gps").attr("transform", function (d, i) {
        //return "translate(" + [x(parseDate(d.launch)), y(d.years)] + ")"; // return "translate(" + [x(parseDate(d.launch)), y(d.price)] + ")";
        return "translate(" + [x(parseDate(d.launch)) - 30, y(d.period) - 25] + ")";
    });

    focus.select(".x.axis").call(xAxis);
}

function type(d, i) {
    
    //d.years = d.years + 5;
    /*d.date = parseDate(d.date);
    d.price = +d.price;*/
    //console.log("type called " + i + " times!")
    return d;
    
    
}

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);


//var satellitePath = "M 23.03,11.78 26.33,9.86 9.19,0 l -9.23,5.39 17.13,9.86 3.43,-2 2.32,1.2 -1.96,1.07 5.66,2.99 1.65,-0.84 2.32,1.16 -2.9,1.875 16.96,9.86 9.24,-5.4 -17.05,-9.82 -3.66,2.051 -2.27,-1.25 1.47,-0.98 -5.58,-2.99 -1.29,0.8 z";
//var satellitePath = "M 16.538574,12.071991 18.910022,10.1044 6.5928668,0 -0.04,5.5236018 12.269969,15.628001 l 2.464868,-2.049573 1.667199,1.229744 -1.408496,1.096522 4.067392,3.064113 1.185724,-0.86082 1.667199,1.188752 -2.083999,1.921475 12.187803,10.104401 6.640053,-5.533851 -12.252479,-10.063407 -2.630151,2.101837 -1.631268,-1.280984 1.056372,-1.004291 -4.009903,-3.064112 -0.92702,0.819829 z";
//var satellitePath = "M 23.587118,14.159931 24.709387,17.02972 38.173802,8.5138095 35.015569,0.48071185 21.553413,8.9898008 l 1.170725,2.9842462 -1.691537,1.196047 -0.598108,-1.681811 -4.187484,2.897834 0.444394,1.396233 -1.652622,1.208934 -1.168863,-2.582417 -13.42374923,8.393117 3.16570413,8.043141 13.4051671,-8.467401 -1.168375,-3.15758 1.728882,-1.145828 0.621258,1.318545 4.169409,-2.843261 -0.486816,-1.137759 z";
var satellitePath = "m 35.021448,21.131713 0.559201,4.03159 18.718371,-7.590228 -1.585679,-11.2895788 -18.713722,7.5819288 0.585989,4.193348 -2.208309,0.984062 -0.612558,-3.150729 -6.560856,2.640856 0.572873,3.185021 -1.91916,0.877059 -0.696096,-3.669277 -18.6346916,7.440818 1.5919347,11.30461 18.6329179,-7.542449 -0.534667,-4.41859 2.105649,-0.953544 0.496695,3.196811 6.746878,-2.708383 -0.518052,-3.238738 z";

/* logo */
d3.select("svg.logo").append("path").attr("d", satellitePath).attr("transform","translate(0,9)")
        .attr("fill", "white");





//var parseDate1 = d3.time.format.utc("%d %B %Y").parse;

// old - 22 February 1978
// new - "August 22, 2014"



////////////////////////


var margin = {
    top: 10,
    right: 35,
    bottom: 100,
    left: 35
},
margin2 = {
    top: 535,
    right: 35,
    bottom: 20,
    left: 35
},
width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    height2 = 600 - margin2.top - margin2.bottom;

var parseDate = d3.time.format("%B %d, %Y").parse;

// old - 22 February 1978
// new - "August 22, 2014"

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    yHeight = d3.scale.linear().domain([0, 50]).range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left").ticks(6);
    yAxisHeight = d3.svg.axis().scale(yHeight).orient("right").tickValues([0, 20]);//.ticks(3);

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);

var area = d3.svg.area()
//.interpolate("monotone")
.x(function (d) {
    return x(parseDate(d.launch));
})
    .y0(height)
    .y1(function (d) {
    return y(d.price);
});

var area2 = d3.svg.area()
//.interpolate("monotone")
.x(function (d) {
    return x2(parseDate(d.launch));
})
    .y0(height2)
    .y1(function (d) {
    return y2(d.price);
});

var svg = d3.select(".main").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);


svg.append("image")
   .attr('x', 23)
   .attr('y', 10)
   .attr('width', 915)
   .attr('height', 490)
   .attr("xlink:href","images/earth.png");   

svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

xDesc = svg.append("text").text("Launch date")
        .attr({
            "class": "descText",
            "transform": "translate(850, 527)"
        });


yDesc = svg.append("text").text("Period (min)")
        .attr({
            "class": "descText",
            "transform": "translate(30, 80), rotate(-90)"
        });

yDescAlt = svg.append("text").text("Altitude (in 000 km)")
        .attr({
            "class": "descText",
            "transform": "translate(930, 27), rotate(90)"
        })




var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


/* load json */
//d3.json("gpstableSmall.json", type, function(error, data) {
//d3.json("data/gpstableSmall.json", function(error, data) {

//d3.csv("data/gpstable1.csv", type, function(error, data) {    
//d3.csv("data/gpstable.csv", type, function(error, data) {
d3.csv("data/all_satelites.csv", type, function(error, data) {

//x.domain(d3.extent(data.map(function(d) { return parseDate(d.launch); })));
x.domain([new Date(1977, 7, 1), new Date(2015, 7, 1)]);
y.domain([0, 1800]);
/*
y.domain([0, d3.max(data.map(function (d) {
    return +d.period + 5; // return d.price + 5;
}))]);
*/
x2.domain(x.domain());
y2.domain(y.domain());

/*
  focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);
*/
/*
focus.selectAll("circle").data(data)
    .enter()
    .append("circle")
    .attr({
        "cx": function (d,i) {return x(parseDate(d.launch)); },
        "cy": function (d,i) {return y(d.price); },
        "r": 10,
        "fill": "steelblue",
        "class": "circle"
    });

*/


var satelliteGroup = focus.append("g")
    .attr('clip-path', 'url(#clip)');
    

var satelliteGroups = satelliteGroup.selectAll("g.gps").data(data)
    .enter()
    .append("g").attr("class", "gps")
    .attr("transform", function (d, i) {
    return "translate(" + [x(parseDate(d.launch)) - 30, y(d.period) - 25] + ")";
})


// <a xlink:href="http://www.w3schools.com/svg/" target="_blank">

var satellite = satelliteGroups.append("a").attr("xlink:href", function (d,i) {return d.link;}).attr("target", "_blank")
    .append("path")
    .attr("d", satellitePath).attr("fill", function (d,i) {return d.satellites === "Galileo" ? "#0099CC" : 
                                                                  d.satellites === "Glonass" ? "#FF0000" : 
                                                                  d.satellites === "Beidou" ? "#CC9900" : 
                                                                  "#0000FF";})
    //.attr("transform", "translate(-14,-25)")
    .attr("class", "gpsPath");

//satelliteGroups.append("text").attr("class","txtName").attr("transform", "translate(25, 6)").append("tspan").text(function(d,i) {return d.name;}).attr("text-anchor", "middle");

//satelliteGroups.append("text").text(function(d,i) {return d.name;}).attr("text-align", "right").attr("transform", "translate(-8, -18)").attr("class","txtName");

//Block IIA GPS satellite
satellite.on("mouseover", function(d) {      
            div.transition()        
                .duration(200)      
                .style("opacity", 0.8);      
            div .html("<b>Name: " + d.name + "</b>" 
                + "<br/><b>Type:</b> "  + d.satellites + " satellite"
                + "<br/><b>Launch date:</b> "  + d.launch
                + "<br/><b>Period</b> "  + d.period + " minutes"
                + "<br/><b>Int'l Code:</b> "  + d.intCode
                + "<br/><b>NORAD ID:</b> "  + d.noradId
                /*+ "<br/><b>" + (function(){return d.Retired === "Operational" ? "Status:" :
                                                  d.Retired === "Undergoing testing" ? "Status:" :
                                                  d.Retired === "Unhealthy" ? "Status:" :
                                                                "Retired:";}()) + "</b> "  + d.Retired
                */
                )  
                .style("left", (d3.event.pageX + 15) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
            })      
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0); 
                });



/*
    .append("circle")
.attr({ 
            "r": 10,
        "fill": "steelblue",
        "class": "circle"

})
*/



focus.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

focus.append("g")
    .attr("class", "y axis")
    //.attr("transform", "translate(" + -20 + ",0)")
    .call(yAxis);

focus.append("g")
    .attr("class", "y axis height")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxisHeight);    

/*
context.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area2);
*/

context.selectAll("circle").data(data)
    .enter()
    .append("circle")
    .attr({
    "cx": function (d, i) {
        return x2(parseDate(d.launch));
    },
        "cy": function (d, i) {
        return y2(d.period); //y2(d.price);
    },
        "r": 3,
        "fill": function (d,i) {return d.satellites === "Galileo" ? "#0099CC" : 
                                                                  d.satellites === "Glonass" ? "#FF0000" : 
                                                                  d.satellites === "Beidou" ? "#CC9900" : 
                                                                  "#0000FF";},
        "class": "circle"
});





context.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(xAxis2);

context.append("g")
    .attr("class", "x brush")
    .call(brush)
    .selectAll("rect")
    .attr("y", -6)
    .attr("height", height2 + 7);

});    


