var Interaction = (function() {
    // "private" variables 
    var id, width, height,x,y, manValue, Conversion, ind, topHeight, valuePanHeight;

    // constructor
    function Interaction() {
      this.width =  this.height = 100;
      this.x = this.y = 0;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    Interaction.prototype.draw = function() {
        var id = this.id;
        var width = this.width;
        var height = this.height;
        var x = this.x;
        var y = this.y;
        var svg = d3.select(id);
        var opactiyRectHeight = height/614*560;
        var valuePanHeight = this.valuePanHeight; 
        var imageWidth = height/614*8;
        var imageHeight = height/614*16;
        var imageMaringLeft = imageHeight;
        var imageMarginTop = (valuePanHeight-imageHeight)/2;
        var manValue = this.manValue;
        var manStr = (manValue/1000)+' K';
        var Conversion = this.Conversion;
        var conversionStr = 'Conversion: ' + Conversion + '%';
        var valueReducePanWidth = width/100*(100-Conversion);
        var topHeight = this.topHeight;
        var numberSize = height/614*19;
        var fontSize = parseInt($('.man_str').css('font-size'));
        var ind = this.ind;
        var leftArrowWidth = height/614*7;
        var leftArrowHeight = height/614*9;
        var interationFontSize = parseInt($('.interaction_str').css('font-size'));
        // Background
        svg.append('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', width)
          .attr('height', opactiyRectHeight)
          .attr('class','pane');

        numberSize = interationFontSize;

        // Top Number and 'Interaction' String
        svg.append('line')
          .attr('x1',x)
          .attr('y1',y+topHeight)
          .attr('x2', x+width)
          .attr('y2', y+topHeight)
          .attr('class', 'interaction_line');
        svg.append('rect')
          .attr('x', x+numberSize)
          .attr('y', y+numberSize)
          .attr('width', numberSize)
          .attr('height', numberSize)
          .attr('rx', numberSize/5)
          .attr('ry', numberSize/5)
          .attr('class', 'value_pane');
        console.log(interationFontSize);
        svg.append('text')
          .attr('x', x+numberSize*5/2)
          .attr('y', y+numberSize+numberSize/4*3)
          .text('Interaction')
          .attr('class','interaction_str')
          .attr('opacity',0.8);
        svg.append('text')
          .attr('x', x+numberSize/2*3)
          .attr('y', y+numberSize+numberSize/5*4)
          .text(ind)
          .attr('class','white_text')
          .attr('font-size',numberSize/5*4)
          .attr('text-anchor','middle');

        //Bottom
        svg.append('rect')
          .attr('x', x)
          .attr('y', y+opactiyRectHeight)
          .attr('width', width)
          .attr('height', valuePanHeight)
          .attr('class','value_pane');
        svg.append("svg:image")
         .attr('x', x+imageMaringLeft)
         .attr('y', y+opactiyRectHeight+imageMarginTop)
         .attr('width', imageWidth)
         .attr('height', imageHeight)
         .attr("xlink:href","img/man1.png");
        svg.append("text")
         .attr('x', x+imageMaringLeft+imageWidth+fontSize/3)
         .attr('y', y+opactiyRectHeight+imageMarginTop+imageHeight/2+fontSize/3)
         .text(manStr)
         .attr('class','man_str');
        if(Conversion != 0){
          svg.append("text")
           .attr('x', x+imageMaringLeft)
           .attr('y', y+opactiyRectHeight+valuePanHeight+imageMarginTop+fontSize/10*9)
           .text(conversionStr)
           .attr('font-size',fontSize/5*6+"px")
           .attr('class','conversion_str');

          svg.append('rect')
            .attr('x', x+width-valueReducePanWidth)
            .attr('y', y+opactiyRectHeight)
            .attr('width', valueReducePanWidth)
            .attr('height', valuePanHeight)
            .attr('class','value_reduce_pane');

          svg.append("svg:image")
           .attr('x', x+width-valueReducePanWidth+leftArrowWidth)
           .attr('y', y+opactiyRectHeight+(valuePanHeight-leftArrowHeight)/2)
           .attr('width', leftArrowWidth)
           .attr('height', leftArrowHeight)
           .attr("xlink:href","img/left_arrow.png");
        }
    };
    return Interaction;
})();