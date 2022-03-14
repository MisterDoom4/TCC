// primeiro desenho //
var servidorCentral = d3.select("#firstsvg")
    .append("svg")
    .attr("width", 500)
    .attr("height", 200);
var i, radio = 15, distx, disty, n1 = 3, partic = 0, x0, y0, x1, y1;
var part;
var nodesFirst = [], fila = [];
var color = "#E0FF33", line = "RoyalBlue";
var serverColor = "#2892D7";
var lineC = "#454545", colorC = "#ffffff", colorToken = "#FF0000";
var choose = 0;
var chooseInit = 1, rand;
//primeiro desenho //
function desenhoInit0() {
    chooseInit = 1;
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
    // fila de processos //
    servidorCentral.append("rect")
        .attr("style", "fill:darkblue")
        .attr("x", x0 - 200)
        .attr("y", y0 + 5)
        .attr("rx", 15)
        .attr("ry", 15)
        .attr("width", 30)
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
    // fila de processos //
    servidorCentral.append("rect")
        .attr("style", "fill:darkblue")
        .attr("x", x0 - 200)
        .attr("y", y0 + 5)
        .attr("rx", 15)
        .attr("ry", 15)
        .attr("width", 30)
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
// trocar a cor do token //
function showToken() {
    d3.select("#firstsvg").selectAll(".token")
        .transition()
        .duration(2000)
        .attr("fill", colorToken);
}
// voltar a cor do token//
function unshowToken() {
    d3.select("#firstsvg").selectAll(".token")
        .transition()
        .duration(2000)
        .attr("fill", colorC);
}
// avancar para o destino //
function avancarAlg() {
    if (fila.length != 0) {
        if (choose != 1) {
            d3.select("#firstsvg").selectAll(".token")
                .transition()
                .duration(5000)
                .attr("cx", x0)
                .attr("cy", y0);
            choose = 1;;
        }
        else {
            d3.select("#firstsvg").selectAll(".token")
                .transition()
                .duration(5000)
                .attr("cx", fila[0].x)
                .attr("cy", fila[0].y);
            fila.shift();
            filaProcessos();
            choose = 0;
        }
    }
    else {
        alert("Nenhum processo está solicitando entrar na seção critica");
    }


}
function restart() {
    d3.select("#firstsvg").selectAll("circle").remove();
    d3.select("#firstsvg").selectAll("text").remove();
    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("line").remove();
    d3.select("#firstsvg").selectAll(".token").remove();
    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "playAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Play");
    document.getElementById("buttonsR2").style.display = "block";
    desenhoInit();
    filaProcessos();
}
function reset() {

    d3.select("#firstsvg").selectAll("circle").remove();
    d3.select("#firstsvg").selectAll("text").remove();
    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("line").remove();
    d3.select("#firstsvg").selectAll(".token").remove();
    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#combobox").selectAll("option").remove();
    d3.select("#combobox").selectAll("select").remove();
    if (document.documentElement.scrollTop <= 100) {
        desenhoInit0();
    }
    else {
        d3.select("#buttonsR2").append("button")
            .attr("onclick", "playAlg()")
            .attr("class", "btn btn-rounded btn-light btn-sm")
            .text("Play");
        d3.select("#buttonsR2").append("button")
            .attr("onclick", "restart()")
            .attr("class", "btn btn-rounded btn-light btn-sm")
            .attr("id", "restart")
            .text("Restart");
        d3.select("#buttonsR2").append("button")
            .attr("onclick", "reset()")
            .attr("class", "btn btn-rounded btn-light btn-sm")
            .attr("id", "reset")
            .text("Reset");
        chooseInit = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
        desenhoInit();
        criarComboBox();
        fila.splice(0, 10);
        criarFila();

        filaProcessos();
    }
}
function criarFila() {
    var f;
    for (i = 0; i < n1; i++) {
        if (i != chooseInit) {
            rand = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
            if (fila != null) {
                f = fila.map(el => el.id);
            }
            while (rand == chooseInit || f.includes(rand)) {
                rand = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
            }
            fila.push(nodesFirst[rand]);
        }
    }


}
function playAlg() {

    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#firstsvg").selectAll(".token")
        .transition()
        .duration(5000)
        .attr("cx", x0)
        .attr("cy", y0);
    choose = 1;

    d3.select("#buttonsR2").append("button")
        .attr("onclick", "avancarAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "avancar")
        .text("Avançar");

    d3.select("#buttonsR2").append("button")
        .attr("onclick", "restart()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "restart")
        .text("Restart");
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
// desenhar processo na fila //
function filaProcessos() {
    d3.select("#firstsvg").selectAll(".filaprocesso").remove();
    for (i = 0; i < fila.length; i++) {
        disty = 70 - i * 17;
        servidorCentral.append("rect")
            .attr("class", "filaprocesso")
            .attr("x", 55)
            .attr("y", disty)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);
        servidorCentral.append("text")
            .attr("class", "filaprocesso")
            .attr("x", 55)
            .attr("y", disty + 12)
            .text("P" + fila[i].id)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", lineC);
    }


}
// voltar para o estado inicial, sem os nomes dos processos //
function unshowPart() {

    d3.select("#firstsvg").selectAll(".nome").remove();
}
// função para utilizar o slide, para mudar o desenho //
var slider1 = document.getElementById("sliderNodePart");
slider1.oninput = function () {
    nodesFirst.splice(0, 10);
    n1 = this.value;
    reset();
}
// inicialização da tela //
window.onload = desenhoInit();
window.onscroll = function () { scrollFunction() };

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
        d3.select("#firstsvg").selectAll(".token").remove();
        document.getElementById("buttonsR2").style.display = "none";
        fila.splice(0, 10);
        nodesFirst.splice(0, 10);
        desenhoInit0();
        criarFila();
    }
    if (document.documentElement.scrollTop > 800) {
        d3.select("#firstsvg").selectAll("circle").remove();
        d3.select("#firstsvg").selectAll("text").remove();
        d3.select("#firstsvg").selectAll("rect").remove();
        d3.select("#firstsvg").selectAll("line").remove();
        d3.select("#firstsvg").selectAll(".token").remove();
        document.getElementById("buttonsR2").style.display = "block";
        fila.splice(0, 10);
        nodesFirst.splice(0, 10);

        restart();
        d3.select("#restart").remove();
        d3.select("#buttonsR2").selectAll("button")
            .attr("onclick", "playAlg()")
            .attr("class", "btn btn-rounded btn-light btn-sm")
            .text("Play");
        desenhoInit();
        criarFila();
        filaProcessos();
        criarComboBox();

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

