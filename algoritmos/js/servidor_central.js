// primeiro desenho //
var servidorCentral = d3.select("#firstsvg")
    .append("svg")
    .attr("width", 500)
    .attr("height", 200);
var i, radio = 15, distx, n1 = 3, partic = 0, x0, y0, x1, y1;
var part;
var nodesFirst = [];
var color = "#E0FF33", line = "RoyalBlue";
var serverColor = "#2892D7";
var lineC = "#454545", colorC = "#ffffff", colorToken = "#FF0000";
var choose = 1;

function desenhoInit() {
    y0 = 20; // posição y, fixa
    x0 = 250;
    // função para criar outros processos //
    for (i = 0; i < n1; i++) {
        if (n1 < 4) {
            distx = 190;
            x1 = distx + i * 60;
            y1 = 150;
        }
        else {
            distx = distx - 30;
            if (i == 0) {
                distx = (n1 - 1) * 30;
                x1 = x0 - distx;
                y1 = 150;
            }
            else {
                x1 = x1 + 60;
                y1 = 150;
            }

        }
        var newNode = { x: x1, y: y1, id: i, distx, part: partic };
        nodesFirst.push(newNode);
        servidorCentral.append("line")
            .attr("x1", x0)
            .attr("y1", y0)
            .attr("x2", x1)
            .attr("y2", y1)
            .attr("stroke", lineC)
            .attr("stroke-width", 5)
            .attr("fill", colorC);

        servidorCentral.append("circle")
            .attr("cx", x1)
            .attr("cy", y1)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", color)
            .append("text")
            .text("P" + i);

    }
    // desenhar o token //
    servidorCentral.append("circle")
        .attr("class", "token")
        .attr("cx", nodesFirst[0].x)
        .attr("cy", nodesFirst[0].y)
        .attr("r", 5)
        .attr("stroke", lineC)
        .attr("fill", colorC);
    // primeiro circulo, esse é o servidor central //
    servidorCentral.append("circle")
        .attr("cx", x0)
        .attr("cy", y0)
        .attr("r", radio)
        .attr("stroke", line)
        .attr("stroke-width", 1)
        .attr("fill", serverColor)
    servidorCentral.append("rect")
        .attr("x", x0 - 38)
        .attr("y", y0 + 7)
        .attr("width", 88)
        .attr("height", 15)
        .attr("stroke", lineC)
        .attr("stroke-width", 1)
        .attr("fill", colorC);
    servidorCentral.append("text")
        .attr("x", x0 - 38)
        .attr("y", y0 + 17)
        .text("Servidor Central")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", lineC);
    servidorCentral.append("rect")		// pre-defined shape
        .attr("style", "fill:darkblue")	// fill color of shape
        .attr("x", x0 - 200)					// displacement from origin
        .attr("y", y0 + 5)					// displacement from origin
        .attr("rx", 15)					// how much to round corners - to be transitioned below
        .attr("ry", 15)					// how much to round corners - to be transitioned below
        .attr("width", 30)				// size of shape
        .attr("height", 70);
    servidorCentral.append("rect")
        .attr("x", x0 - 220)
        .attr("y", y0 - 13)
        .attr("width", 94)
        .attr("height", 15)
        .attr("stroke", lineC)
        .attr("stroke-width", 1)
        .attr("fill", colorC);
    servidorCentral.append("text")
        .attr("x", x0 - 220)
        .attr("y", y0)
        .text("Fila de processos")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", lineC);

}
function showToken() {
    d3.select("#firstsvg").selectAll(".token")
        .transition()
        .duration(2000)
        .attr("fill", colorToken);
}
function unshowToken() {
    d3.select("#firstsvg").selectAll(".token")
        .transition()
        .duration(2000)
        .attr("fill", colorC);
}
function avancarAlg() {
    d3.select("#firstsvg").selectAll(".token")
        .transition()
        .duration(5000)
        .attr("cx", nodesFirst[choose].x)
        .attr("cy", nodesFirst[choose].y);
    d3.select("#firstsvg").selectAll(".filaprocesso")
        .transition()
        .duration(3000)
        .remove();
}
function playAlg() {

    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#firstsvg").selectAll(".token")
        .transition()
        .duration(5000)
        .attr("cx", x0)
        .attr("cy", y0);

    d3.select("#buttonsR2").append("button")
        .attr("onclick", "avancarAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Avançar");

    //  d3.select("#buttonsR2").append("button")
    //                         .attr("onclick","restart()")
    //                         .attr("class","btn btn-rounded btn-light btn-sm")
    //                         .attr("id","algoritmo")
    //                         .text("Restart");                     
    // d3.select("#buttonsR2").append("button")
    //                         .attr("onclick","reset()")
    //                         .attr("class","btn btn-rounded btn-light btn-sm")
    //                         .attr("id","algoritmo")
    //                         .text("Reset");
}
// mostrar o nome dos processos //
function showPart() {
    for (i = 0; i < n1; i++) {
        servidorCentral.append("rect")
            .attr("x", nodesFirst[i].x - 8)
            .attr("y", nodesFirst[i].y + 7)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);
        servidorCentral.append("text")
            .attr("x", nodesFirst[i].x - 8)
            .attr("y", nodesFirst[i].y + 17)
            .text("P" + i)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", lineC);

    }
}
// voltar para o estado inicial, sem os nomes dos processos //
function filaProcessos() {
    servidorCentral.append("rect")
        .attr("class", "filaprocesso")
        .attr("x", 55)
        .attr("y", y0 + 50)
        .attr("width", 16)
        .attr("height", 15)
        .attr("stroke", lineC)
        .attr("stroke-width", 1)
        .attr("fill", colorC);
    servidorCentral.append("text")
        .attr("class", "filaprocesso")
        .attr("x", 55)
        .attr("y", y0 + 60)
        .text("P" + 1)
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", lineC);
}
function unshowPart() {

    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("text").remove();
    nodesFirst.splice(0, 10);
    desenhoInit();
}
// função para utilizar o slide, para mudar o desenho //
var slider1 = document.getElementById("sliderNodePart");
slider1.oninput = function () {
    n1 = this.value;
    nodesFirst.splice(0, 10);
    d3.select("#firstsvg").selectAll("circle").remove();
    d3.select("#firstsvg").selectAll("text").remove();
    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("line").remove();
    desenhoInit();
}
// inicialização da tela //
window.onload = desenhoInit();

window.onscroll = function () { scrollFunction() };

// segundo desenho
var x2 = 230, y2 = 0, tx = 100, ty = 60;

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";

    } else {
        document.getElementById("myBtn").style.display = "none";
    }
    // troca de desenho //
    if (document.documentElement.scrollTop <= 100) {
        d3.select("#firstsvg").selectAll("circle").remove();
        d3.select("#firstsvg").selectAll("text").remove();
        d3.select("#firstsvg").selectAll("rect").remove();
        d3.select("#firstsvg").selectAll("line").remove();
        document.getElementById("buttonsR2").style.display = "none";
        desenhoInit();
    }
    if (document.documentElement.scrollTop > 800) {
        d3.select("#firstsvg").selectAll("circle").remove();
        d3.select("#firstsvg").selectAll("text").remove();
        d3.select("#firstsvg").selectAll("rect").remove();
        d3.select("#firstsvg").selectAll("line").remove();
        document.getElementById("buttonsR2").style.display = "block";
        d3.select("#buttonsR2").selectAll("button")
        .attr("onclick", "playAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Play");
        desenhoInit();
        filaProcessos();
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

