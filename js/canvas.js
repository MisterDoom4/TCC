var centralServer = d3.select("#canvasSC")
    .append("svg")
    .attr("width", 250)
    .attr("height", 190);
var radio = 15, distx, n1 = 3, x0, y0, x1, y1, chooseInit = 1;
var arrayNodes = [];
var color = "#E0FF33", line = "RoyalBlue", serverColor = "#2892D7", lineC = "#454545", colorC = "#ffffff"
function drawInit() {
    y0 = 20;
    x0 = 125;
    // função para criar outros processos 
    for (let i = 0; i < n1; i++) {
        if (n1 < 4) {
            distx = 65;
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
        var newNode = { x: x1, y: y1, id: i };
        arrayNodes.push(newNode);
        centralServer.append("line")
            .attr("x1", x0)
            .attr("y1", y0)
            .attr("x2", x1)
            .attr("y2", y1)
            .attr("stroke", lineC)
            .attr("stroke-width", 5)
            .attr("fill", colorC);

        centralServer.append("circle")
            .attr("cx", x1)
            .attr("cy", y1)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", color)
            .append("text")
            .text("P" + i);
    }
    // desenhar o token 
    centralServer.append("circle")
        .attr("class", "token")
        .attr("cx", arrayNodes[chooseInit].x)
        .attr("cy", arrayNodes[chooseInit].y)
        .attr("r", 5)
        .attr("stroke", lineC)
        .attr("fill", colorC);
    // primeiro circulo, esse é o servidor central 
    centralServer.append("circle")
        .attr("cx", x0)
        .attr("cy", y0)
        .attr("r", radio)
        .attr("stroke", line)
        .attr("stroke-width", 1)
        .attr("fill", serverColor);
}
window.onload = drawInit();
var ring = d3.select("#canvasA")
    .append("svg")
    .attr("width", 300)
    .attr("height", 280);

var radio = 15, angle, n1 = 3, x1, y1;
var arrayNodes = [];
var tokenProcess = false;
var normalColor = "#2892D7", line = "RoyalBlue";
var lineC = "#000000", colorC = "#ffffff";
var positionToken = 0;

function drawInit2() {
    positionToken = 0;
    for (let i = 0; i < n1; i++) {
        angle = 2 * Math.PI * i / n1;
        x1 = Math.cos(angle) * 113 + 130;
        y1 = Math.sin(angle) * 113 + 130;
        angle = angle + (Math.PI / 2);

        var newNode = { x: x1, y: y1, id: i, angle, tokenProcess: tokenProcess };
        arrayNodes.push(newNode);

    }
    for (let i = 0; i < n1; i++) {
        if (i === arrayNodes.length - 1) {
            var arc = d3.arc()
                .innerRadius(112.5)
                .outerRadius(113.5)
                .startAngle(arrayNodes[0].angle + (2 * Math.PI))
                .endAngle(arrayNodes[i].angle);
        }
        else {
            var arc = d3.arc()
                .innerRadius(112.5)
                .outerRadius(113.5)
                .startAngle(arrayNodes[i + 1].angle)
                .endAngle(arrayNodes[i].angle);
        }
        ring.append("path")
            .attr("d", arc)
            .attr("transform", "translate(130, 130)");
    }
    for (let i = 0; i < n1; i++) {
        ring.append("circle")
            .attr("cx", arrayNodes[i].x)
            .attr("cy", arrayNodes[i].y)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", normalColor)
            .attr("class", "P" + i);
        ring.append("rect")
            .attr("x", arrayNodes[i].x - 8)
            .attr("y", arrayNodes[i].y + 6)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);
        ring.append("text")
            .attr("x", arrayNodes[i].x - 6)
            .attr("y", arrayNodes[i].y + 17)
            .text("P" + i)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    }
    ring.append("circle")
        .attr("class", "token0")
        .attr("cx", arrayNodes[0].x)
        .attr("cy", arrayNodes[0].y)
        .attr('r', 5)
        .attr('fill', colorC)
        .attr("stroke", lineC);
}

window.onload = drawInit2();

var multicast = d3.select("#canvasRA")
    .append("svg")
    .attr("width", 400)
    .attr("height", 100)
var x0 = 20, y0 = 10, tx = 97, ty = 30;
var idProcess;
var red = "#D60000";
var lineC = "#000";
var arrayNodes = [];
var messageData = ["RELEASED", "WANTED", "HELD"];
var clock = 0;
var ini = -1;
var operation = "SEND";
function drawInit3() {
    y0 = 10;
    x0 = 10;
    idProcess = 0;
    for (let i = 0; i < 2; i++) {
        x0 = x0 + i * 250;
        multicast.append("rect")
            .attr("class", "legenda" + idProcess)
            .attr("style", "fill:#fff")
            .attr("stroke", "#000")
            .attr("x", x0)
            .attr("y", y0)
            .attr("width", tx + 24)
            .attr("height", ty + ty + 0.2);

        multicast.append("rect")
            .attr("style", "fill:pink")
            .attr("class", "blocoNome")
            .attr("x", x0)
            .attr("y", y0)
            .attr("width", tx)
            .attr("height", ty)
            .attr("stroke", "#000");
        multicast.append("text")
            .attr("x", x0 + 30)
            .attr("y", y0 + 22)
            .text("P" + idProcess)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000");
        multicast.append("text")
            .attr("x", x0 + 50)
            .attr("y", y0 + 22)
            .text("[11]")
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000");

        multicast.append("rect")
            .attr("class", "blocoMensagem")
            .attr("style", "fill:#2892D7")
            .attr("x", x0)
            .attr("y", y0 + 30.2)
            .attr("width", tx)
            .attr("height", ty)
            .attr("stroke", "#000");
        multicast.append("text")
            .attr("x", x0 + 2)
            .attr("y", y0 + 52)
            .text(messageData[1])
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");

        multicast.append("rect")
            .attr("class", "filaMensagem")
            .attr("style", "fill:#7B7B7B")
            .attr("stroke", "#000")
            .attr("x", x0 + 96)
            .attr("y", y0)
            .attr("width", 25)
            .attr("height", ty + ty + 0.2);
        idProcess++;
    }
    // mensagem //
    multicast.append("rect")
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
    multicast.append("text")
        .attr("x", x0 - 82)
        .attr("y", y0 + 18)
        .text("P0" + "   -11")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")
        .attr("fill", "#000000");
    multicast.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 10)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    multicast.append("line")
        .attr("x1", x0)
        .attr("y1", y0 + 30)
        .attr("x2", x0 - 128)
        .attr("y2", y0 + 30)
        .attr("stroke", "#000")
        .attr("stroke-width", 3)
        .attr("marker-start", "url(#arrow)");
}
window.onload = drawInit3();

var maekawa = d3.select("#canvasMA")
    .append("svg")
    .attr("width", 650)
    .attr("height", 300)
function drawInit4() {
    y0 = 20;
    x0 = 30;
    let clock;
    idProcess = 0;
    for (let i = 0; i < 2; i++) {
        if (i < 2) {
            y0 = y0 + i * 160;
        }
        else {
            y0 = y0 + 160;
        }
        x0 = 20;
        clock = i;
        for (let j = 0; j < 3; j++) {
            clock += 2 + 2 * j;
            if (j < 2) {
                x0 = x0 + j * 250;
            }
            else {
                x0 = x0 + 250;
            }

            maekawa.append("rect")
                .attr("class", "legenda" + idProcess)
                .attr("style", "fill:#fff")
                .attr("stroke", "#000")
                .attr("x", x0)
                .attr("y", y0)
                .attr("width", tx + 24)
                .attr("height", ty + ty + 0.2);

            maekawa.append("rect")
                .attr("style", "fill:pink")
                .attr("class", "blocoNome")
                .attr("x", x0)
                .attr("y", y0)
                .attr("width", tx)
                .attr("height", ty)
                .attr("stroke", "#000");
            maekawa.append("text")
                .attr("x", x0 + 30)
                .attr("y", y0 + 22)
                .text("P" + idProcess)
                .attr("font-family", "sans-serif")
                .attr("font-size", "17px")
                .attr("fill", "#000");
            maekawa.append("text")
                .attr("x", x0 + 50)
                .attr("y", y0 + 22)
                .text("[" + clock + "]")
                .attr("font-family", "sans-serif")
                .attr("font-size", "17px")
                .attr("fill", "#000");

            maekawa.append("rect")
                .attr("style", "fill:#2892D7")
                .attr("class", "blocoMensagem")
                .attr("x", x0)
                .attr("y", y0 + 30.2)
                .attr("width", tx)
                .attr("height", ty)
                .attr("stroke", "#000");
            if (idProcess == 4) {
                maekawa.append("text")
                    .attr("x", x0 + 2)
                    .attr("y", y0 + 52)
                    .text(messageData[1])
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "17px")
                    .attr("fill", "#000000");
            }
            else {
                maekawa.append("text")
                    .attr("x", x0 + 2)
                    .attr("y", y0 + 52)
                    .text(messageData[0])
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "17px")
                    .attr("fill", "#000000");
            }

            maekawa.append("rect")
                .attr("style", "fill:#7B7B7B")
                .attr("class", "filaMensagem")
                .attr("stroke", "#000")
                .attr("x", x0 + 96)
                .attr("y", y0)
                .attr("width", 25)
                .attr("height", ty + ty + 0.2);

            idProcess++;
        }
        x0 = 0;
    }
    x0 = 270;
    maekawa.append("rect")
        .attr("x", 520 - 75)
        .attr("y", y0 - 40)
        .attr("class", "teste")
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", 54)
        .attr("height", 22)
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("fill", "#6EB960");
    maekawa.append("text")
        .attr("x", 520 - 72)
        .attr("y", y0 - 24)
        .text("P4" + "   -7")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")
        .attr("fill", "#000000");
    maekawa.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 10)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    maekawa.append("line")
        .attr("x1", 520)
        .attr("y1", 10 + 2 * ty)
        .attr("x2", x0 + tx + 25)
        .attr("y2", y0)
        .attr("stroke", "#000")
        .attr("stroke-width", 3)
        .attr("marker-start", "url(#arrow)");

    maekawa.append("rect")
        .attr("x", 20 + tx + 25)
        .attr("y", y0 - 50)
        .attr("class", "teste")
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", 54)
        .attr("height", 22)
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("fill", "#6EB960");
    maekawa.append("text")
        .attr("x", 20 + tx + 28)
        .attr("y", y0 - 34)
        .text("P4" + "   -7")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")
        .attr("fill", "#000000");
    maekawa.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 10)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    maekawa.append("line")
        .attr("x1", 20 + tx + 25)
        .attr("y1", 10 + 2 * ty)
        .attr("x2", x0)
        .attr("y2", y0)
        .attr("stroke", "#000")
        .attr("stroke-width", 3)
        .attr("marker-start", "url(#arrow)");
}
window.onload = drawInit4();