var Pane = (function() {
    // "private" variables 
    var id, width, height, x, y, str, value, topHeight, rightWidth, rightHeightRate, radiusRectWidth;
    var rectHeight;

    // constructor
    function Pane() {
      this.width =  this.height = 100;
      this.x = this.y = 0;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    Pane.prototype.draw = function() {
        var id = this.id;
        var width = this.width;
        var height = this.height;
        var x = this.x;
        var y = this.y;
        var str = this.str;
        var value = this.value;
        var topHeight = this.topHeight;
        var rightWidth = this.rightWidth;
        var rectHeight = this.rectHeight;
        var svg = d3.select(id);
        var fontSize = parseInt($('.man_str').css('font-size'))/5*4;
        var rightHeightRate = this.rightHeightRate;
        var radiusRectHeight = rectHeight*rightHeightRate;
        var radiusRectWidth = this.radiusRectWidth;

        if(rightHeightRate != 0){ 

          // Right Radius Rect
           svg.append('rect')
            .attr('x', x+width-radiusRectWidth/2)
            .attr('y', y+height-radiusRectHeight)
            .attr('rx',radiusRectWidth/2)
            .attr('ry',radiusRectWidth/2)
            .attr('width', radiusRectWidth)
            .attr('height', radiusRectHeight)
            .attr('class','radius_rect');
           
           svg.append('rect')
            .attr('x', x+width-radiusRectWidth/2)
            .attr('y', y+height-radiusRectHeight+radiusRectWidth/2)
            .attr('width', radiusRectWidth)
            .attr('height', radiusRectHeight-radiusRectWidth/2)
            .attr('class','radius_rect');
          
          svg.append("svg:image")
           .attr('x', x+width)
           .attr('y', y+height+radiusRectWidth/10)
           .attr('width', radiusRectWidth/2)
           .attr('height', radiusRectWidth/2)
           .attr("xlink:href","img/bottom_arrow.png");
        }
        

        // Back Rect
        svg.append('rect')
          .attr('x', x)
          .attr('y', y+topHeight)
          .attr('width', width)
          .attr('height', rectHeight)
          .attr('class','value_pane');

        // Left Top Text
        svg.append('text')
          .attr('x',x+fontSize/2)
          .attr('y',y+topHeight-fontSize/3)
          .attr('font-size',fontSize)
          .text(str);

        // Right Top Value
        svg.append('text')
          .attr('x', x+width-fontSize/2)
          .attr('y', y+topHeight-fontSize/3)
          .attr('class','conversion_str')
          .attr('text-anchor','end')
          .attr('font-size',fontSize)
          .text(value);

        var length = value.toString().length;
        svg.append("svg:image")
         .attr('x', x+width-fontSize/2-fontSize*length/10*9)
         .attr('y', y+topHeight-fontSize/4*5)
         .attr('width', fontSize)
         .attr('height', fontSize)
         .attr("xlink:href","img/man2.png");
    };
    return Pane;
})();