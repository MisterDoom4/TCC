var first = d3.select("#anelsvg")
    .append("svg")
    .attr("width", 300)
    .attr("height", 300);

var i, radio = 15, angle, n1 = 3, partic = 0, x1, y1, x2, y2;
var nodesFirst = [];
var processoToken = -1;
var color = "#2892D7", line = "RoyalBlue";
var partColor = "#FF9F1C", nopartColor = "#009933";
var lineC = "#000000", colorC = "#ffffff";
var token = 0;
var rand;

function desenhoinitPart() {
    for (i = 0; i < n1; i++) {
        angle = 2 * Math.PI * i / n1;
        x1 = Math.cos(angle) * 103 + 130;
        y1 = Math.sin(angle) * 103 + 130;
        angle = angle + (Math.PI / 2);

        var newNode = { x: x1, y: y1, id: i, angle, processoToken };
        nodesFirst.push(newNode);

    }
    for (i = 0; i < n1; i++) {
        if (i === nodesFirst.length - 1) {
            var arc = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(nodesFirst[0].angle + (2 * Math.PI))
                .endAngle(nodesFirst[i].angle);
        }
        else {
            var arc = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(nodesFirst[i + 1].angle)
                .endAngle(nodesFirst[i].angle);
        }
        first.append("path")
            .attr("d", arc)
            .attr("transform", "translate(130, 130)");
    }
    for (i = 0; i < n1; i++) {
        first.append("circle")
            .attr("cx", nodesFirst[i].x)
            .attr("cy", nodesFirst[i].y)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", color)
            .attr("class", "P" + i);
        first.append("rect")
            .attr("x", nodesFirst[i].x - 8)
            .attr("y", nodesFirst[i].y + 6)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);
        first.append("text")
            .attr("x", nodesFirst[i].x - 6)
            .attr("y", nodesFirst[i].y + 17)
            .text("P" + i)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    }
    first.append("circle")
        .attr("class", "token0")
        .attr("cx", nodesFirst[0].x)
        .attr("cy", nodesFirst[0].y)
        .attr('r', 5)
        .attr('fill', colorC)
        .attr("stroke", lineC);
}
function playAlg() {
    d3.select("#anelsvg").selectAll(".token0").remove();
    if (nodesFirst[token].processoToken === -1) {

        d3.select("#anelsvg").selectAll(".P" + token)
            .transition()
            .duration(500)
            .attr("fill", color);
    }
    if (token === nodesFirst.length - 1) {
        var dataArc = [
            { startAngle: nodesFirst[token].angle, endAngle: nodesFirst[0].angle + (2 * Math.PI) },
        ];
        token = 0;
    }
    else {
        var dataArc = [
            { startAngle: nodesFirst[token].angle, endAngle: nodesFirst[token + 1].angle },
        ];
        token++;
    }

    var arc = d3.arc().outerRadius(103.5).innerRadius(103.5);

    var path = first.append("g")
        .selectAll("path.arc")
        .data(dataArc);

    path.enter()
        .append('circle')
        .attr("transform", `translate(${nodesFirst[0].x - 103},${nodesFirst[0].y})`)
        .attr('opacity', 0)
        .attr("class", "token")
        .attr('r', 5)
        .attr('fill', colorC)
        .attr("stroke", lineC)
        .transition()
        .delay(0)
        .duration(3000)
        .attrTween("pathTween", function (d) {
            const startAngle = d.startAngle;
            const endAngle = d.endAngle;
            const start = { startAngle, endAngle: startAngle } // <-A
            const end = { startAngle: endAngle, endAngle }
            const interpolate = d3.interpolate(start, end); // <-B
            const circ = d3.select(".token") // Select the circle
            return function (t) {
                const cent = arc.centroid(interpolate(t)); // <-C         
                //return cent[0]
                circ
                    .attr('opacity', 1)
                    .attr("cx", cent[0]) // Set the cx
                    .attr("cy", cent[1]) // set the cy
            };
        })
    if (nodesFirst[token].processoToken == 0) {
        setTimeout(function () {
            d3.select("#anelsvg").selectAll(".P" + token)
                .transition()
                .duration(1000)
                .attr("fill", partColor); // está usando a seção critica //
        }, 3000);
        nodesFirst[token].processoToken = -1;
    }
    if (estaVisivel(p) == false) {
        setTimeout(callRandom(), 3000);
    }
}
function pedirToken() {
    var optionToken = comboboxOptions.options[comboboxOptions.selectedIndex].value;
    if (optionToken == token) {
        alert("O processo que já está com o token não pode solicitar");
    }
    else {
        if (nodesFirst[optionToken].processoToken == 0) {
            alert("O processo já solicitou");
        }
        else {
            nodesFirst[optionToken].processoToken = 0;
            d3.select("#anelsvg").selectAll(".P" + optionToken)
                .transition()
                .delay(250)
                .duration(2000)
                .attr("fill", nopartColor);
        }
    }
}
function cancelarToken() {
    var optionToken = comboboxOptions.options[comboboxOptions.selectedIndex].value;
    if (optionToken == token) {
        alert("O processo que já está com o token não pode ser revogado o acesso");
    }
    else {
        if (nodesFirst[optionToken].processoToken == -1) {
            alert("Esse processo não solicitou ainda");
        }
        else {
            nodesFirst[optionToken].processoToken = -1;
            d3.select("#anelsvg").selectAll(".P" + optionToken)
                .transition()
                .delay(250)
                .duration(2000)
                .attr("fill", color);
        }
    }
}
function callRandom() {

    rand = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
    for (i = 0; i < rand; i++) {
        rand = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
        if (rand == token || nodesFirst[rand].processoToken == 0) {
        }
        else {
            nodesFirst[rand].processoToken = 0; // quer entrar na seção critica //

            d3.select("#anelsvg").selectAll(".P" + rand)
                .transition()
                .delay(250)
                .duration(2000)
                .attr("fill", nopartColor);
        }
    }
}
function reset() {
    d3.select("#anelsvg").selectAll("circle").remove();
    d3.select("#anelsvg").selectAll("text").remove();
    d3.select("#anelsvg").selectAll("rect").remove();
    d3.select("#anelsvg").selectAll("line").remove();
    d3.select("#anelsvg").selectAll(".token").remove();
}
var slider1 = document.getElementById("sliderNodePart");
slider1.oninput = function () {
    nodesFirst.splice(0, 10);
    n1 = this.value;
    reset();
    desenhoinitPart();
}
window.onload = function () {
    desenhoinitPart();
    document.getElementById("buttonsR2").style.display = "block";
    desenhoinitPart0();
}
window.onscroll = function () { scrollFunction() };
const p = document.querySelector("#customIMG");
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
    if (estaVisivel(p) == true) {
        document.getElementById("buttons").style.display = "flex";
        d3.select("#combobox").selectAll("option").remove();
        d3.select("#combobox").selectAll("select").remove();
        criarComboBox();
    }
    else {
        document.getElementById("buttons").style.display = "none";
    }
}
var comboboxOptions = document.getElementById("combobox");
function criarComboBox() {
    for (i = 0; i < n1; i++) {
        comboboxOptions.options[comboboxOptions.options.length] = new Option(nodesFirst[i].id, i);
    }
}
var teste = d3.select("#firstsvg")
    .append("svg")
    .attr("width", 500)
    .attr("height", 300);
var i0, x01, y01;
var colorToken = "#4B0082", colorProcesso = "#e13138"
var nodesZero = [];
function desenhoinitPart0() {
    for (i0 = 0; i0 < 3; i0++) {
        angle = 2 * Math.PI * i0 / 3;
        x01 = Math.cos(angle) * 103 + 130;
        y01 = Math.sin(angle) * 103 + 130;
        angle = angle + (Math.PI / 2);

        var newNode = { x: x01, y: y01, id: i0, angle };
        nodesZero.push(newNode);

    }
    for (i0 = 0; i0 < 3; i0++) {
        if (i0 === nodesZero.length - 1) {
            var arc = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(nodesZero[0].angle + (2 * Math.PI))
                .endAngle(nodesZero[i0].angle);
        }
        else {
            var arc = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(nodesZero[i0 + 1].angle)
                .endAngle(nodesZero[i0].angle);
        }
        teste.append("path")
            .attr("d", arc)
            .attr("transform", "translate(130, 130)");
    }
    for (i0 = 0; i0 < 3; i0++) {
        teste.append("circle")
            .attr("cx", nodesZero[i0].x)
            .attr("cy", nodesZero[i0].y)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", color)
        teste.append("rect")
            .attr("x", nodesZero[i0].x - 8)
            .attr("y", nodesZero[i0].y + 6)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);

        teste.append("text")
            .attr("x", nodesZero[i0].x - 6)
            .attr("y", nodesZero[i0].y + 17)
            .text("P" + i0)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    }
    teste.append("circle")
        .attr("cx", nodesZero[0].x)
        .attr("cy", nodesZero[0].y)
        .attr('r', 5)
        .attr('fill', colorC)
        .attr("stroke", lineC);
}
var normal = d3.select("#normal")
    .append("svg")
    .attr("width", 49)
    .attr("height", 30);
var pedindo = d3.select("#pedindo")
    .append("svg")
    .attr("width", 39)
    .attr("height", 30);
var usando = d3.select("#usando")
    .append("svg")
    .attr("width", 21)
    .attr("height", 30);
normal.append("circle")
    .attr("cx", 37)
    .attr("cy", 22.5)
    .attr("r", 7)
    .attr("stroke", line)
    .attr("stroke-width", 1)
    .attr("fill", color)
pedindo.append("circle")
    .attr("cx", 27)
    .attr("cy", 22.5)
    .attr("r", 7)
    .attr("stroke", line)
    .attr("stroke-width", 1)
    .attr("fill", nopartColor)
usando.append("circle")
    .attr("cx", 10)
    .attr("cy", 22.5)
    .attr("r", 7)
    .attr("stroke", line)
    .attr("stroke-width", 1)
    .attr("fill", partColor)
