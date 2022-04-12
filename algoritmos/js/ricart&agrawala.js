var multicast = d3.select("#multicastsvg")
    .append("svg")
    .attr("width", 540)
    .attr("height", 300)
var x0 = 0, y0 = 0, tx = 97, ty = 30;
var i, j, p, k;
var nodesFirst = [];
var mess = "RELEASED";
var clock = 0;
var ini = -1;
var operation = "SEND";
var lineC = "#000";
function desenhoinitPart() {
    p = 0; // nome do processo //
    for (let i = 0; i < 2; i++) {
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
            //relogio //
            multicast.append("text")
                .attr("x", x0 + 50)
                .attr("y", y0 + 22)
                .attr("class", "P" + p)
                .text("[" + clock + "]")
                .attr("font-family", "sans-serif")
                .attr("font-size", "17px")
                .attr("fill", "#000");
            // mensagem //
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
            // fila//
            multicast.append("rect")
                .attr("style", "fill:#7B7B7B")
                .attr("stroke", "#000")
                .attr("x", x0 + 96)
                .attr("y", y0)
                .attr("width", 25)
                .attr("height", ty + ty + 0.2);

            var fila = [];
            var newNode = { id: p, x: x0, y: y0, message: mess, filaProcesso: fila, clock };
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
// colocar wanted nos processos //
function playRand() {
    var chooseP;
    for (let i = 0; i < 4; i++) {
        if (i == 0) {
            chooseP = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(0))) + 0;
            do {
                rand = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0))) + 0;
            } while (rand == 2)
            if (rand == 0) {
                nodesFirst[chooseP].message = "RELEASED";
            }
            else {

                nodesFirst[chooseP].message = "WANTED";
                d3.select("#multicastsvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(nodesFirst[chooseP].message);
                console.log("Processo: " + chooseP + " Mensagem: " + nodesFirst[chooseP].message);
            }
        }
        else {
            do {
                rand = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(0))) + 0;
            } while (chooseP == rand)
            chooseP = rand;
            do {
                rand = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0))) + 0;
            } while (rand == 2)
            if (rand == 0) {
                nodesFirst[chooseP].message = "RELEASED";
                d3.select("#multicastsvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(nodesFirst[chooseP].message);
            }
            else {
                nodesFirst[chooseP].message = "WANTED";
                d3.select("#multicastsvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(nodesFirst[chooseP].message);
                console.log("Processo: " + chooseP + " Mensagem: " + nodesFirst[chooseP].message);
            }
        }
    }


}
//desenho da seta P2P
function desenharMensagem(p1, p2) {
    d3.select("#multicastsvg").selectAll(".bloco").remove();
    if (p1.id == 0 && p2.id == 1 || (p1.id == 2 && p2.id == 3)) {
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "mensagem")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", p2.x)
            .attr("y1", p2.y + 30)
            .attr("x2", p1.x + tx + 25)
            .attr("y2", p1.y + 30)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (p1.id == 0 && p2.id == 2 || (p1.id == 1 && p2.id == 3)) {
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "mensagem")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", p2.x + (tx / 2))
            .attr("y1", p2.y)
            .attr("x2", p1.x + (tx / 2))
            .attr("y2", p1.y + 2 * ty)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (p1.id == 0 && p2.id == 3) {
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "mensagem")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", p2.x)
            .attr("y1", p2.y)
            .attr("x2", p1.x + tx + 25)
            .attr("y2", p1.y + 2 * ty)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (p1.id == 1 && p2.id == 0 || (p1.id == 3 && p2.id == 2)) {
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "mensagem")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", p2.x + tx + 25)
            .attr("y1", p2.y + 30)
            .attr("x2", p1.x)
            .attr("y2", p1.y + 30)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (p1.id == 1 && p2.id == 2) {
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "mensagem")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", p2.x + tx + 25)
            .attr("y1", p2.y)
            .attr("x2", p1.x)
            .attr("y2", p1.y + 2 * ty)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (p1.id == 2 && p2.id == 0 || (p1.id == 3 && p2.id == 1)) {
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "mensagem")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", p2.x + (tx / 2))
            .attr("y1", p2.y + 2 * ty)
            .attr("x2", p1.x + (tx / 2))
            .attr("y2", p1.y)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (p1.id == 2 && p2.id == 1) {
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "mensagem")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", p2.x)
            .attr("y1", p2.y + 2 * ty)
            .attr("x2", p1.x + tx + 25)
            .attr("y2", p1.y)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (p1.id == 3 && p2.id == 0) {
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "mensagem")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", p2.x + tx + 25)
            .attr("y1", p2.y + 2 * ty)
            .attr("x2", p1.x)
            .attr("y2", p1.y)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
}
// função que retorna mensagem para quem solicitou //
function heldBroadcast(processo) {
    d3.select("#multicastsvg").selectAll(".bloco").remove();
    for (let index = 0; index < processo.filaProcesso.length; index++) {
        desenharMensagem(processo, nodesFirst[processo.filaProcesso[index]]);
    }
}
function analisarAcesso(processoSolicitante) {
    //respostas //
    var acesso = 0;
    for (let i = 0; i < nodesFirst.length; i++) {
        console.log("Processos" + nodesFirst.length);
        if (processoSolicitante.id != nodesFirst[i].id) {
            if (nodesFirst[i].message == "RELEASED") {
                acesso++;
                desenharMensagem(nodesFirst[i], processoSolicitante);
            } else {
                if (nodesFirst[i].message == "HELD") {
                    if (!nodesFirst[i].filaProcesso.find(element => element == processoSolicitante.id)) {
                        nodesFirst[i].filaProcesso.push(processoSolicitante.id);
                        desenharFila(nodesFirst[i]);
                    }

                } else {
                    if (nodesFirst[i].message == "WANTED") {
                        if (nodesFirst[i].clock > processoSolicitante.clock) {
                            acesso++;
                            desenharMensagem(nodesFirst[i], processoSolicitante);
                            if (!nodesFirst[i].filaProcesso.find(element => element == processoSolicitante.id)) {
                                processoSolicitante.filaProcesso.push(nodesFirst[i].id);
                                desenharFila(processoSolicitante);
                            }

                        }
                    }
                }
            }
        }

    }
    console.log("Acesso: " + acesso);
    return acesso;
}
function desenharFila(p1) {
    d3.select("#multicastsvg").selectAll(".filaprocesso" + p1.id).remove();
    var disty = p1.y + 2 * ty;
    for (let i = 0; i < p1.filaProcesso.length; i++) {
        disty -= 1.2 + 20;
        multicast.append("rect")
            .attr("class", "filaprocesso" + p1.id)
            .attr("style", "fill:white")
            .attr("x", p1.x + tx + 1)
            .attr("y", disty + 4)
            .attr("width", 20)
            .attr("height", 18)
            .attr("stroke", "#000");
        multicast.append("text")
            .attr("class", "filaprocesso" + p1.id)
            .attr("x", p1.x + tx + 2)
            .attr("y", disty + 16)
            .text("P" + p1.filaProcesso[i])
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", lineC);
    }
}
function broadcast(processoSolicitante) {
    if (processoSolicitante.id == 0) {
        multicast.append("rect")
            .attr("x", processoSolicitante.x + tx + 50)
            .attr("y", processoSolicitante.y)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", processoSolicitante.x + tx + 55)
            .attr("y", processoSolicitante.y + 16)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[1].x)
            .attr("y1", nodesFirst[1].y + 30)
            .attr("x2", processoSolicitante.x + tx + 25)
            .attr("y2", processoSolicitante.y + 30)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
        // proximo processo //
        multicast.append("rect")
            .attr("x", processoSolicitante.x + (tx / 2) + 5)
            .attr("y", nodesFirst[2].y - 60)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", processoSolicitante.x + (tx / 2) + 10)
            .attr("y", nodesFirst[2].y - 44)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[2].x + (tx / 2))
            .attr("y1", nodesFirst[2].y)
            .attr("x2", processoSolicitante.x + (tx / 2))
            .attr("y2", processoSolicitante.y + 2 * ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");

        multicast.append("rect")
            .attr("x", processoSolicitante.x + tx + 80)
            .attr("y", nodesFirst[3].y - 78)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", processoSolicitante.x + tx + 85)
            .attr("y", nodesFirst[3].y - 62)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[3].x)
            .attr("y1", nodesFirst[3].y)
            .attr("x2", processoSolicitante.x + tx + 25)
            .attr("y2", processoSolicitante.y + 2 * ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (processoSolicitante.id == 1) {
        multicast.append("rect")
            .attr("x", nodesFirst[0].x + tx + 55)
            .attr("y", processoSolicitante.y)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", nodesFirst[0].x + tx + 60)
            .attr("y", processoSolicitante.y + 16)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[0].x + tx + 25)
            .attr("y1", nodesFirst[0].y + 30)
            .attr("x2", processoSolicitante.x)
            .attr("y2", processoSolicitante.y + 30)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
        // proximo processo //
        multicast.append("rect")
            .attr("x", nodesFirst[2].x + 125)
            .attr("y", nodesFirst[2].y - 75)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", nodesFirst[2].x + 130)
            .attr("y", nodesFirst[2].y - 59)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[2].x + tx + 25)
            .attr("y1", nodesFirst[2].y)
            .attr("x2", processoSolicitante.x)
            .attr("y2", processoSolicitante.y + 2 * ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");

        multicast.append("rect")
            .attr("x", processoSolicitante.x + (tx / 2) + 5)
            .attr("y", nodesFirst[3].y - 73)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", processoSolicitante.x + (tx / 2) + 10)
            .attr("y", nodesFirst[3].y - 57)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[3].x + (tx / 2))
            .attr("y1", nodesFirst[3].y)
            .attr("x2", processoSolicitante.x + (tx / 2))
            .attr("y2", processoSolicitante.y + 2 * ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (processoSolicitante.id == 2) {
        multicast.append("rect")
            .attr("x", processoSolicitante.x + (tx / 2) + 5)
            .attr("y", processoSolicitante.y - 73)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", processoSolicitante.x + (tx / 2) + 10)
            .attr("y", processoSolicitante.y - 57)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[0].x + (tx / 2))
            .attr("y1", nodesFirst[0].y + 2 * ty)
            .attr("x2", processoSolicitante.x + (tx / 2))
            .attr("y2", processoSolicitante.y)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
        //proximo processo //
        multicast.append("rect")
            .attr("x", nodesFirst[2].x + 125)
            .attr("y", nodesFirst[2].y - 75)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", nodesFirst[2].x + 130)
            .attr("y", nodesFirst[2].y - 59)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[1].x)
            .attr("y1", nodesFirst[1].y + 2 * ty)
            .attr("x2", processoSolicitante.x + tx + 25)
            .attr("y2", processoSolicitante.y)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");

        multicast.append("rect")
            .attr("x", processoSolicitante.x + tx + 55)
            .attr("y", processoSolicitante.y)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", processoSolicitante.x + tx + 60)
            .attr("y", processoSolicitante.y + 16)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[3].x)
            .attr("y1", nodesFirst[3].y + ty)
            .attr("x2", processoSolicitante.x + tx + 25)
            .attr("y2", processoSolicitante.y + ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (processoSolicitante.id == 3) {
        multicast.append("rect")
            .attr("x", processoSolicitante.x + (tx / 2) + 5)
            .attr("y", processoSolicitante.y - 73)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", processoSolicitante.x + (tx / 2) + 10)
            .attr("y", processoSolicitante.y - 57)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[0].x + tx + 25)
            .attr("y1", nodesFirst[0].y + 2 * ty)
            .attr("x2", processoSolicitante.x)
            .attr("y2", processoSolicitante.y)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
        //proximo processo //
        multicast.append("rect")
            .attr("x", nodesFirst[0].x + 170)
            .attr("y", nodesFirst[0].y + 75)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", nodesFirst[0].x + 175)
            .attr("y", nodesFirst[0].y + 91)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[1].x + (tx / 2))
            .attr("y1", nodesFirst[1].y + 2 * ty)
            .attr("x2", processoSolicitante.x + (tx / 2))
            .attr("y2", processoSolicitante.y)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");

        multicast.append("rect")
            .attr("x", nodesFirst[2].x + tx + 60)
            .attr("y", nodesFirst[2].y)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        multicast.append("text")
            .attr("x", nodesFirst[2].x + tx + 65)
            .attr("y", nodesFirst[2].y + 16)
            .attr("class", "bloco")
            .text("P" + processoSolicitante.id + "-" + processoSolicitante.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        multicast.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("class", "bloco")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 10)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
        multicast.append("line")
            .attr("x1", nodesFirst[2].x + tx + 25)
            .attr("y1", nodesFirst[2].y + ty)
            .attr("x2", processoSolicitante.x)
            .attr("y2", processoSolicitante.y + ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
}
function atualizarStatus(p) {
    d3.select("#multicastsvg").selectAll(".M" + p)
        .transition()
        .delay(1200)
        .text(nodesFirst[p].message);
}
//FUNÇÃO PARA ATUALIZAR OS PROCESSOS COM AS MENSAGENS DE LIBERAÇÃO DO PROCESSO HELD
//acessa nodeFirst de acordo com o id da fila do processo HELD
function liberarAcesso(processo) {
    let index = 0
    while (processo.filaProcesso[index] != null) {
        //chama verificação daquele processo para verificar se ele pode acessar a sessão crítica
        if (revisarAcesso(nodesFirst[processo.filaProcesso[index]]) === 3) {

            nodesFirst[processo.filaProcesso[index]].message = "HELD";
            atualizarStatus(processo.filaProcesso[index]);
            //atualizar desenho do status
        }
        processo.filaProcesso.splice(0, 1);
        desenharFila(processo);
    }
}
function revisarAcesso(processoSolicitante) {
    var acesso = 0;
    for (let i = 0; i < nodesFirst.length; i++) {
        if (processoSolicitante.id == nodesFirst[i].id) {
            i++;
            if (i == 4) {
                return acesso;
            }
        }
        if (nodesFirst[i].message === "RELEASED") {
            acesso++;
        } else {
            if (nodesFirst[i].message === "WANTED") {
                if (nodesFirst[i].clock > processoSolicitante.clock) {
                    acesso++;
                }
            }
        }
    }
    return acesso;
}
function playAlg() {
    console.log(ini);
    if (ini == 4) {
        ini = 0;
    }
    // função para o terceiro desenho //
    if (estaVisivel(d) == true) {

    }
    // segundo desenho
    else {
        d3.select("#multicastsvg").selectAll(".bloco").remove();
        d3.select("#multicastsvg").selectAll(".mensagem").remove();
        // primeiro apertar//
        if (ini == -1) {
            playRand();
            ini++;
            operation = "SEND";

        }
        else {
            if (operation == "RESP" && nodesFirst[ini].message == "WANTED") {
                if (analisarAcesso(nodesFirst[ini]) == 3) {
                    nodesFirst[ini].message = "HELD";
                    atualizarStatus(ini);
                }
                ini++;
                operation = "SEND";
            }
            else {
                if (operation == "SEND") {
                    console.log(nodesFirst[ini].message);
                    if (nodesFirst[ini].message == "WANTED") {
                        broadcast(nodesFirst[ini]);
                        operation = "RESP"; //var para controle de resposta
                    }

                    if (nodesFirst[ini].message == "HELD") {
                        heldBroadcast(nodesFirst[ini]);

                        nodesFirst[ini].message = "RELEASED";
                        // função para mudar status do desenho depois de 1s;
                        atualizarStatus(ini);

                        liberarAcesso(nodesFirst[ini]); //no caso de alguma interação entrar no held, pode ter mudanças significativas no programa, é prioridade atualiza-las
                    }
                    if (nodesFirst[ini].message == "RELEASED") {
                        ini++;
                    }
                }
            }

        }

    }
}
window.onload = function () {
    desenhoinitPart();
    document.getElementById("buttonsR2").style.display = "block";
    desenhoinitPart0();
}
window.onscroll = function () { scrollFunction() };
const d = document.querySelector("#customIMG");
// detectar o ultimo desenho //
function estaVisivel(el) {
    const posicoes = el.getBoundingClientRect();
    const inicio = posicoes.top;
    const fim = posicoes.bottom;
    let estaVisivel = false

    if ((inicio >= 0) && (fim <= (window.innerHeight) - 200)) {
        estaVisivel = true;
    }
    return estaVisivel;
}
function scrollFunction() {

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
    // troca de desenho //
    if (estaVisivel(d) == true) {
        // document.getElementById("buttons").style.display = "flex";
        // d3.select("#combobox").selectAll("option").remove();
        // d3.select("#combobox").selectAll("select").remove();
        // criarComboBox();
    }
    else {
        // document.getElementById("buttons").style.display = "none";
    }
}
var teste = d3.select("#firstsvg")
    .append("svg")
    .attr("width", 540)
    .attr("height", 300)
function desenhoinitPart0() {
    y0 = 0;
    x0 = 0;
    p = 0;
    for (let i = 0; i < 2; i++) {
        x0 = x0 + i * 250;
        teste.append("rect")
            .attr("class", "legenda" + p)
            .attr("style", "fill:#fff")
            .attr("stroke", "#000")
            .attr("x", x0)
            .attr("y", y0)
            .attr("width", tx + 24)
            .attr("height", ty + ty + 0.2);
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
    // mensagem //
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
