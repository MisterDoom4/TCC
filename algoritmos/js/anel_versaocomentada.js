//primeira imagem
var first = d3.select("#firstsvg")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);

var i, radio = 15, angle, n1 = 5, partic = 0, x1, y1;
var part;
var nodesFirst = [];
var folga=0.208;
var color = "#2892D7", line = "RoyalBlue";
var changeColor = "#009933", partColor = "#FF9F1C", nopartColor = "#104E8B";
var lineC = "#000000", colorC = "#ffffff";

function desenhoinitPart(){
    for(i=0;i<n1;i++){
        angle = 2*Math.PI*i/n1;
        x1=Math.cos(angle)*103 + 150;
        y1=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);

        var newNode = {x: x1, y: y1, id: i, angle, part: partic};
        nodesFirst.push(newNode);

        first.append("circle")
                .attr("cx", x1)
                .attr("cy", y1)
                .attr("r", radio)
                .attr("stroke", line)
                .attr("stroke-width", 1)
                .attr("fill", color)
                .append("text")
                .text("P"+i);
    }

    part = d3.select("#firstsvg").selectAll("circle");
    part.on("click", changeP);
}

function changeP(){
    var coords = d3.mouse(this);
    d3.select(this).style("fill", changeColor)
                .transition()
                .duration(500)
                .style("fill", color);
    for(i=0;i<nodesFirst.length;i++){
        if(coords[0]>=nodesFirst[i].x-radio && coords[0]<=nodesFirst[i].x+radio && coords[1]>=nodesFirst[i].y-radio && coords[1]<=nodesFirst[i].y+radio){
            var id = nodesFirst[i].id;
        }
    }
    if(nodesFirst[id].part==1)
        nodesFirst[id].part = 0;
    else
        nodesFirst[id].part = 1;
}

function showPart(){
    d3.select("#firstsvg").selectAll("circle").remove();
    for(i=0;i<n1;i++){                
        if(nodesFirst[i].part==1){
            first.append("circle")
                    .attr("cx", nodesFirst[i].x)
                    .attr("cy", nodesFirst[i].y)
                    .attr("r", radio)
                    .attr("stroke", line)
                    .attr("stroke-width", 1)
                    .attr("fill", partColor)
                    .append("text")
                    .text("P"+i);

        first.append("rect")
                .attr("x", nodesFirst[i].x-8)
                .attr("y", nodesFirst[i].y+6)
                .attr("width", 16)
                .attr("height", 15)
                .attr("stroke", lineC)
                .attr("stroke-width", 1)
                .attr("fill", colorC);

        first.append("text")
                .attr("x", nodesFirst[i].x-6)
                .attr("y", nodesFirst[i].y+17)
                .text("P"+i)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", lineC);
        }
        else{
            first.append("circle")
                    .attr("cx", nodesFirst[i].x)
                    .attr("cy", nodesFirst[i].y)
                    .attr("r", radio)
                    .attr("stroke", line)
                    .attr("stroke-width", 1)
                    .attr("fill", color)
                    .append("text")
                    .text("P"+i);
        }
    }
    part = d3.select("#firstsvg").selectAll("circle");
    part.on("click", changeP);
}

function shownoPart(){
    d3.select("#firstsvg").selectAll("circle").remove();
    for(i=0;i<n1;i++){                
        if(nodesFirst[i].part==0){
            first.append("circle")
                    .attr("cx", nodesFirst[i].x)
                    .attr("cy", nodesFirst[i].y)
                    .attr("r", radio)
                    .attr("stroke", line)
                    .attr("stroke-width", 1)
                    .attr("fill", nopartColor)
                    .append("text")
                    .text("P"+i);

        first.append("rect")
                .attr("x", nodesFirst[i].x-8)
                .attr("y", nodesFirst[i].y+6)
                .attr("width", 16)
                .attr("height", 15)
                .attr("stroke", lineC)
                .attr("stroke-width", 1)
                .attr("fill", colorC);

        first.append("text")
                .attr("x", nodesFirst[i].x-6)
                .attr("y", nodesFirst[i].y+17)
                .text("P"+i)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", lineC);
        
        }
        else{
            first.append("circle")
                    .attr("cx", nodesFirst[i].x)
                    .attr("cy", nodesFirst[i].y)
                    .attr("r", radio)
                    .attr("stroke", line)
                    .attr("stroke-width", 1)
                    .attr("fill", color)
                    .append("text")
                    .text("P"+i);
        }
    }
    part = d3.select("#firstsvg").selectAll("circle");
    part.on("click", changeP);
}

function unshowPart(){
    var sel = d3.select("#firstsvg").selectAll("circle")
                    .style("fill", color)
                    .style("stroke", line);

    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("text").remove();
}

function showRing(){
    for(i=0;i<n1;i++){
        if(i===nodesFirst.length-1){
            var arc = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesFirst[0].angle-folga+(2*Math.PI))
                    .endAngle(nodesFirst[i].angle+folga);
        }
        else{
            var arc = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesFirst[i+1].angle-folga)
                    .endAngle(nodesFirst[i].angle+folga);
        }
        var seta = first.append("defs").append("marker")
                        .attr("id", "arrow")
                        .attr("viewBox", "0 -5 10 10")
                        .attr("refX", 8)
                        .attr("refY", 0)
                        .attr("markerWidth", 10)
                        .attr("markerHeight", 10)
                        .attr("orient", "auto-start-reverse")
                        .append("path")
                        .attr("d", "M0,-5L10,0L0,5");
    
        first.append("path")
            .attr("d", arc)
            .attr("transform", "translate(150, 150)")
            .attr("marker-start", "url(#arrow)");

        first.append("rect")
                .attr("x", nodesFirst[i].x-8)
                .attr("y", nodesFirst[i].y+6)
                .attr("width", 16)
                .attr("height", 15)
                .attr("stroke", lineC)
                .attr("stroke-width", 1)
                .attr("fill", colorC);

        first.append("text")
                .attr("x", nodesFirst[i].x-6)
                .attr("y", nodesFirst[i].y+17)
                .text("P"+i)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", lineC);
    }
}

function unshowRing(){
    d3.select("#firstsvg").selectAll("path").remove();
    d3.select("#firstsvg").selectAll("marker").remove();
    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("text").remove();
}

var slider1 = document.getElementById("sliderNodePart");
    slider1.oninput = function (){
    n1=this.value;
    nodesFirst.splice(0,10);
    d3.select("#firstsvg").selectAll("circle").remove();
    desenhoinitPart();
}

window.onload = desenhoinitPart();

//segunda imagem
var canvas = d3.select("#background")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);

var x2, y2, aux, n2 = 5;
var nodes;
var nodesSec = [];

function desenhoinitNodes(){
    for(i=0;i<n2;i++){
        angle = 2*Math.PI*i/n2;
        x2=Math.cos(angle)*103 + 150;
        y2=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);

        var newNode = {x: x2, y: y2, id: i, angle};
        nodesSec.push(newNode);
                
        canvas.append("circle")
                .attr("cx", x2)
                .attr("cy", y2)
                .attr("r", radio)
                .attr("stroke", line)
                .attr("stroke-width", 1)
                .attr("fill", color);
    }
                     
    nodes = d3.select("#background").selectAll("circle");
    nodes.on("mouseover", showLinks);
    nodes.on("mouseout", hideLinks);
}

function showLinks(){
    var coords = d3.mouse(this);
    d3.select(this).style("fill", partColor);
    for(i=0;i<nodesSec.length;i++){
        if(coords[0]>=nodesSec[i].x-20 && coords[0]<=nodesSec[i].x+20 && coords[1]>=nodesSec[i].y-20 && coords[1]<=nodesSec[i].y+20){
            var id=nodesSec[i].id;
        }
    }

    var previous, next;
    if(id==0){
        previous=nodesSec.length-1;
        next=id+1;
    }
    else{
        if(id==(nodesSec.length-1)){
            previous=id-1;
            next=0;
        }
        else{
            previous=id-1;
            next=id+1;
        }
    }
    if(id===nodesSec.length-1){
        var arc1 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesSec[id].angle-folga)
                    .endAngle(nodesSec[previous].angle+folga);
        var arc2 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesSec[next].angle-folga+(2*Math.PI))
                    .endAngle(nodesSec[id].angle+folga);
    }
    else{
        if(id===0){
            var arc1 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesSec[id].angle-folga)
                    .endAngle(nodesSec[previous].angle+folga-(2*Math.PI));
            var arc2 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesSec[next].angle-folga)
                    .endAngle(nodesSec[id].angle+folga);
        }
        else{
            var arc1 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesSec[id].angle-folga)
                    .endAngle(nodesSec[previous].angle+folga);
            var arc2 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesSec[next].angle-folga)
                    .endAngle(nodesSec[id].angle+folga);
        }
    }

    canvas.append("defs").append("marker")
                        .attr("id", "arrow")
                        .attr("viewBox", "0 -5 10 10")
                        .attr("refX", 8)
                        .attr("refY", 0)
                        .attr("markerWidth", 10)
                        .attr("markerHeight", 10)
                        .attr("orient", "auto-start-reverse")
                        .append("path")
                        .attr("d", "M0,-5L10,0L0,5");
    
    canvas.append("path")
            .attr("d", arc1)
            .attr("transform", "translate(150, 150)")
            .attr("marker-start", "url(#arrow)");

    canvas.append("path")
            .attr("d", arc2)
            .attr("transform", "translate(150, 150)")
            .attr("marker-start", "url(#arrow)");

    canvas.append("rect")
            .attr("x", nodesSec[id].x-8)
            .attr("y", nodesSec[id].y+6)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);

    canvas.append("text")
            .attr("x", nodesSec[id].x-6)
            .attr("y", nodesSec[id].y+17)
            .text("P"+id)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);

    canvas.append("rect")
            .attr("x", nodesSec[previous].x-8)
            .attr("y", nodesSec[previous].y+6)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);

    canvas.append("text")
            .attr("x", nodesSec[previous].x-6)
            .attr("y", nodesSec[previous].y+17)
            .text("P"+previous)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);

    canvas.append("rect")
            .attr("x", nodesSec[next].x-8)
            .attr("y", nodesSec[next].y+6)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);

    canvas.append("text")
            .attr("x", nodesSec[next].x-6)
            .attr("y", nodesSec[next].y+17)
            .text("P"+next)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
}

function hideLinks(){
    d3.select(this).style("fill", color);
    d3.select("#background").selectAll("path").remove();
    d3.select("#background").selectAll("marker").remove();
    d3.select("#background").selectAll("rect").remove();
    d3.select("#background").selectAll("text").remove();
}

var slider2 = document.getElementById("sliderNodeArrow");
    slider2.oninput = function (){
        n2=this.value;
        nodesSec.splice(0,10);
        d3.select("#background").selectAll("circle").remove();
        d3.select("#background").selectAll("path").remove();
        d3.select("#background").selectAll("marker").remove();
        d3.select("#background").selectAll("rect").remove();
        d3.select("#background").selectAll("text").remove();
        desenhoinitNodes();
}

window.onload = desenhoinitNodes();

//menu 
function openNav() {
    document.getElementById("myNav").style.width = "250px";
}
          
function closeNav() {
    document.getElementById("myNav").style.width = "0px";
}

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

//terceira imagem
var third = d3.select("#thirdsvg")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);

var x3, y3, n3 = 5, aux = 0, participant = 0, elected = -1;
var nodesThird = [], strength = [];
var j;

function startRandom(){
    strength.splice(0,10);

    for(i=0;i<10;i++)     
        strength.push(0);

    j = 1;

    while(j<=10){
        var aux = Math.floor(Math.random()*10);
        if(strength[aux]==0){
            strength[aux] = j;
            j++;
        } 
    }
}

startRandom();

function desenhoinitThird(){
    for(i=0;i<n3;i++){
        angle = 2*Math.PI*i/n3;
        x3=Math.cos(angle)*103 + 150;
        y3=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);

        var newNode = {x: x3, y: y3, id: i, angle, strength: strength[i], participant, elected};
        nodesThird.push(newNode);
                
        third.append("circle")
                .attr("cx", x3)
                .attr("cy", y3)
                .attr("r", radio)
                .attr("stroke", line)
                .attr("stroke-width", 1)
                .attr("fill", color);
        d3.select("#table2").append("tr").attr("class","linha"+i)
                            .attr("align", "center")
                            .append("td").text(nodesThird[i].id);
        d3.select("#table2").select(".linha"+i).attr("align", "center").append("td").text(nodesThird[i].strength);
    }               
}

window.onload = desenhoinitThird(); 

var send = {strength:-1, id: -1}; 
var controle = 0, control = 0;
var flag;

function algoritmoAnel()
{
    third.selectAll("path").remove();
    third.selectAll("marker").remove();
    third.selectAll("rect").remove();
    third.selectAll("text").remove();
    
    flag = true;
    
    if(control==0){
        send.strength = nodesThird[controle].strength;
        send.id = nodesThird[controle].id;
        nodesThird[controle].participant = 1;
        nodesThird[controle].elected = controle;

        drawSend(send,controle);

        if(controle==nodesThird.length-1){
            controle = 0;
        }
        else{
            controle += 1;
        }
        control = 1;     
    }
    else{
        if(send.strength>nodesThird[controle].strength){
            nodesThird[controle].participant=1;
            nodesThird[controle].elected=send.id;
            drawSend(send,controle);
            if(controle==nodesThird.length-1){
                controle=0;
            }
            else{
                controle +=1;
            }
        }
        else{
            if(send.strength < nodesThird[controle].strength){
                send.strength = nodesThird[controle].strength;
                send.id = nodesThird[controle].id;
                nodesThird[controle].participant = 1;
                nodesThird[controle].elected = controle;

                drawSend(send,controle);

                if(controle==nodesThird.length-1){
                    controle=0;
                }
                else{
                    controle +=1;
                }       
            }
            else{
                if(send.id==nodesThird[controle].id){
                    flag = false;

                    d3.select("#thirdsvg").selectAll("circle").remove();
                    d3.select("#thirdsvg").selectAll("path").remove();

                    for(i=0;i<nodesThird.length;i++){
                        if(i==send.id){
                            third.append("circle")
                                    .attr("cx", nodesThird[i].x)
                                    .attr("cy", nodesThird[i].y)
                                    .attr("r", radio)
                                    .attr("stroke", line)
                                    .attr("stroke-width", 1)
                                    .attr("fill", partColor);
                        }
                        else{
                            third.append("circle")
                                    .attr("cx", nodesThird[i].x)
                                    .attr("cy", nodesThird[i].y)
                                    .attr("r", radio)
                                    .attr("stroke", line)
                                    .attr("stroke-width", 1)
                                    .attr("fill", color);
                        }
                    }
                    third.append("rect")
                            .attr("x", 130)
                            .attr("y", 120)
                            .attr("width", 75)
                            .attr("height", 20)
                            .attr("stroke", lineC)
                            .attr("stroke-width", 1)
                            .attr("fill", colorC);
                            
                    third.append("text")
                            .attr("x", 133)
                            .attr("y", 133)
                            .text("Novo Líder: P" + send.id)
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "10px")
                            .attr("fill", lineC);

                }
            }
        }
    }
}

function drawSend(send,id){

    console.log(id);
    console.log(send);

    if(id==nodesThird.length-1){
        var next = 0;
        var arc = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesThird[next].angle-folga+(2*Math.PI))
                    .endAngle(nodesThird[id].angle+folga);
    }
    else{
        if(id==0){
            var arc = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesThird[id+1].angle-folga)
                    .endAngle(nodesThird[id].angle+folga);
        }
        else{
            var arc = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesThird[id+1].angle-folga)
                    .endAngle(nodesThird[id].angle+folga);
        }
    }

    third.append("defs").append("marker")
                        .attr("id", "arrow")
                        .attr("viewBox", "0 -5 10 10")
                        .attr("refX", 8)
                        .attr("refY", 0)
                        .attr("markerWidth", 10)
                        .attr("markerHeight", 10)
                        .attr("orient", "auto-start-reverse")
                        .append("path")
                        .attr("d", "M0,-5L10,0L0,5");

    third.append("path")
            .attr("d", arc)
            .attr("transform", "translate(150, 150)")
            .attr("marker-start", "url(#arrow)");

    third.append("rect")
            .attr("x", nodesThird[id].x-8)
            .attr("y", nodesThird[id].y+6)
            .attr("width", 43)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);

    third.append("text")
            .attr("x", nodesThird[id].x-6)
            .attr("y", nodesThird[id].y+17)
            .text("Força " + nodesThird[id].strength)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);

    third.append("rect")
            .attr("x", 130)
            .attr("y", 120)
            .attr("width", 75)
            .attr("height", 50)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);
            
    third.append("text")
            .attr("x", 133)
            .attr("y", 133)
            .text("Mensagem:")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    
    third.append("text")
            .attr("x", 133)
            .attr("y", 147)
            .text("Maior Força: " + send.strength)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    
    third.append("text")
            .attr("x", 133)
            .attr("y", 163)
            .text(" ID: " + send.id)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
}

function reset(){
    nodesThird.splice(0,10);
    for(i=0;i<10;i++)
            d3.select("#table2").select(".linha" + i).remove();
    d3.select("#thirdsvg").selectAll("circle").remove();
    d3.select("#thirdsvg").selectAll("path").remove();
    d3.select("#thirdsvg").selectAll("marker").remove();
    d3.select("#thirdsvg").selectAll("text").remove();
    d3.select("#thirdsvg").selectAll("rect").remove();
    control = 0;
    send = {strength: -1, id: -1}; 
    controle = 0;
    startRandom();
    desenhoinitThird();
}

function restart(){
    nodesThird.splice(0,10);
    for(i=0;i<10;i++)
            d3.select("#table2").select(".linha" + i).remove();
    d3.select("#thirdsvg").selectAll("circle").remove();
    d3.select("#thirdsvg").selectAll("path").remove();
    d3.select("#thirdsvg").selectAll("marker").remove();
    d3.select("#thirdsvg").selectAll("text").remove();
    d3.select("#thirdsvg").selectAll("rect").remove();
    control = 0;
    send = {strength: -1, id: -1}; 
    controle = 0;
    desenhoinitThird();
}

function playOne(){
    d3.select("#buttonsR").selectAll("button").remove();
    
    d3.select("#buttonsR").append("button")
                            .attr("onclick","algoritmoAnel()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Avançar");
     d3.select("#buttonsR").append("button")
                            .attr("onclick","restart()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Restart");                     
    d3.select("#buttonsR").append("button")
                            .attr("onclick","reset()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Reset");
}

var slider3 = document.getElementById("sliderNodeThird");
    slider3.oninput = function(){
        n3=this.value;
        nodesThird.splice(0,10);
        for(i=0;i<10;i++)
            d3.select("#table2").select(".linha" + i).remove();
        d3.select("#thirdsvg").selectAll("circle").remove();
        d3.select("#thirdsvg").selectAll("path").remove();
        d3.select("#thirdsvg").selectAll("marker").remove();
        d3.select("#thirdsvg").selectAll("text").remove();
        d3.select("#thirdsvg").selectAll("rect").remove();
        control = 0;
        send = {strength: -1, id: -1}; 
        controle = 0;
        desenhoinitThird();
}

//quarta imagem
var forth = d3.select("#forthsvg")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);

var x4, y4, n4 = 5, aux = 0, participantForth = 0, electedForth = -1;
var nodesForth = [], strengthForth = [];

function initT(){
    strengthForth.splice(0,10);

    for(i=0;i<10;i++)
        strengthForth.push(0);

    var j = 1;

    while(j<=10){
        var aux = Math.floor(Math.random()*10);
        if(strengthForth[aux]==0){
            strengthForth[aux] = j;
            j++;
        }  
    }
}

initT();

function desenhoinitForth(){
    for(i=0;i<n4;i++){
        angle = 2*Math.PI*i/n4;
        x4=Math.cos(angle)*103 + 150;
        y4=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);

        var newNode = {x: x4, y: y4, id: i, angle, strength: strengthForth[i], participant: participantForth, elected: electedForth};
        nodesForth.push(newNode);
        
        forth.append("circle")
                .attr("cx", x4)
                .attr("cy", y4)
                .attr("r", radio)
                .attr("stroke", line)
                .attr("stroke-width", 1)
                .attr("fill", color);
        
        addLine(i);
    }       
}

window.onload = desenhoinitForth(); 

var sende = {strength: -1, id: -1}; 
var controleF = 0, controlF = 0;
var q=0;

function algoritmoAnelS(){
    forth.selectAll("path").remove();
    d3.select("#forthsvg").selectAll("marker").remove();
    d3.select("#forthsvg").selectAll("rect").remove();
    d3.select("#forthsvg").selectAll("text").remove();
    
    flag = true;
    
    if(controlF == 0){
        sende.strength = nodesForth[controleF].strength;
        sende.id = nodesForth[controleF].id;
        nodesForth[controleF].participant = 1;
        nodesForth[controleF].elected = controleF;

        drawSendS(sende,controleF);
            
        if(controleF==nodesForth.length-1){
            controleF = 0;
        }
        else{
            controleF += 1;
        }
        controlF = 1;  
    }
    else{
        if(sende.strength > nodesForth[controleF].strength){
            nodesForth[controleF].participant = 1;
            nodesForth[controleF].elected = sende.id;

            drawSendS(sende,controleF);

            if(controleF==nodesForth.length-1){
                controleF = 0;
            }
            else{
                controleF +=1;
            }
        }
        else{
            if(sende.strength < nodesForth[controleF].strength){
                sende.strength = nodesForth[controleF].strength;
                sende.id = nodesForth[controleF].id;
                nodesForth[controleF].participant = 1;
                nodesForth[controleF].elected = controleF;

                drawSendS(sende,controleF);

                if(controleF==nodesForth.length-1){
                    controleF = 0;
                }
                else{
                    controleF += 1;
                }
                    
            }
            else{
                if(sende.id==nodesForth[controleF].id){
                    flag = false;
                    
                    d3.select("#forthsvg").selectAll("circle").remove();
                    d3.select("#forthsvg").selectAll("path").remove();

                    for(i=0;i<nodesForth.length;i++){
                        if(i==sende.id){
                            forth.append("circle")
                                    .attr("cx", nodesForth[i].x)
                                    .attr("cy", nodesForth[i].y)
                                    .attr("r", radio)
                                    .attr("stroke", lineC)
                                    .attr("stroke-width", 1)
                                    .attr("fill", partColor);
                        }
                        else{
                            forth.append("circle")
                                    .attr("cx", nodesForth[i].x)
                                    .attr("cy", nodesForth[i].y)
                                    .attr("r", radio)
                                    .attr("stroke", line)
                                    .attr("stroke-width", 1)
                                    .attr("fill", color);
                        }
                    }
                    forth.append("rect")
                            .attr("x", 130)
                            .attr("y", 120)
                            .attr("width", 75)
                            .attr("height", 20)
                            .attr("stroke", lineC)
                            .attr("stroke-width", 1)
                            .attr("fill", colorC);
                            
                    forth.append("text")
                            .attr("x", 133)
                            .attr("y", 133)
                            .text("Novo Líder: P" + sende.id)
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "10px")
                            .attr("fill", lineC);
                }
            }
        }
    }
}

function drawSendS(sende,id){
    console.log(id);
    console.log(sende);
    
    if(id==nodesForth.length-1){
        var next = 0;
        var arc = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesForth[next].angle-folga+(2*Math.PI))
                    .endAngle(nodesForth[id].angle+folga);
    }
    else{
        if(id==0){
            var arc = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesForth[id+1].angle-folga)
                    .endAngle(nodesForth[id].angle+folga);
        }
        else{
            var arc = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodesForth[id+1].angle-folga)
                    .endAngle(nodesForth[id].angle+folga);
        }
    }

    forth.append("defs").append("marker")
                        .attr("id", "arrow")
                        .attr("viewBox", "0 -5 10 10")
                        .attr("refX", 8)
                        .attr("refY", 0)
                        .attr("markerWidth", 10)
                        .attr("markerHeight", 10)
                        .attr("orient", "auto-start-reverse")
                        .append("path")
                        .attr("d", "M0,-5L10,0L0,5");

    forth.append("path")
            .attr("d", arc)
            .attr("transform", "translate(150, 150)")
            .attr("marker-start", "url(#arrow)");
            
    forth.append("rect")
            .attr("x", nodesForth[id].x-8)
            .attr("y", nodesForth[id].y+6)
            .attr("width", 43)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);

    forth.append("text")
            .attr("x", nodesForth[id].x-6)
            .attr("y", nodesForth[id].y+17)
            .text("Força "+nodesForth[id].strength)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);

    forth.append("rect")
            .attr("x", 130)
            .attr("y", 120)
            .attr("width", 75)
            .attr("height", 50)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorC);
            
    forth.append("text")
            .attr("x", 133)
            .attr("y", 133)
            .text("Mensagem:")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    
    forth.append("text")
            .attr("x", 133)
            .attr("y", 147)
            .text("Maior Força: " + sende.strength)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    
    forth.append("text")
            .attr("x", 133)
            .attr("y", 163)
            .text(" ID: " + sende.id)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);           
}

function addLine(objtt){
    d3.select("#table").append("tr")
                        .attr("class", "linha" + objtt)
                        .attr("align", "center")
                        .append("td")
                        .text(nodesForth[objtt].id);
    d3.select("#table").select(".linha" + objtt).append("td")
                                .append("input")
                                .attr("type", "number")
                                .attr("step", "1")
                                .attr("min", "1")
                                .attr("max", "10")
                                .attr("class", "form")
                                .attr("value", nodesForth[objtt].strength)
                                .attr("id", "mapValue" + objtt)
                                .attr("oninput", "simulator(" + objtt + ")");
}
 
function simulator(idf){
    var x = document.getElementById("mapValue" + idf).value;

    if(x == ""){
        alert("Atenção! Forças não podem ficar vazias!");
        document.getElementById("mapValue" + idf).value = nodesForth[idf].strength;
    }
    else{
        var flagr = false;

        for(i=0;i<n4;i++){
            if(strengthForth[i]==x)
                flagr = true;
        }
        if(flagr){
            alert("Atenção! Forças devem ser únicas!");
            document.getElementById("mapValue" + idf).value = nodesForth[idf].strength;
        }
        else{
            strengthForth[idf] = x;
            nodesForth[idf].strength = x;
            controlF = 0;
            sende = {strength: -1, id: -1}; 
            controleF = 0;
            d3.select("#forthsvg").selectAll("path").remove();
            d3.select("#forthsvg").selectAll("marker").remove();
            d3.select("#forthsvg").selectAll("text").remove();
            d3.select("#forthsvg").selectAll("rect").remove();
        }
    }
}

function restartT(){
    d3.select("#forthsvg").selectAll("circle")
                            .style("fill", color)
                            .style("stroke", line);
    d3.select("#forthsvg").selectAll("path").remove();
    d3.select("#forthsvg").selectAll("marker").remove();
    d3.select("#forthsvg").selectAll("text").remove();
    d3.select("#forthsvg").selectAll("rect").remove();
    controlF = 0;
    sende = {strength: -1, id: -1}; 
    controleF = 0;
}

function resetT(){
    restartT();
    initT();
    for(i=0;i<10;i++){
        nodesForth[i].strength = strengthForth[i];
        document.getElementById("mapValue" + i).value = nodesForth[i].strength;
    }
}

function playTwo(){
    d3.select("#buttonsS").selectAll("button").remove();

    d3.select("#buttonsS").append("button")
                            .attr("onclick","algoritmoAnelS()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Avançar");

    d3.select("#buttonsS").append("button")
                            .attr("onclick","restartT()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Restart");

    d3.select("#buttonsS").append("button")
                            .attr("onclick","resetT()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Reset");
}

var slider4 = document.getElementById("sliderNodeForth");
    slider4.oninput = function (){
        n4=this.value;
        nodesForth.splice(0,10);
        d3.select("#forthsvg").selectAll("circle").remove();
        d3.select("#forthsvg").selectAll("path").remove();
        d3.select("#forthsvg").selectAll("marker").remove();
        d3.select("#forthsvg").selectAll("text").remove();
        d3.select("#forthsvg").selectAll("rect").remove();
        controlF = 0;
        sende = {strength: -1, id: -1}; 
        controleF = 0;
        for(i=0;i<10;i++){
            d3.select("#table").select(".linha" + i).remove();
        }
        desenhoinitForth();
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}