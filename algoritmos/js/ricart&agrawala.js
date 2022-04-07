var multicast = d3.select("#multicastsvg")
    .append("svg")
    .attr("width", 540)
    .attr("height", 300)
var x0 = 0, y0 = 0, tx = 97, ty = 30;
var i, j, p, k;
var nodesFirst = [];
var nodesFirst2 = [];
var mess = "RELEASED";
var clock = 0;
var ini = 0;
var header = 0;
var operation = 'SEND';
function desenhoinitPart1() {
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
// colocar wanted nos processos //
function playRand() {
    var chooseP;
    for (i = 0; i < 4; i++) {
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
            }
            else {
                console.log("ola");
                nodesFirst[chooseP].message = "WANTED";
                d3.select("#multicastsvg").selectAll(".M" + chooseP)
                    .transition()
                    .delay(250)
                    .duration(8000)
                    .text(nodesFirst[chooseP].message);
            }
        }
    }


}
function checkMess(el) {
    let pediu = false
    if (nodesFirst[el].message == "WANTED") {
        pediu = true;
    }
    return pediu;
}

//desenho da seta P2P
function desenharMensagem(P1,P2) {
    //lógica do d3 para desenhar uma seta com o indentificador de processo, tendo como parametro o Processo origem e destino
}

//desenhar setas para todos os processos.
//Da para usar a função de desenharMensagem dentro para reuso de código
function broadcast(processoSolicitante) {
    
}

function heldBroadcast(processo) {
    for (let index = 0; index < processo.fila.length; index++) {
       //desenhar a mensagem partido de P (processo) para nodesFirst2[processo.fila[index].id]
        
        //COMO ACESSAR OS DADOS
       // processo.x;
        // processo.y;
        // nodesFirst2[processo.fila[index].id].x;
        // nodesFirst2[processo.fila[index].id].y;
    }
}

//função para desenhar o novo status de P, o header é um identificador de processo de 0 a 3. Processo que teve seu status alterado, mas n atualizado graficamente
function atualizarStatus(header) {

}

//FUNÇÃO PARA ATUALIZAR OS PROCESSOS COM AS MENSAGENS DE LIBERAÇÃO DO PROCESSO HELD
//acessa nodeFirst2 de acordo com o id da fila do processo HELD
function liberarAcesso(processo) {
    let index = 0
    while(processo.fila[index] != null) {
        //chama verificação daquele processo para verificar se ele pode acessar a sessão crítica
         if (revisarAcesso(nodesFirst2[processo.fila[index].id]) === 3) {
             nodesFirst2[processo.fila[index].id].status = 'HELD';
             
             //atualizar desenho do status
        }
    }
}

function revisarAcesso() {
    var acesso =  0;
    for (i = 0; i < nodesFirst2.length; i++){
		if (processoSolicitante.x == vetorProcesso[i].x && processoSolicitante.y == nodesFirst2[i].y){
			i++;
		}
        if (nodesFirst2[i].status === 'RELEASED') {
            acesso++;
        } else {
            if (nodesFirst2[i].status === 'WANTED') {
                acesso++;
            }
        }
    }
    //é preciso atualizar todo o desenho ao final do for, pois são bastante alterações
    return acesso;
}

//função para mandar mensagem para todos os processos
function analisarAcesso(processoSolicitante) {
    //respostas
    var acesso =  0;
    for (i = 0; i < nodesFirst2.length; i++){
		if (processoSolicitante.x == vetorProcesso[i].x && processoSolicitante.y == nodesFirst2[i].y){
			i++;
		}
        if (nodesFirst2[i].status === 'RELEASED') {
            acesso++;
            desenharMensagem(nodesFirst2[i], processoSolicitante);
        } else {
            if (nodesFirst2[i].status === 'HELD') {
                nodesFirst2[i].fila.push(processoSolicitante);
            } else {
                if (nodesFirst2[i].status === 'WANTED') {
                    if (nodesFirst2[i].relógio > processoSolicitante.relogio) {
                        acesso++;
                        desenharMensagem(nodesFirst2[i], processoSolicitante);
                    }
                    if (nodesFirst2[i].relógio < processoSolicitante.relogio) {
			  
                    }
                }
            }
        }
    }
    //é preciso atualizar todo o desenho ao final do for, pois são bastante alterações
    return acesso;
}

function playAlg() {
    //gerar um processo com o status WANTED


    //para teste vou setar o primeiro como WANTED
    if (operation === 'RESP' && nodesFirst2[header].status === 'WANTED') {
        if (analisarAcesso(nodesFirst2[header] === 3)) {
            nodesFirst2[header].status = 'HELD';
        }
        header++;
        operation = 'SEND'
    }
    if (operation === 'SEND') {
        if (nodesFirst2[header].status === 'WANTED') {
            broadcast(nodesFirst2[header]);
            operation = 'RESP'; //var para controle de resposta
        }
        if (nodesFirst2[header].status === 'RELEASED') {
            header++;
        }
        if (nodesFirst2[header].status === 'HELD') {
            heldBroadcast(nodesFirst2[header]); //acho q tem q colocar timeout aqui também

            nodesFirst2[header].status = 'RELEASED'
            // função para mudar status do desenho depois de 1s;
            setTimeout(atualizarStatus(header), 1500);
            
            revisarAcesso(nodesFirst2[header]); //no caso de alguma interação entrar no held, pode ter mudanças significativas no programa, é prioridade atualiza-las
        }
    }
    
    
    if (header === 4) {
        header = 0;    
    }
    

    // ignore esse de baixo //
    // for (i = 0; i < process.length; i++) {
    //     origem = nodesFirst[i].clock;
    //     if (i == 0) {
    //         maior = nodesFirst[i].clock;
    //     }
    //     else {
    //         if (origem > maior) {
    //             maior = origem;
    //             destino = process[i];
    //         }
    //     }
    //
    // teste.append("rect")
    //     .attr("x", x0 - 85)
    //     .attr("y", y0 + 2)
    //     .attr("class", "seta")
    //     .attr("rx", 10)
    //     .attr("ry", 10)
    //     .attr("width", 54)
    //     .attr("height", 22)
    //     .attr("stroke", "#000")
    //     .attr("stroke-width", 1)
    //     .attr("fill", "#6EB960");
    // teste.append("text")
    //     .attr("x", x0 - 82)
    //     .attr("y", y0 + 18)
    //     .attr("class", "seta")
    //     .text("P0" + "   -11")
    //     .attr("font-family", "sans-serif")
    //     .attr("font-size", "17px")
    //     .attr("fill", "#000000");
    // teste.append("defs").append("marker")
    //     .attr("id", "arrow")
    //     .attr("viewBox", "0 -5 10 10")
    //     .attr("class", "seta")
    //     .attr("refX", 8)
    //     .attr("refY", 0)
    //     .attr("markerWidth", 5)
    //     .attr("markerHeight", 10)
    //     .attr("orient", "auto-start-reverse")
    //     .append("path")
    //     .attr("d", "M0,-5L10,0L0,5");
    // teste.append("line")
    //     .attr("x1", x0)
    //     .attr("y1", y0 + 30)
    //     .attr("x2", x0 - 128)
    //     .attr("y2", y0 + 30)
    //     .attr("class", "seta")
    //     .attr("stroke", "#000")
    //     .attr("stroke-width", 3)
    //     .attr("marker-start", "url(#arrow)");
    // }

    // nodesFirst[0].filaProcesso.push(1);
    // nodesFirst[1].filaProcesso.push(2);

}


window.onload = function () {
    desenhoinitPart1();
    document.getElementById("buttonsR2").style.display = "block";
    desenhoinitPart2();
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

//desenha a estrutura inicial da simulação do algoritmo na sessão de algoritmo 2
//Todos os processos devem ter identificador P[i] e relógio lógicos diferentes e > 0. Todos os estados são
//inicialmente RELEASED     
function desenhoinitPart2() {

    var x1, y1, mensagem = 'RELEASED', relLogico = 0;
    
    for (i = 0; i < 4; i++) {
        
       
        var newNode = {
            x: x1,
            y: y1,
            id: i + 1,
            status: mensagem,
            relogico: relLogico,
            fila: []
        };
        nodesFirst2.push(newNode);
    }
    
    console.log(nodesFirst2);

    y0 = 0;
    x0 = 0;
    p = 0;
    //desenha os 4 processos, usando o for para definir o layout da linha dos processos
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
