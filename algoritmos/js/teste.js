var desenho = d3.select("#testesvg")
                .append("svg")
                .attr("width", 500)
                .attr("height", 300)
                .style("background","red");
var n1 = 3,x0 = 200,y0 = 100, rx0 = 15, ry0 = 15, tx = 80, ty = 80;
                
function iniciar(){
    desenho.append("rect")		// pre-defined shape
            .attr("style", "fill:darkblue")	// fill color of shape
            .attr("x", x0)					// displacement from origin
            .attr("y", y0)					// displacement from origin
            .attr("rx", rx0)					// how much to round corners - to be transitioned below
            .attr("ry", ry0)					// how much to round corners - to be transitioned below
            .attr("width", tx)				// size of shape
            .attr("height", ty);
}		


var slider1 = document.getElementById("sliderNodePart2");
slider1.oninput = function (){
n1=this.value;
console.log("ola");
mudar();
// d3.select("#testesvg").selectAll("rect").remove();
}
  function mudar(){
    if(n1 % 2 == 0){
    d3.select("#testesvg").selectAll("rect")
    .transition()
    .duration(3000)
    .attr("rx",0)
    .attr("ry",0);
    }
    else{
    d3.select("#testesvg").selectAll("rect")
    .transition()
    .duration(3000)
    .attr("rx",rx0)
    .attr("ry",ry0);
    }
    
}

window.onload = iniciar();

                
