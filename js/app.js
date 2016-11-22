var interactions = [];
var panes = [];
var manValues = [8650, 5130, 2580];
var conversionValues = [0, 60, 30];
var Values = [[3400, 2100, 1800, 1700, 1200, 800, 200],
              [1125, 1020, 900, 700, 640, 320, 300],
              [800, 500, 400, 300, 200]];
var heightArr = [[96, 71, 50, 37, 30, 30, 30],
                  [55, 50, 48, 40, 30, 30, 23],
                  [30, 25, 23, 24, 16]];
var strArr = [['Food', 'Retail', 'Kinderland', 'Co-Working', 'Business', 'Freizeit', 'Collect-Lounge'],
              ['Freizeit', 'Kinderland', 'Food', 'Retail', 'Co Working', 'Business', 'Collect-Lounge'],
              ['Food', 'Retail', 'Kinderland', 'Freizeit', 'Business']];
var rightHeightRateArr = [[0.5, 0.4, 0.4, 0.6, 0.4, 0.5, 0.5],
                        [0.6, 0.6, 0.7, 0.9, 0.5, 0.8, 0.8],
                        [0,0,0,0,0]];
var links = [ [[0,1,3],[0,1,2],[0,3,4],[3,5],[0,1],[2,6],[2,4]],
              [[0,2],[1,4],[0,3],[4],[0,2],[1],[3]] ];

//borrowed from sankey.js, draws one a line from top of source to top of target, top of target to bottom of target, bottom of target to bottom of source, bottom of source to top of source
function link(d) {
  var curvature = .6;
  var x0 = d.source.x + d.source.dx,
      x1 = d.target.x,
      xi = d3.interpolateNumber(x0, x1),
      x2 = xi(curvature),
      x3 = xi(1 - curvature),
      y0 = d.source.y + d.sy + d.dy / 2,
      y1 = d.target.y + d.ty + d.dy / 2;
  return "M" + x0 + "," + y0
       + "C" + x2 + "," + y0
       + " " + x3 + "," + y1
       + " " + x1 + "," + y1
       + "L" + x1 + "," + (y1+d.target.dy)
       + "C" + x3 + "," + (y1+d.target.dy)
       + " " + x2 + "," + (y0+d.source.dy)
       + " " + x0 + "," + (y0+d.source.dy)
       + "L" + x0 + "," + y0;
}

function drawChart(){
  //based on 'Sankey from csv with d3.js' http://bl.ocks.org/d3noob/c9b90689c1438f57d649
  var divWidth = $('#chart').width(), divHeight = $('#chart').height();
  var margin = {top: divHeight/777*98, right: divWidth/1600*118, bottom: divHeight/777*66, left: divWidth/1600*124},
      width = divWidth - margin.left - margin.right,
      height = divHeight - margin.top - margin.bottom;
  // append the svg canvas to the page
  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("id","svg")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

  var rectMarginTop = height/614*21;
  var linkMarginTop = height/614*4;
  var i, j;
  for(i = 0; i < 3; i++){
    var interaction = new Interaction();
    var interactionWidth = width/5;
    interaction.id = '#svg';
    interaction.x = interactionWidth*i*2;
    interaction.height = height;
    interaction.width = interactionWidth;
    interaction.manValue = manValues[i];
    interaction.Conversion = conversionValues[i];
    interaction.topHeight = height/614*57;
    interaction.valuePanHeight = height/614*33;
    interaction.ind = i+1;
    interactions.push(interaction);
  }
  for(i = 0; i < Values.length; i++){
    var totalHeight = 0;
    for(j = 0; j < Values[i].length; j++){
      totalHeight += height/614*heightArr[i][j]+rectMarginTop;
    }
    var y = (interactions[i].topHeight/2+(height-totalHeight-interactions[i].valuePanHeight-interactions[i].topHeight/3*2)/2);
    var one_panes = [];
    for(j = 0; j < Values[i].length; j++){
      var pane = new Pane();
      pane.id = '#svg';
      pane.width = width/10;
      pane.height = height/614*heightArr[i][j]+rectMarginTop;
      pane.topHeight = rectMarginTop;
      pane.x = pane.width/2+i*width/5*2;
      pane.y = y;
      pane.str = strArr[i][j];
      pane.value = Values[i][j];
      pane.rightHeightRate = rightHeightRateArr[i][j];
      pane.radiusRectWidth = height/614*18;
      pane.rectHeight = pane.height - pane.topHeight;
      y += pane.height;
      one_panes.push(pane);
    }
    panes.push(one_panes);
  }

  for(i = 0; i < interactions.length; i++){
    interactions[i].draw();
  }

  var links_index;
  for(links_index = 0; links_index < links.length; links_index++){
    var link1 = links[links_index];
    var from = links_index, to = links_index+1;
    var start_y2 = [];
    for(j = 0; j < panes[to].length; j++){
      start_y2.push(panes[to][j].y + panes[to][j].topHeight);
    }
    for(i = 0; i < link1.length; i++){
      var pane1 = panes[from][i];
      var start_y1 = pane1.y + pane1.topHeight;
      for(j = 0; j < link1[i].length; j++){
        var pane2 = panes[to][link1[i][j]];
        var dy = (pane1.rectHeight*(1-pane1.rightHeightRate) - linkMarginTop*(link1[i].length-1))/link1[i].length;
        var x1 = pane1.x+pane1.width;
        var y1 = start_y1;
        var x2 = pane2.x;
        var y2 = start_y2[link1[i][j]];
        start_y1 += dy+linkMarginTop;
        start_y2[link1[i][j]] += dy+linkMarginTop;
        //array of d3 sankey nodes
        var data = {
          dy: 0, //link height, same as source.dy?
          source: {
            dx:0, //node width
            dy:dy, //node height
            x:x1, //node position
            y:y1
          },
          sy:0, //y-offset of link from top of source node
          target: {
            dx:0, //node width
            dy:dy, //node height
            x:x2, //node position
            y:y2
          },
          ty: 0, //y-offset of link from top of target node
          value: 2
        }
        svg.append("path")
        .attr("d", link(data));
      }
    }
  }

  for(i = 0; i < panes.length; i++){
    for(j = 0; j < panes[i].length; j++){
      panes[i][j].draw();
    }
  }
}