var first = d3.select("#anelsvg")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);

var i, radio = 15, angle, n1 = 3, partic = 0, x1, y1,x2,y2;
var part;
var nodesFirst = [];
var folga=0.208;
var color = "#2892D7", line = "RoyalBlue";
var changeColor = "#009933", partColor = "#FF9F1C", nopartColor = "#104E8B";
var lineC = "#000000", colorC = "#ffffff";

function desenhoinitPart(){
    for(i=0;i<n1;i++){
        angle = 2*Math.PI*i/n1;
        x1=Math.cos(angle)*103 + 150;
        y1=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);
        
        x2=Math.cos(2*Math.PI*(i+1)/n1)*103 + 150;
        y2=Math.sin(2*Math.PI*(i+1)/n1)*103 + 150;
        var newNode = {x: x1, y: y1, id: i, angle, part: partic};
        nodesFirst.push(newNode);
        first.append("line")
             .attr("x1",x1)
             .attr("y1",y1)
             .attr("x2",x2)
             .attr("y2",y2)
             .attr("stroke", lineC)
             .attr("stroke-width", 3)
             .attr("fill", colorC);
    }
    for(i=0;i<n1;i++){
        angle = 2*Math.PI*i/n1;
        x1=Math.cos(angle)*103 + 150;
        y1=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);

        first.append("circle")
            .attr("cx", x1)
            .attr("cy", y1)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", color)
            .append("text")
            .text("P"+i);
    }
}

function showPart(){
    d3.select("#anelsvg").selectAll("circle").remove();
    for(i=0;i<n1;i++){                
        if(nodesFirst[i].part==1){
            first.append("circle")
                    .attr("cx", nodesFirst[i].x)
                    .attr("cy", nodesFirst[i].y)
                    .attr("r", radio)
                    .attr("stroke", line)
                    .attr("stroke-width", 1)
                    .attr("fill", partColor)
                    .append("text")
                    .text("P"+i);

        first.append("rect")
                .attr("x", nodesFirst[i].x-8)
                .attr("y", nodesFirst[i].y+6)
                .attr("width", 16)
                .attr("height", 15)
                .attr("stroke", lineC)
                .attr("stroke-width", 1)
                .attr("fill", colorC);

        first.append("text")
                .attr("x", nodesFirst[i].x-6)
                .attr("y", nodesFirst[i].y+17)
                .text("P"+i)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", lineC);
        }
        else{
            first.append("circle")
                    .attr("cx", nodesFirst[i].x)
                    .attr("cy", nodesFirst[i].y)
                    .attr("r", radio)
                    .attr("stroke", line)
                    .attr("stroke-width", 1)
                    .attr("fill", color)
                    .append("text")
                    .text("P"+i);
        }
    }
}
window.onload = desenhoinitPart();