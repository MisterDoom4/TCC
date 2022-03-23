var first = d3.select("#anelsvg")
    .append("svg")
    .attr("width", 300)
    .attr("height", 300);

var i, radio = 15, angle, n1 = 5, partic = 0, x1, y1, x2, y2;
var part = 0;
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

        var newNode = { x: x1, y: y1, id: i, angle, part: partic, processoToken };
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
        first.append("text")
            .text("P" + i); first.append("rect")
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
}
function playAlg() {
    console.log("Passo:" + part);
    part++;
    if(nodesFirst[token].processoToken === -1){
        
            d3.select("#anelsvg").selectAll(".P" + token)
                .transition()
                .duration(500)
                .attr("fill", color);
                console.log("token atual: " + token); 
        
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
        .delay(250)
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
    setTimeout(callRandom(), 3000);
}
function pedirToken() {

}
function callRandom() {
    
    rand = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
    for (i = 0; i < rand; i++) {
            console.log("o token que está na função rand:" + token);
            rand = Math.floor(Math.random() * (Math.floor(n1) - Math.ceil(0))) + 0;
            if ( rand == token || nodesFirst[rand].processoToken == 0) {
                console.log("ja pediu:" + rand);
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
// function showPart(){
//     d3.select("#anelsvg").selectAll("circle").remove();
//     for(i=0;i<n1;i++){                
//         if(nodesFirst[i].part==1){
//             first.append("circle")
//                     .attr("cx", nodesFirst[i].x)
//                     .attr("cy", nodesFirst[i].y)
//                     .attr("r", radio)
//                     .attr("stroke", line)
//                     .attr("stroke-width", 1)
//                     .attr("fill", partColor)
//                     .append("text")
//                     .text("P"+i);

//         first.append("rect")
//                 .attr("x", nodesFirst[i].x-8)
//                 .attr("y", nodesFirst[i].y+6)
//                 .attr("width", 16)
//                 .attr("height", 15)
//                 .attr("stroke", lineC)
//                 .attr("stroke-width", 1)
//                 .attr("fill", colorC);

//         first.append("text")
//                 .attr("x", nodesFirst[i].x-6)
//                 .attr("y", nodesFirst[i].y+17)
//                 .text("P"+i)
//                 .attr("font-family", "sans-serif")
//                 .attr("font-size", "10px")
//                 .attr("fill", lineC);
//         }
//         else{
//             first.append("circle")
//                     .attr("cx", nodesFirst[i].x)
//                     .attr("cy", nodesFirst[i].y)
//                     .attr("r", radio)
//                     .attr("stroke", line)
//                     .attr("stroke-width", 1)
//                     .attr("fill", color)
//                     .append("text")
//                     .text("P"+i);
//         }
//     }
// }
window.onload = function () {
    desenhoinitPart();
    document.getElementById("buttonsR2").style.display = "block";
}