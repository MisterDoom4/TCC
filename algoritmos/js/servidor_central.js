// primeiro desenho //
var first = d3.select("#firstsvg")
                .append("svg")
                .attr("width", 500)
                .attr("height", 300);
var i, radio = 15, distx, n1 = 3, partic = 0, x0,y0,x1,y1;
var part;
var nodesFirst = [];
var color = "#E0FF33", line = "RoyalBlue";
var serverColor = "#2892D7";
var lineC = "#454545", colorC = "#ffffff";

function desenhoinit(){
    y0 = 20; // posição y, fixa
    x0 = 250;        
    // função para criar outros processos //
    for(i=0;i<n1;i++){
        if(n1<4){
            distx = 190;
            x1=distx+i*60;
            y1=150;
        }
        else{
            distx = distx - 30;
            if(i==0){
                distx = (n1-1)*30;
                x1=x0 - distx;
                y1=150;
            }
            else{
                x1=x1 + 60;
                y1=150;
            }
            
        }
        var newNode = {x: x1, y: y1, id: i, distx, part: partic};
        nodesFirst.push(newNode);
        first.append("line")
             .attr("x1",x0)
             .attr("y1",y0)
             .attr("x2",x1)
             .attr("y2",y1)
             .attr("stroke", lineC)
             .attr("stroke-width", 5)
             .attr("fill", colorC);
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
    // primeiro circulo, esse é o servidor central //
    first.append("circle")
         .attr("cx", x0)
         .attr("cy", y0)
         .attr("r", radio)
         .attr("stroke", line)
         .attr("stroke-width", 1)
        .attr("fill", serverColor);
    first.append("rect")
         .attr("x", x0 - 38)
         .attr("y", y0 + 7)
         .attr("width", 88)
         .attr("height", 15)
         .attr("stroke", lineC)
         .attr("stroke-width", 1)
         .attr("fill", colorC);
    first.append("text")
         .attr("x", x0 - 38)
         .attr("y", y0 + 17)
         .text("Servidor Central")
         .attr("font-family", "sans-serif")
         .attr("font-size", "12px")
         .attr("fill", lineC);
    first.append("rect")
         .attr("x", x0 - 5)
         .attr("y", y0)
         .attr("width", 10)
         .attr("height", 10)
         .attr("stroke", lineC)
       
        .attr("fill", colorC);
}
// mostrar o nome dos processos //
function showPart(){
    for(i=0;i<n1;i++){                
        first.append("rect")
                .attr("x", nodesFirst[i].x - 8)
                .attr("y", nodesFirst[i].y + 7)
                .attr("width", 16)
                .attr("height", 15)
                .attr("stroke", lineC)
                .attr("stroke-width", 1)
                .attr("fill", colorC);
        first.append("text")
                .attr("x", nodesFirst[i].x -8)
                .attr("y", nodesFirst[i].y + 17)
                .text("P"+i)
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", lineC);
    }
}
// voltar para o estado inicial, sem os nomes dos processos //
function unshowPart(){
    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("text").remove();
    nodesFirst.splice(0,10);
    desenhoinit();
}
// função para utilizar o slide, para mudar o desenho //
var slider1 = document.getElementById("sliderNodePart");
    slider1.oninput = function (){
    n1=this.value;
    nodesFirst.splice(0,10);
    console.log(nodesFirst);
    d3.select("#firstsvg").selectAll("circle").remove();
    d3.select("#firstsvg").selectAll("text").remove();
    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("line").remove();
    desenhoinit();
}
// inicialização da tela //
window.onload = desenhoinit();

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
