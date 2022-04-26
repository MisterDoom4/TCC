var maekawa = d3.select("#maekawasvg")
    .append("svg")
    .attr("width", 400)
    .attr("height", 250)
var x0 = 20, y0 = 10, tx = 97, ty = 30;
var idProcess;
var red = '#D60000';
var lineC = "#000";
var arrayNodes = [];
var electionGrups = [[0, 1], [0, 2], [1, 3], [2, 3]];
var messageData = ["RELEASED", "WANTED", "HELD"];
var clock = 0;
var ini = -1;
var operation = "SEND";
var group = -1;

function drawInit() {
    idProcess = 0;
    for (let i = 0; i < 2; i++) {
        y0 = y0 + i * 160;
        x0 = 20;
        for (let j = 0; j < 2; j++) {
            clockRandom();
            x0 = x0 + j * 250;
            // reta para identificar qual processo está no momento da execução 
            maekawa.append("rect")
                .attr("class", "posicao" + idProcess)
                .attr("style", "fill:#fff")
                .attr("stroke", "#000")
                .attr("x", x0)
                .attr("y", y0)
                .attr("width", tx + 24)
                .attr("height", ty + ty + 0.2);
            // bloco do nome do processo //
            maekawa.append("rect")
                .attr("style", "fill:pink")
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
            //relogio //
            maekawa.append("text")
                .attr("x", x0 + 50)
                .attr("y", y0 + 22)
                .attr("class", "P" + idProcess)
                .text("[" + clock + "]")
                .attr("font-family", "sans-serif")
                .attr("font-size", "17px")
                .attr("fill", "#000");
            // mensagem //
            maekawa.append("rect")
                .attr("style", "fill:#2892D7")
                .attr("x", x0)
                .attr("y", y0 + 30.2)
                .attr("width", tx)
                .attr("height", ty)
                .attr("stroke", "#000");
            maekawa.append("text")
                .attr("x", x0 + 2)
                .attr("y", y0 + 52)
                .attr("class", "M" + idProcess)
                .text(messageData[0])
                .attr("font-family", "sans-serif")
                .attr("font-size", "17px")
                .attr("fill", "#000000");
            // fila//
            maekawa.append("rect")
                .attr("style", "fill:#7B7B7B")
                .attr("stroke", "#000")
                .attr("x", x0 + 96)
                .attr("y", y0)
                .attr("width", 25)
                .attr("height", ty + ty + 0.2);

            var queue = [];
            var newNode = { id: idProcess, x: x0, y: y0, message: messageData[0], processQueue: queue, clock, vote: false, group};
            arrayNodes.push(newNode);
            idProcess++;
        }
        x0 = 0;
    }
}
// inicialização dos relogios aleatorios 
function clockRandom() {
    var count; // variavel de contagem dos processo que estão com relogios 
    if (clock != 0) { // relogio não pode ser zero
        do {
            rand = Math.floor(Math.random() * (Math.floor(30) - Math.ceil(0))) + 1;
            count = 0;
            for (let k = 0; k < idProcess; k++) {
                if (arrayNodes[k].clock == rand) {
                    count--;
                }
                else {
                    count++;
                }
            }
        } while (count != idProcess) // se ver for igual a p é porque todos os processos tem relogios diferentes
    }
    else {
        // primeiro processo a receber o relogio aleatório 
        rand = Math.floor(Math.random() * (Math.floor(30) - Math.ceil(0))) + 1;
    }
    clock = rand;
}
// colocar pelo menos 1 wanted nos processos 
function playRand() {
    reset();
    var chooseP;
    let countReleased = 0;
    for (let i = 0; i < 4; i++) {
        if (i == 0) {
            chooseP = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(0))) + 0;
            do {
                rand = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0))) + 0;
            } while (rand == 2)
            if (rand == 0) { // se rand for zero vai RELEASED // 
                arrayNodes[chooseP].message = messageData[0];
                countReleased++;
            }
            else {
                arrayNodes[chooseP].message = messageData[1];
                d3.select("#maekawasvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(arrayNodes[chooseP].message);
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
                arrayNodes[chooseP].message = messageData[0];
                d3.select("#maekawasvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(arrayNodes[chooseP].message);
                countReleased++;
            }
            else {
                arrayNodes[chooseP].message = messageData[1];
                d3.select("#maekawasvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(arrayNodes[chooseP].message);
            }
        }
    }
    if (countReleased == 4) {
        playRand();
    }
    ini = 0;
    operation = "SEND";
}
// função para escolher pelo menos 1 HELD //
function playRand2(e) {
    reset();
    var chooseP;
    let held = e;
    var chooseHeld; // variavel que escolhe processo está com HELD//
    let released = 0; // contagem de released, não pode ter 3 //
    for (let i = 0; i < 4; i++) {
        if (i == 0) {
            chooseHeld = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(0))) + 0;
            chooseP = chooseHeld;
            arrayNodes[chooseHeld].message = messageData[2];
            arrayNodes[chooseHeld].group = findGroup(arrayNodes[chooseHeld]);
            randVote(arrayNodes[chooseHeld]);
            d3.select("#maekawasvg").selectAll(".M" + chooseHeld)
                .transition()
                .delay(250)
                .duration(8000)
                .text(arrayNodes[chooseHeld].message);
            held++;
        }
        else {
            do {
                rand = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(0))) + 0;
            } while (chooseP == rand || chooseHeld == rand)
            chooseP = rand;
            do {
                rand = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0))) + 0;
            } while (rand == 2)
            if (rand == 0) {
                arrayNodes[chooseP].message = messageData[0];
                d3.select("#maekawasvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(arrayNodes[chooseP].message);
                released++;
            }
            else {
                arrayNodes[chooseP].message = messageData[1];
                d3.select("#maekawasvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(arrayNodes[chooseP].message);
            }
        }
    }
    if (released == 3 || held > 1) {
        playRand2();
    }
    ini = 0;
    operation = "SEND";
}
function randVote(process){
    for (let i = 0; i< electionGrups[process.group].length; i++) {
        let index = electionGrups[process.group][i];
        arrayNodes[index].vote = true;
    }
}

function reset() {
    ini = -1;
    d3.select("#maekawasvg").selectAll(".bloco").remove();
    d3.select("#maekawasvg").selectAll(".mensagem").remove();
    clock = 0; // para inicializar a função clockRandom()
    for (let i = 0; i < arrayNodes.length; i++) {
        d3.select("#maekawasvg").selectAll(".P" + i).remove();
        d3.select("#maekawasvg").selectAll(".M" + i).remove();
        d3.select("#maekawasvg").selectAll(".filaprocesso" + i).remove();
    }
    for (let i = 0; i < arrayNodes.length; i++) {
        clockRandom();
        arrayNodes[i].clock = clock;
        arrayNodes[i].message = messageData[0];
        arrayNodes[i].vote = false;
        arrayNodes[i].group = -1;
        arrayNodes[i].processQueue.splice(0, 10);
        maekawa.append("text")
            .attr("x", arrayNodes[i].x + 50)
            .attr("y", arrayNodes[i].y + 22)
            .attr("class", "P" + i)
            .text("[" + clock + "]")
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000");
        maekawa.append("text")
            .attr("x", arrayNodes[i].x + 2)
            .attr("y", arrayNodes[i].y + 52)
            .attr("class", "M" + i)
            .text(messageData[0])
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");

    }
}

function playAlg() {
    let group;
    if (ini == 4) {
        ini = 0;
    }
    d3.select("#maekawasvg").selectAll(".bloco").remove();
    d3.select("#maekawasvg").selectAll(".mensagem").remove();
    // primeiro apertar//
    if (ini == -1) {
        alert("Precisa escolher um cenario antes de avançar");
    }
    else {
       if(arrayNodes[ini].group == -1){
        arrayNodes[ini].group = findGroup(arrayNodes[ini]);
        console.log(arrayNodes[ini].group);
       }
        // TODO: mostrar(ini);
        if (operation == "RESP" && arrayNodes[ini].message == messageData[1]) {
            if (analyzeAccess(arrayNodes[ini]) == 1) {
                arrayNodes[ini].message = messageData[2];
                updateStatus(ini);
            }
            ini++;
            operation = "SEND";
        }
        else {
            if (operation == "SEND") {
                if (arrayNodes[ini].message == messageData[1]) {
                    groupBroadcast(arrayNodes[ini]);
                    operation = "RESP"; //var para controle de resposta
                }

                if (arrayNodes[ini].message == messageData[2]) {
                    sendLiberation(arrayNodes[ini]);
                    arrayNodes[ini].message = messageData[0];
                    updateStatus(ini);
                    unlockAccess(arrayNodes[ini]);
                }
                if (arrayNodes[ini].message == messageData[0]) {
                    ini++;
                }
            }
        }
    }
}

function findGroup(process) {
    for (let i = 0; i < electionGrups.length; i++) {
        for (let j = 0; j < electionGrups[i].length; j++) {
            if (process.id == electionGrups[i][j]) {
                return i;
            }
        }
    }
}
//passa por todos os Node de Group verificando quantos votos ele ganha
function analyzeAccess(requesterProcess) {
    let kVotes = 0;
    electionGrups[requesterProcess.group].forEach(process => {
        let voterIDProcess = process;
        if (process != requesterProcess.id) {
            if (arrayNodes[voterIDProcess].message === messageData[0] && arrayNodes[voterIDProcess].vote === false) {
                kVotes++;
                arrayNodes[voterIDProcess].vote = true;
                drawMessage(arrayNodes[voterIDProcess],requesterProcess);
            } else {
                if (voterIDProcess.message === messageData[2]) {
                    if (arrayNodes[voterIDProcess].processQueue.find(element => element == requesterProcess.id) == undefined) {
                        arrayNodes[voterIDProcess].processQueue.push(requesterProcess.id);
                        drawQueue(arrayNodes[voterIDProcess]);
                    }

                } else {
                    if (arrayNodes[voterIDProcess].message == messageData[1] && arrayNodes[voterIDProcess].vote === false) {
                        if (arrayNodes[voterIDProcess].clock > requesterProcess.clock) {
                            kVotes++;
                            arrayNodes[voterIDProcess].vote = true;
                            drawMessage(arrayNodes[voterIDProcess],requesterProcess);
                            if (arrayNodes[voterIDProcess].processQueue.find(element => element == requesterProcess.id) == undefined) {
                                requesterProcess.processQueue.push(arrayNodes[voterIDProcess].id);
                                drawQueue(requesterProcess);
                            }
                        }
                    }
                    else {
                        if (arrayNodes[voterIDProcess].processQueue.find(element => element == requesterProcess.id) == undefined) {
                            arrayNodes[voterIDProcess].processQueue.push(requesterProcess.id);
                            drawQueue(arrayNodes[voterIDProcess]);
                        }
                    }
                }
            }
        }
    })
    return kVotes;
}
//desenho da seta P2P
function drawMessage(process1, process2) {
    d3.select("#maekawasvg").selectAll(".bloco").remove();
    if (process1.id == 0 && process2.id == 1 || (process1.id == 2 && process2.id == 3)) {
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", process2.x)
            .attr("y1", process2.y + 30)
            .attr("x2", process1.x + tx + 25)
            .attr("y2", process1.y + 30)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (process1.id == 0 && process2.id == 2 || (process1.id == 1 && process2.id == 3)) {
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", process2.x + (tx / 2))
            .attr("y1", process2.y)
            .attr("x2", process1.x + (tx / 2))
            .attr("y2", process1.y + 2 * ty)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (process1.id == 0 && process2.id == 3) {
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", process2.x)
            .attr("y1", process2.y)
            .attr("x2", process1.x + tx + 25)
            .attr("y2", process1.y + 2 * ty)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (process1.id == 1 && process2.id == 0 || (process1.id == 3 && process2.id == 2)) {
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", process2.x + tx + 25)
            .attr("y1", process2.y + 30)
            .attr("x2", process1.x)
            .attr("y2", process1.y + 30)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (process1.id == 1 && process2.id == 2) {
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", process2.x + tx + 25)
            .attr("y1", process2.y)
            .attr("x2", process1.x)
            .attr("y2", process1.y + 2 * ty)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (process1.id == 2 && process2.id == 0 || (process1.id == 3 && process2.id == 1)) {
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", process2.x + (tx / 2))
            .attr("y1", process2.y + 2 * ty)
            .attr("x2", process1.x + (tx / 2))
            .attr("y2", process1.y)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (process1.id == 2 && process2.id == 1) {
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", process2.x)
            .attr("y1", process2.y + 2 * ty)
            .attr("x2", process1.x + tx + 25)
            .attr("y2", process1.y)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (process1.id == 3 && process2.id == 0) {
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", process2.x + tx + 25)
            .attr("y1", process2.y + 2 * ty)
            .attr("x2", process1.x)
            .attr("y2", process1.y)
            .attr("class", "mensagem")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
}

function drawQueue(process) {
    d3.select("#maekawasvg").selectAll(".filaprocesso" + process.id).remove();
    var disty = process.y + 2 * ty;
    for (let i = 0; i < process.processQueue.length; i++) {
        disty -= 1.2 + 20;
        maekawa.append("rect")
            .attr("class", "filaprocesso" + process.id)
            .attr("style", "fill:white")
            .attr("x", process.x + tx + 1)
            .attr("y", disty + 4)
            .attr("width", 20)
            .attr("height", 18)
            .attr("stroke", "#000");
        maekawa.append("text")
            .attr("class", "filaprocesso" + process.id)
            .attr("x", process.x + tx + 2)
            .attr("y", disty + 16)
            .text("P" + process.processQueue[i])
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", lineC);
    }
}

function updateStatus(idProcess) {
    d3.select("#maekawasvg").selectAll(".M" + idProcess)
        .transition()
        .delay(1000)
        .text(arrayNodes[idProcess].message);
}

function groupBroadcast(requesterProcess) {
    let group = requesterProcess.group;
    if (requesterProcess.id == 0 && group == 0) {
        maekawa.append("rect")
            .attr("x", requesterProcess.x + tx + 50)
            .attr("y", requesterProcess.y)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        maekawa.append("text")
            .attr("x", requesterProcess.x + tx + 55)
            .attr("y", requesterProcess.y + 16)
            .attr("class", "bloco")
            .text("P" + requesterProcess.id + "-" + requesterProcess.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", arrayNodes[1].x)
            .attr("y1", arrayNodes[1].y + 30)
            .attr("x2", requesterProcess.x + tx + 25)
            .attr("y2", requesterProcess.y + 30)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (requesterProcess.id == 0 && group == 1) {
        maekawa.append("rect")
            .attr("x", requesterProcess.x + (tx / 2) + 5)
            .attr("y", arrayNodes[2].y - 60)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        maekawa.append("text")
            .attr("x", requesterProcess.x + (tx / 2) + 10)
            .attr("y", arrayNodes[2].y - 44)
            .attr("class", "bloco")
            .text("P" + requesterProcess.id + "-" + requesterProcess.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", arrayNodes[2].x + (tx / 2))
            .attr("y1", arrayNodes[2].y)
            .attr("x2", requesterProcess.x + (tx / 2))
            .attr("y2", requesterProcess.y + 2 * ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (requesterProcess.id == 1 && group == 0) {
        maekawa.append("rect")
            .attr("x", arrayNodes[0].x + tx + 55)
            .attr("y", requesterProcess.y)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        maekawa.append("text")
            .attr("x", arrayNodes[0].x + tx + 60)
            .attr("y", requesterProcess.y + 16)
            .attr("class", "bloco")
            .text("P" + requesterProcess.id + "-" + requesterProcess.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", arrayNodes[0].x + tx + 25)
            .attr("y1", arrayNodes[0].y + 30)
            .attr("x2", requesterProcess.x)
            .attr("y2", requesterProcess.y + 30)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (requesterProcess.id == 1 && group == 2) {
        maekawa.append("rect")
            .attr("x", requesterProcess.x + (tx / 2) + 5)
            .attr("y", arrayNodes[3].y - 73)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        maekawa.append("text")
            .attr("x", requesterProcess.x + (tx / 2) + 10)
            .attr("y", arrayNodes[3].y - 57)
            .attr("class", "bloco")
            .text("P" + requesterProcess.id + "-" + requesterProcess.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", arrayNodes[3].x + (tx / 2))
            .attr("y1", arrayNodes[3].y)
            .attr("x2", requesterProcess.x + (tx / 2))
            .attr("y2", requesterProcess.y + 2 * ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (requesterProcess.id == 2 && group == 1) {
        maekawa.append("rect")
            .attr("x", requesterProcess.x + (tx / 2) + 5)
            .attr("y", requesterProcess.y - 73)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        maekawa.append("text")
            .attr("x", requesterProcess.x + (tx / 2) + 10)
            .attr("y", requesterProcess.y - 57)
            .attr("class", "bloco")
            .text("P" + requesterProcess.id + "-" + requesterProcess.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", arrayNodes[0].x + (tx / 2))
            .attr("y1", arrayNodes[0].y + 2 * ty)
            .attr("x2", requesterProcess.x + (tx / 2))
            .attr("y2", requesterProcess.y)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (requesterProcess.id == 2 && group == 3) {
        maekawa.append("rect")
            .attr("x", requesterProcess.x + tx + 55)
            .attr("y", requesterProcess.y)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        maekawa.append("text")
            .attr("x", requesterProcess.x + tx + 60)
            .attr("y", requesterProcess.y + 16)
            .attr("class", "bloco")
            .text("P" + requesterProcess.id + "-" + requesterProcess.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", arrayNodes[3].x)
            .attr("y1", arrayNodes[3].y + ty)
            .attr("x2", requesterProcess.x + tx + 25)
            .attr("y2", requesterProcess.y + ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (requesterProcess.id == 3 && group == 2) {
        maekawa.append("rect")
            .attr("x", arrayNodes[1].x + (tx / 2) + 5)
            .attr("y", arrayNodes[0].y + 100)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        maekawa.append("text")
            .attr("x", arrayNodes[1].x + (tx / 2) + 10)
            .attr("y", arrayNodes[0].y + 116)
            .attr("class", "bloco")
            .text("P" + requesterProcess.id + "-" + requesterProcess.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", arrayNodes[1].x + (tx / 2))
            .attr("y1", arrayNodes[1].y + 2 * ty)
            .attr("x2", requesterProcess.x + (tx / 2))
            .attr("y2", requesterProcess.y)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
    if (requesterProcess.id == 3 && group == 3) {
        maekawa.append("rect")
            .attr("x", arrayNodes[2].x + tx + 60)
            .attr("y", arrayNodes[2].y)
            .attr("class", "bloco")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 54)
            .attr("height", 22)
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", "#6EB960");
        maekawa.append("text")
            .attr("x", arrayNodes[2].x + tx + 65)
            .attr("y", arrayNodes[2].y + 16)
            .attr("class", "bloco")
            .text("P" + requesterProcess.id + "-" + requesterProcess.clock)
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "#000000");
        maekawa.append("defs").append("marker")
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
        maekawa.append("line")
            .attr("x1", arrayNodes[2].x + tx + 25)
            .attr("y1", arrayNodes[2].y + ty)
            .attr("x2", requesterProcess.x)
            .attr("y2", requesterProcess.y + ty)
            .attr("class", "bloco")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("marker-start", "url(#arrow)");
    }
}

//broadcast para o grupo que ele recebeu voto 
function sendLiberation(process) {
    for (let i = 0; i< electionGrups[process.group].length; i++) {
        let index = electionGrups[process.group][i];
        drawMessage(process,arrayNodes[index]);
    }
}

function unlockAccess(process){
    let index = 0
    while (process.processQueue[index] != null) {
        //chama verificação daquele processo para verificar se ele pode acessar a sessão crítica
        if (reviewAccess(arrayNodes[process.processQueue[index]]) === 1) {

            arrayNodes[process.processQueue[index]].message = messageData[2];
            updateStatus(process.processQueue[index]);
            //atualizar desenho do status
        }
        process.processQueue.splice(0, 1);
        drawQueue(process);
    }
    resetVoteGroup(process);
}

function reviewAccess(requesterProcess) {
    var kVotes = 0;
    var group = requesterProcess.group;
    for (let i = 0; i < electionGrups[group].length; i++) {
        let index = electionGrups[group][i];
        if (requesterProcess.id == index) {
            i++;
            if (i == 2) {
                return kVotes;
            }
        }
        index = electionGrups[group][i];
        if (arrayNodes[index].message === messageData[0]) {
            kVotes++;
        } else {
            if (arrayNodes[index].message === messageData[1]) {
                if (arrayNodes[index].clock > requesterProcess.clock) {
                    kVotes++;
                }
            }
        }
    }
    return kVotes;
}
//reseta os votos do grupo de um processo que sai de HELD
function resetVoteGroup(process) {
    for (let i = 0; i< electionGrups[process.group].length; i++) {
        let index = electionGrups[process.group][i];
        arrayNodes[index].vote = false;
    }
}
// quando o usuário cliclar volta para o topo
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onload = function () {
    drawInit();
    document.getElementById("buttonsR2").style.display = "block";
    // TODO: drawExample();
}
