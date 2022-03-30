var multicast = d3.select("#multicastsvg")
    .append("svg")
    .attr("width", 540)
    .attr("height", 300)
var x0 = 0, y0 = 0, tx = 97, ty = 30;
var i, j, p, k;
var nodesFirst = [];
var mess = "RELEASED";
var clock = 0;
function desenhoinitPart() {
    p = 0; // nome do processo //
    for (i = 0; i < 2; i++) {
        y0 = y0 + i * 160;
        for (j = 0; j < 2; j++) {
            inRandom();
            x0 = x0 + j * 250;
            multicast.append("rect")
                .attr("style", "fill:pink")
                .attr("x", x0)
                .attr("y", y0)
                .attr("width", tx)
                .attr("height", ty)
                .attr("stroke", "#000");

            multicast.append("text")
                .attr("x", x0 + 30)
                .attr("y", y0 + 22)
                .text("P" + p)
                .attr("font-family", "sans-serif")
                .attr("font-size", "17px")
                .attr("fill", "#000");
            multicast.append("text")
                .attr("x", x0 + 50)
                .attr("y", y0 + 22)
                .attr("class", "P" + p)
                .text("[" + clock + "]")
                .attr("font-family", "sans-serif")
                .attr("font-size", "17px")
                .attr("fill", "#000");

            multicast.append("rect")
                .attr("style", "fill:#2892D7")
                .attr("x", x0)
                .attr("y", y0 + 30.2)
                .attr("width", tx)
                .attr("height", ty)
                .attr("stroke", "#000");
            multicast.append("text")
                .attr("x", x0 + 2)
                .attr("y", y0 + 52)
                .attr("class", "M" + p)
                .text(mess)
                .attr("font-family", "sans-serif")
                .attr("font-size", "17px")
                .attr("fill", "#000000");
            multicast.append("rect")
                .attr("style", "fill:#7B7B7B")
                .attr("stroke", "#000")
                .attr("x", x0 + 96)
                .attr("y", y0)
                .attr("width", 25)
                .attr("height", ty + ty + 0.2);
            var fila = [];
            var newNode = { x: x0, y: y0, message: mess, filaProcesso: fila, clock };
            nodesFirst.push(newNode);
            p++;
        }
        x0 = 0;
    }
}
// inicialização dos relogios aleatorios //
function inRandom() {
    var ver;
    if (clock != 0) {
        do {
            rand = Math.floor(Math.random() * (Math.floor(30) - Math.ceil(0))) + 1;
            ver = 0;
            for (k = 0; k < p; k++) {
                if (nodesFirst[k].clock == rand) {
                    ver--;
                }
                else {
                    ver++;
                }
            }
        } while (ver != p)
    }
    else {
        rand = Math.floor(Math.random() * (Math.floor(30) - Math.ceil(0))) + 1;
    }
    clock = rand;
}
function playAlg() {
    nodesFirst[0].filaProcesso.push(1);
    nodesFirst[1].filaProcesso.push(2);

}
window.onload = function () {
    desenhoinitPart();
    document.getElementById("buttonsR2").style.display = "block";
    desenhoinitPart0();
}
var teste = d3.select("#firstsvg")
    .append("svg")
    .attr("width", 540)
    .attr("height", 300)
function desenhoinitPart0() {
    y0 = 0;
    x0 = 0;
    p = 0;
    for (i = 0; i < 2; i++) {
        x0 = x0 + i * 250;
        teste.append("rect")
            .attr("style", "fill:pink")
            .attr("x", x0)
            .attr("y", y0)
            .attr("width", tx)
            .attr("height", ty)
            .attr("stroke", "#000");

        teste.append("text")
            .attr("x", x0 + 30)
            .attr("y", y0 + 22)
            .text("P" + p)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000");
        teste.append("text")
            .attr("x", x0 + 50)
            .attr("y", y0 + 22)
            .text("[11]")
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000");

        teste.append("rect")
            .attr("style", "fill:#2892D7")
            .attr("x", x0)
            .attr("y", y0 + 30.2)
            .attr("width", tx)
            .attr("height", ty)
            .attr("stroke", "#000");
        teste.append("text")
            .attr("x", x0 + 2)
            .attr("y", y0 + 52)
            .text("WANTED")
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        teste.append("rect")
            .attr("style", "fill:#7B7B7B")
            .attr("stroke", "#000")
            .attr("x", x0 + 96)
            .attr("y", y0)
            .attr("width", 25)
            .attr("height", ty + ty + 0.2);
        p++;
    }
    teste.append("rect")
        .attr("x", x0 - 85)
        .attr("y", y0 + 2)
        .attr("class", "teste")
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", 54)
        .attr("height", 22)
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("fill", "#6EB960");
    teste.append("text")
        .attr("x", x0 - 82)
        .attr("y", y0 + 18)
        .attr("class", "teste")
        .text("P0" + "   -11")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")
        .attr("fill", "#000000");
    teste.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("class", "teste")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 10)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    teste.append("line")
        .attr("x1", x0)
        .attr("y1", y0 + 30)
        .attr("x2", x0 - 128)
        .attr("y2", y0 + 30)
        .attr("class", "teste")
        .attr("stroke", "#000")
        .attr("stroke-width", 3)
        .attr("marker-start", "url(#arrow)");
}
