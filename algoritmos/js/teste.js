var desenho = d3.select("#rasvg")
                .append("svg")
                .attr("width", 540)
                .attr("height", 300)
                .style("background","red");
var n1 = 3,x0 = 230,y0 = 0, tx = 100, ty = 60;
                
function iniciar(){
  desenho.append("rect")		// pre-defined shape
            .attr("style", "fill:black")	// fill color of shape
            .attr("x", x0)					// displacement from origin
            .attr("y", y0)					// displacement from origin
            .attr("width", tx)				// size of shape
            .attr("height", ty);
  desenho.append("text")
            .attr("x", 230)
            .attr("y", 22)
            .text("Processo 1")
            .attr("font-family", "sans-serif")
            .attr("font-size", "18px")
            .attr("fill","#FFFAFA");
  desenho.append("rect")		// pre-defined shape
            .attr("style", "fill:pink")	// fill color of shape
            .attr("x", x0)					// displacement from origin
            .attr("y", 30)					// displacement from origin
            .attr("width", tx)				// size of shape
            .attr("height", 30);
  desenho.append("text")
            .attr("x", 230)
            .attr("y", 52)
            .text("RELEASED")
            .attr("font-family", "sans-serif")
            .attr("font-size", "18px")
            .attr("fill","#000000");
}		
window.onload = iniciar();

                
