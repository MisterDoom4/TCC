// primeiro desenho //
var servidorCentral = d3.select("#scsvg")
    .append("svg")
    .attr("width", 500)
    .attr("height", 200);
var i, radio = 15, distx, distx2, n1 = 3, partic = 0, x0, y0, x1, y1;
var part;
var nodesFirst = [], fila = [];
var color = "#E0FF33", line = "RoyalBlue";
var serverColor = "#2892D7";
var lineC = "#454545", colorC = "#ffffff", colorToken = "#FF0000";
var choose = 0;
var chooseInit = 1, rand;
//primeiro desenho //
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
        .attr("cx", nodesFirst[chooseInit].x)
        .attr("cy", nodesFirst[chooseInit].y)
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
        .attr("fill", serverColor);
    // fila de processos //
    servidorCentral.append("rect")
        .attr("x", 180)
        .attr("y", 180)
        .attr("width", 130)
        .attr("height", 18)
        .attr("stroke", lineC)
        .attr("stroke-width", 1)
        .attr("fill", "transparent");
}
// trocar a cor do token //
function showToken() {
    d3.select("#scsvg").selectAll(".token")
        .transition()
        .duration(2000)
        .attr("fill", colorToken);
}
// voltar a cor do token//
function unshowToken() {
    d3.select("#scsvg").selectAll(".token")
        .transition()
        .duration(2000)
        .attr("fill", colorC);
}
// bloquear o botão para não ter bugs //
function bloquearAvancar() {
    d3.select("#buttonsR2").selectAll("#avancar")
        .attr("onclick", "");

}
// avancar para o destino //
function avancarAlg() {

    bloquearAvancar();

    if (fila.length != 0) {
        // quando ele esta em um processo, para ele ir pra o servidor central //
        if (choose != 1) {
            d3.select("#scsvg").selectAll(".token")
                .transition()
                .duration(3500)
                .attr("cx", x0)
                .attr("cy", y0);
            choose = 1;
            setTimeout(function () {
                d3.select("#buttonsR2").selectAll("#avancar")
                    .attr("onclick", "avancarAlg()");
            }, 3500);
        }
        else {
            d3.select("#scsvg").selectAll(".token")
                .transition()
                .duration(3500)
                .attr("cx", fila[0].x)
                .attr("cy", fila[0].y);
            setTimeout(function () {
                d3.select("#buttonsR2").selectAll("#avancar")
                    .attr("onclick", "avancarAlg()");
            }, 3500);
            chooseInit = fila[0].id;
            fila.shift();
            filaProcessos();
            choose = 0;
        }
    }
    else {
        alert("Nenhum processo está solicitando entrar na seção critica");
    }
}

// função para resetar o desenho quando mudar o slider //
function change() {
    d3.select("#scsvg").selectAll("circle").remove();
    d3.select("#scsvg").selectAll("text").remove();
    d3.select("#scsvg").selectAll("rect").remove();
    d3.select("#scsvg").selectAll("line").remove();
    d3.select("#scsvg").selectAll(".token").remove();
    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#combobox").selectAll("option").remove();
    d3.select("#combobox").selectAll("select").remove();
    chooseInit = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
    desenhoInit();
    criarComboBox();
    fila.splice(0, 10);
    criarFila();
    filaProcessos();
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "playAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Play");
}
function reset() {
    d3.select("#scsvg").selectAll("circle").remove();
    d3.select("#scsvg").selectAll("text").remove();
    d3.select("#scsvg").selectAll("rect").remove();
    d3.select("#scsvg").selectAll("line").remove();
    d3.select("#scsvg").selectAll(".token").remove();
    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#combobox").selectAll("option").remove();
    d3.select("#combobox").selectAll("select").remove();
    nodesFirst.splice(0, 10);
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "playAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Play");
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "reset()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset")
        .text("Reset");
    chooseInit = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
    desenhoInit();
    if (document.documentElement.scrollTop >= 1500) {

        criarComboBox();
        fila.splice(0, 10);
        criarFila();
        filaProcessos();
    }
    else {
        fila.splice(0, 10);
        criarFila();
        filaProcessos();
    }
}
// criação da fila aleatoria //
function criarFila() {
    for (i = 0; i < n1; i++) {
        if (i != chooseInit) {
            rand = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
            if (fila != null) {
            }
            while (rand == chooseInit || fila.find(element => element.id == rand)) {
                rand = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
            }
            fila.push(nodesFirst[rand]);
        }
    }
}
// fila customizada //
function criarCustomfila() {
    var optionFila = comboboxOptions.options[comboboxOptions.selectedIndex].value;
    if (optionFila == chooseInit) {
        alert("O processo que já está com o token não pode entrar na fila");
    }
    else {
        if (fila != null) {

            if (fila.find(element => element.id == optionFila)) {
                alert("O processo já está na fila");
            }
            else {
                fila.push(nodesFirst[optionFila]);
            }
        }
        else {
            alert("Erro na fila");
        }
        filaProcessos();
    }
}
// função para tirar um processo da fila //
function removerFila() {
    var optionFila = comboboxOptions.options[comboboxOptions.selectedIndex].value;
    var index;
    if (optionFila == chooseInit) {
        alert("O processo não está na fila");
    }
    else {
        if (fila.find(element => element.id == optionFila)) {
            index = fila.findIndex(function (i) {
                return i.id == optionFila;
            })
            fila.splice(index, 1);
            filaProcessos();
        }
    }
}
function apagarFila() {
    fila.splice(0, 10);
    filaProcessos();
}
// mudar o token de processo //
function addPToken() {
    var optionToken = comboboxOptions.options[comboboxOptions.selectedIndex].value;
    if (fila.find(element => element.id == optionToken)) {
        alert("O processo deve ser retirado da fila primeiro");
    }
    else {
        chooseInit = optionToken;
        d3.select("#scsvg").selectAll(".token")
            .attr("cx", nodesFirst[chooseInit].x)
            .attr("cy", nodesFirst[chooseInit].y);
    }
}
// pra começar o simulador //
function playAlg() {

    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#scsvg").selectAll(".token")
        .transition()
        .duration(3500)
        .attr("cx", x0)
        .attr("cy", y0);
    choose = 1;
    chooseInit = -1;

    d3.select("#buttonsR2").append("button")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "avancar")
        .text("Avançar");
    setTimeout(function () {
        d3.select("#buttonsR2").selectAll("#avancar")
            .attr("onclick", "avancarAlg()");
    }, 3500)

    d3.select("#buttonsR2").append("button")
        .attr("onclick", "reset()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset")
        .text("Reset");
}
// mostrar o nome dos processos //
function showPart() {
    for (i = 0; i < n1; i++) {
        servidorCentral.append("rect")
            .attr("x", nodesFirst[i].x - 8)
            .attr("y", nodesFirst[i].y + 7)
            .attr("class", "nome")
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);
        servidorCentral.append("text")
            .attr("x", nodesFirst[i].x - 8)
            .attr("y", nodesFirst[i].y + 17)
            .attr("class", "nome")
            .text("P" + i)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", lineC);
    }
}
// voltar para o estado inicial, sem os nomes dos processos //
function unshowPart() {

    d3.select("#scsvg").selectAll(".nome").remove();
}
// desenhar processo na fila //
function filaProcessos() {
    d3.select("#scsvg").selectAll(".filaprocesso").remove();
    for (i = 0; i < fila.length; i++) {
        distx2 = 182 + i * 18;
        servidorCentral.append("text")
            .attr("class", "filaprocesso")
            .attr("x", distx2)
            .attr("y", 192)
            .text("P" + fila[i].id)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", lineC);
    }
}
// função para utilizar o slide, para mudar o desenho //
var slider1 = document.getElementById("sliderNodePart");
slider1.oninput = function () {
    nodesFirst.splice(0, 10);
    n1 = this.value;
    change();
}
// inicialização da tela //
window.onload = function () {
    desenhoInit();
    criarFila(); 
    filaProcessos();
}
window.onscroll = function () { scrollFunction() };
const p = document.querySelector("#customIMG");
// detectar o ultimo desenho //
function estaVisivel(el) {
    const posicoes = el.getBoundingClientRect();
    const inicio = posicoes.top;
    const fim = posicoes.bottom;
    let estaVisivel = false

    if ((inicio >= 0) && (fim <= (window.innerHeight) - 300)) {
        estaVisivel = true;
    }
    return estaVisivel;
}
function scrollFunction() {
    var y = window.scrollY;
    console.log(y);
    
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
    // troca de desenho //
    if (estaVisivel(p) == true) {
        document.getElementById("buttons").style.display = "flex";
        d3.select("#combobox").selectAll("option").remove();
        d3.select("#combobox").selectAll("select").remove();
        criarComboBox();
    }
    else {
        document.getElementById("buttonsR2").style.display = "block";
        document.getElementById("buttons").style.display = "none";
    }
}
var comboboxOptions = document.getElementById("combobox");
function criarComboBox() {
    for (i = 0; i < n1; i++) {
        comboboxOptions.options[comboboxOptions.options.length] = new Option(nodesFirst[i].id, i);
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

