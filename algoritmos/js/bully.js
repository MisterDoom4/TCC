var grafo = d3.select("#grafo")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);

var first = d3.select("#firstsvg")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);

var third = d3.select("#thirdsvg")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);

var fourth = d3.select("#fourthsvg")
                .append("svg")
                .attr("width",300)
                .attr("height",300);
//Variáveis globais gerais
var i, radio=15, angle;
var colorSelect = "#FF9F1C";
var colorPadrao = "#2892D7";
var colorSPadrao = "RoyalBlue";
var colorPart = "#104E8B";
var colorLine = "#000000", colorBack = "#ffffff";
//Variáveis globais dos nós
var nodesFirst = [],n1=5;
var nodesThird =[],n3=5;
var nodesFourth =[],n4=5;
var nodesGrafo = [],n5 = 5;
//Variáveis globais Segunda Animação
var lider=0, idLider;
var eleito=-1;
var recives = [];
var controlRecives = 0;
var contRecv =0, contOp =-1,retro3;
var controlEnd3=0;
var bestChoose3=0;liderNew3=-1;
var controleAlgoritmo3=[],controlNext3;
//Variáveis globais Terceira Animação
var lider4=0,idLider4;
var eleito4=-1;
var recives4 = [];
var controlRecives4 = 0;
var contRecv4 =0, contOp4 =-1,retro4;
var controlEnd4=0;
var bestChoose4=0;liderNew4=-1;
var controleAlgoritmo4=[],controlNext4;
//Inicialização Animações
window.onload = desenhoinitFirst();
window.onload = desenhoinitThird();
window.onload = desenhoinitFourth(); 
window.onload = initGrafo();

function numberRandom(n)
{
    return Math.floor(Math.random()*n);
}

function randomResp()
{
    return Math.floor((Math.random()*2)+1);
}
//Primeira Animação
function initGrafo(){
    var p;

    for(p=0;p<n5;p++){
        angle = 2*Math.PI*p/n5;
        var p1 = Math.cos(angle)*103 + 150;
        var p2 = Math.sin(angle)*103 + 150;

        var newNode = {x: p1, y: p2, id: p};
        nodesGrafo.push(newNode);
                
        grafo.append("circle")
                .attr("id", p)
                .attr("cx", p1)
                .attr("cy", p2)
                .attr("r", radio)
                .attr("stroke", colorSPadrao)
                .attr("stroke-width", 1)
                .attr("fill", colorPadrao);
    }    
}

function showGrafo(){
    grafo.selectAll("circle").remove();

    var p, q;
    for(p=0;p<n5;p++){
        for(q=p+1;q<n5;q++){
            grafo.append("line")
                    .attr("x1",nodesGrafo[p].x)
                    .attr("y1",nodesGrafo[p].y)
                    .attr("x2",nodesGrafo[q].x)
                    .attr("y2",nodesGrafo[q].y)
                    .attr("stroke",colorLine)
                    .attr("stroke-width",1);
        }
    }
    nodesGrafo.splice(0,10);
    initGrafo();
    for(p=0;p<n5;p++){
        grafo.append("rect")
                    .attr("x", nodesGrafo[p].x-8)
                    .attr("y", nodesGrafo[p].y+6)
                    .attr("width", 18)
                    .attr("height", 14)
                    .attr("stroke", colorLine)
                    .attr("stroke-width", 1)
                    .attr("fill", colorBack);

        grafo.append("text")
                .attr("x", nodesGrafo[p].x-6)
                .attr("y", nodesGrafo[p].y+17)
                .text("P"+p)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", colorLine);
    }
}

function unshowGrafo(){
    grafo.selectAll("line").remove();
    grafo.selectAll("rect").remove();
    grafo.selectAll("text").remove();
}
//Segunda Animação
function desenhoinitFirst(){
    var x1, y1;
    var controle;
    var forca=[];
    forcaNodes(forca);
    for(i=0;i<n1;i++){
        var nordes=[];
        controleForca(i,nordes,n1,forca);
        angle = 2*Math.PI*i/n1;
        x1=Math.cos(angle)*103 + 150;
        y1=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);

        var newNode = {x:x1, y:y1, id: i, angle,nodes:nordes,forca:forca[i]};
        nodesFirst.push(newNode);
                
        first.append("circle")
                .attr("cx", x1)
                .attr("cy", y1)
                .attr("r", radio)
                .attr("stroke", colorSPadrao)
                .attr("stroke-width", 1)
                .attr("fill", colorPadrao);
    }    
    controle = d3.select("#firstsvg").selectAll("circle");
    controle.on("mouseover", showLinks1);
    controle.on("mouseout", hideLinks1);
}

function forcaNodes(forca){
    var aux=0;   
    var j=1;
    for(i=0;i<10;i++)
        forca.push(aux);

    while(j<=10)
    {
        var aux = numberRandom(10);
        if(forca[aux]==0)
        {
            forca[aux]=j;
            j++;
        }    
    }
    return forca;
}

function controleForca(id,nordes,n,forca){
    var j;
    for(j=0;j<n;j++) {
        if(forca[j]>forca[id])
            nordes.push(j);
    }
    return nordes;
}

function showLinks1(){
    var coords = d3.mouse(this);
    d3.select(this).style('fill', colorSelect);
    for(i=0;i<nodesFirst.length;i++){
        if(coords[0]>=nodesFirst[i].x-20 && coords[0]<=nodesFirst[i].x+20 && coords[1]>=nodesFirst[i].y-20 && coords[1]<=nodesFirst[i].y+20){
            var id=nodesFirst[i].id;
        }
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

    for(i=0;i<nodesFirst[id].nodes.length;i++){
        var next = nodesFirst[id].nodes[i];
        first.append("line")
                .attr("x1",nodesFirst[next].x)
                .attr("y1",nodesFirst[next].y)
                .attr("x2",nodesFirst[id].x)
                .attr("y2",nodesFirst[id].y)
                .attr("stroke",colorLine)
                .attr("stroke-width",1)
                .attr("marker-start", "url(#arrow)");
        drawLabels1(next);   
    }
    drawLabels1(id);
}

function drawLabels1(id){
    first.append("rect")
                .attr("x", nodesFirst[id].x-8)
                .attr("y", nodesFirst[id].y+12)
                .attr("width", 20)
                .attr("height", 24)
                .attr("stroke", colorLine)
                .attr("stroke-width", 1)
                .attr("fill", colorBack);

    first.append("text")
            .attr("x", nodesFirst[id].x-6)
            .attr("y", nodesFirst[id].y+23)
            .text("P"+id)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", colorLine);
    
    first.append("text")
            .attr("x", nodesFirst[id].x-6)
            .attr("y", nodesFirst[id].y+33)
            .text("F"+nodesFirst[id].forca)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", colorLine);
}

function hideLinks1(){ 
    d3.select(this).style('fill', colorPadrao);
    d3.select("#firstsvg").selectAll("path").remove();
    d3.select("#firstsvg").selectAll("line").remove();
    d3.select("#firstsvg").selectAll("marker").remove();
    d3.select("#firstsvg").selectAll("rect").remove();
    d3.select("#firstsvg").selectAll("text").remove();
}
//Terceira Animação
function desenhoinitThird(){
    var x1, y1, participante=0;
    var controle;
    var forca=[];
    forcaNodes(forca);
    for(i=0;i<n3;i++){
        var nordes=[];
        controleForca(i,nordes,n3,forca);
        angle = 2*Math.PI*i/n3;
        x1=Math.cos(angle)*103 + 150;
        y1=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);
        participante = randomResp();
        var newNode = {x:x1, y:y1, id: i, angle,nodes:nordes,forca:forca[i], participante};
        nodesThird.push(newNode);
        drawCircle3(i);
        d3.select("#table2").append("tr").attr("class","line"+i)
                            .attr("align", "center")
                            .append("td").text(nodesThird[i].id);
        d3.select("#table2").select(".line"+i).attr("align", "center").append("td").text(nodesThird[i].forca);
    }
    chooseLider();
    controle=numberRandom(n3);
    if(nodesThird[controle].participante == 1)
    {
        for(i=0;i<n3;i++)
            if(nodesThird[i].participante == 2)
            {
                controle=i;
                break;
            }
                
    }
    d3.select("#mapValue").attr("max",n3-1).attr("value",controle);
}

function drawCircle3(id){
    if(nodesThird[id].participante==2)
        third.append("circle")
                    .attr("cx", nodesThird[id].x)
                    .attr("cy", nodesThird[id].y)
                    .attr("r", radio)
                    .attr("stroke", colorSPadrao)
                    .attr("stroke-width", 1)
                    .attr("fill", colorPart);
    else
        third.append("circle")
                    .attr("cx", nodesThird[id].x)
                    .attr("cy", nodesThird[id].y)
                    .attr("r", radio)
                    .attr("stroke", colorSPadrao)
                    .attr("stroke-width", 1)
                    .attr("fill", colorPadrao);
}
function chooseLider()
{
    for(i=0;i<nodesThird.length;i++){
        if(nodesThird[i].forca>lider){
            lider = nodesThird[i].forca;
            idLider = nodesThird[i].id;
        }   
        if(nodesThird[i].participante==2 && nodesThird[i].forca>bestChoose3){
            bestChoose3 = nodesThird[i].forca;
            liderNew3 = nodesThird[i].id;
            console.log( " best " + bestChoose3 + " lidernew "+ liderNew3);
        }   
    }
}

function drawLabels3(id){
    third.append("rect")
                .attr("x", nodesThird[id].x-8)
                .attr("y", nodesThird[id].y+6)
                .attr("width", 20)
                .attr("height", 24)
                .attr("stroke", colorLine)
                .attr("stroke-width", 1)
                .attr("fill", colorBack);
    third.append("text")
            .attr("x", nodesThird[id].x-6)
            .attr("y", nodesThird[id].y+17)
            .text("P"+id)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", colorLine);  
    third.append("text")
            .attr("x", nodesThird[id].x-6)
            .attr("y", nodesThird[id].y+27)
            .text("F"+nodesThird[id].forca)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", colorLine);
}

function hideLinks3(){ 
    third.selectAll("line").remove();
    third.selectAll("marker").remove();
    third.selectAll("rect").remove();
    third.selectAll("text").remove();
}
function answer3(id, vect){
    for(i=0;i<nodesThird[id].nodes.length;i++){
        var temp = nodesThird[id].nodes[i];
        if(nodesThird[temp].participante == 2){
            vect.push(nodesThird[id].nodes[i]);
        }  
    }
    return vect;
}
function find()
{
    var idAux = document.getElementById("mapValue").value;
    var id = idAux;
    restart();
    answer3(id,controleAlgoritmo3);
    controlNext3=id;
    d3.select("#secondAni").selectAll("button").remove();
    d3.select("#button").append("button")
                            .attr("onclick","drawNext3()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Avançar");  
    d3.select("#button").append("button")
                            .attr("onclick","restart()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Restart");
    d3.select("#button").append("button")
                            .attr("onclick","reset()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Reset");
    if (nodesThird[id].participante==1)
    {
        alert("Nó inválido, não é participante!! Insira outro nó.");
        restart();
    }
}
function drawNext3(){
    if(contOp<controleAlgoritmo3.length+2)
        if(contRecv>controlRecives)
            drawRecives3(retro3);
        else
        {
            contOp++;
            algoritmoBully3(controlNext3); 
        }    
}
function drawRecives3(id){
    if(controlRecives==0)
        hideLinks3();
    var aux = recives[controlRecives];
    console.log("contro -- "+controlRecives);
    controlRecives++;
    console.log("aux -- "+aux);
    recive(aux,id);
}
function algoritmoBully3(id){
    console.log("entrei " + id);
    console.log("eleito 4 "+eleito + " lidernew" + liderNew3);
    console.log("length "+controleAlgoritmo3.length + " contop "+contOp );
    
    if(controlEnd3 == 1){ 
        var liderTemp3 = randomResp();
        if (liderTemp3 == 2 && eleito!=idLider){
            broadcast(idLider); 
            drawLabelMessage("BULLY ATACK!");
        }
        else{
            drawLabelMessage(eleito+" é o LIDER!");}
        
    }else if(eleito==liderNew3)
    {
        broadcast(id);
        controlEnd3 = 1;
    }else if(nodesThird[id].nodes.length == 0 || controleAlgoritmo3.length == 0){
        eleito = id;
        controlNext3=id; 
        sender(id);
        }else if(controleAlgoritmo3.length == contOp){
            eleito=id;
            controlNext3=id;
            console.log("heyy " + id);
            sender(id); 
            } else{  
                retro3 = controlNext3;
                controlRecives=0;
                recives=[];
                answer3(retro3,recives);
                contRecv= recives.length;
                console.log("re -- "+contRecv);
                console.log(recives);
                controlNext3 = controleAlgoritmo3[contOp];
                sender(id);  
            }
}
function drawLabelMessage(mensagem){
    third.append("rect")
                .attr("x", 2)
                .attr("y", 2)
                .attr("width", 73)
                .attr("height", 26)
                .attr("stroke", colorLine)
                .attr("stroke-width", 1)
                .attr("fill", colorBack);

    third.append("text")
            .attr("x", 4)
            .attr("y", 12)
            .text("Mensagem:")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", colorLine);

    third.append("text")
            .attr("x", 4)
            .attr("y", 24)
            .text(mensagem)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", colorLine);
}
function sender(id){
    hideLinks3();
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

    for(i=0;i<nodesThird[id].nodes.length;i++)
    {
        var next = nodesThird[id].nodes[i];
        third.append("line")
                .transition()
                .duration(1000)
                .attr("x1",nodesThird[next].x)
                .attr("y1",nodesThird[next].y)
                .attr("x2",nodesThird[id].x)
                .attr("y2",nodesThird[id].y)
                .attr("stroke",colorLine)
                .attr("stroke-width",1)
                .attr("stroke-dasharray", 5)
                .attr("marker-start", "url(#arrow)");
        drawLabels3(next);   
    }
    drawLabels3(id);
    drawLabelMessage("Eleição");
}

function broadcast(id){
    hideLinks3();
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
    for(i=0;i<nodesThird.length;i++){
        if(i!=id){
            third.append("line")
                    .attr("x1",nodesThird[i].x)
                    .attr("y1",nodesThird[i].y)
                    .attr("x2",nodesThird[id].x)
                    .attr("y2",nodesThird[id].y)
                    .attr("stroke",colorLine)
                    .attr("stroke-width",1)
                    .attr("stroke-dasharray", 5)
                    .attr("marker-start", "url(#arrow)"); 
            drawLabels3(i); 
        }
    }
    drawLabels3(id);
    drawLabelMessage("Coordenador");
}
function recive(next,id)
{
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
    
    third.append("line")
                .transition()
                .duration(1000)
                .attr("x1",nodesThird[id].x)
                .attr("y1",nodesThird[id].y)
                .attr("x2",nodesThird[next].x)
                .attr("y2",nodesThird[next].y)
                .attr("stroke",colorLine)
                .attr("stroke-width",1)
                .attr("stroke-dasharray", 5)
                .attr("marker-start", "url(#arrow)");
    
    drawLabels3(id);
    drawLabels3(next);
    drawLabelMessage("OK");
}
function reset(){
    for(i=0;i<10;i++)
        d3.select("#table2").select(".line" + i).remove();
    lider=0;
    bestChoose3=0
    controleAlgoritmo3=[];        
    restart();
    nodesThird=[];
    desenhoinitThird();
    var idAux = document.getElementById("mapValue").value;
    var id = Number(idAux);
    controlNext3 =id;
    answer3(id,controleAlgoritmo3);
}
function restart(){
    third.selectAll("line").remove();
    third.selectAll("marker").remove();
    third.selectAll("rect").remove();
    third.selectAll("text").remove();   
    contOp =-1;
    eleito=-1;
    recives=[];
    contRecv=0;
    controlRecives=0;
    controlEnd3=0;
    var idAux = document.getElementById("mapValue").value;
    var id = Number(idAux);
    controlNext3 =id;
}
function resetScreen(){
    var idAux = document.getElementById("mapValue").value;
    var id = Number(idAux);
    if (nodesThird[id].participante==1)
    {
        alert("Nó inválido, não é participante!! Insira outro nó.");
        reset();
    }
    reset();
}
//Quarta Animação
function desenhoinitFourth(){
    var x1, y1, participante=0;
    var control,part;
    var forca=[];
    forcaNodes(forca);
    for(i=0;i<n4;i++){
        var nordes=[];
        controleForca(i,nordes,n4,forca);
        angle = 2*Math.PI*i/n4;
        x1=Math.cos(angle)*103 + 150;
        y1=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);
        participante = randomResp();
        var newNode = {x:x1, y:y1, id: i, angle,nodes:nordes,forca:forca[i], participante};
        nodesFourth.push(newNode);        
        drawCircle(i); 
        addLine(i);
    }
    chooseLider4();
    control=numberRandom(n4);
    if(nodesFourth[control].participante == 1)
    {
        for(i=0;i<n4;i++)
            if(nodesFourth[i].participante == 2)
            {
                control=i;
                break;
            }
                
    } 
    d3.select("#valueMap").attr("max",n4-1).attr("value",control);
    part = d3.select("#fourthsvg").selectAll("circle");
    part.on("click", changeP);
    console.log(nodesFourth);
}

function drawCircle(id){
    if(nodesFourth[id].participante==2)
        fourth.append("circle")
                    .attr("cx", nodesFourth[id].x)
                    .attr("cy", nodesFourth[id].y)
                    .attr("r", radio)
                    .attr("stroke", colorSPadrao)
                    .attr("stroke-width", 1)
                    .attr("fill", colorPart);
    else
        fourth.append("circle")
                    .attr("cx", nodesFourth[id].x)
                    .attr("cy", nodesFourth[id].y)
                    .attr("r", radio)
                    .attr("stroke", colorSPadrao)
                    .attr("stroke-width", 1)
                    .attr("fill", colorPadrao);
}

function changeP(){
    var coords = d3.mouse(this);
    for(i=0;i<nodesFourth.length;i++){
        if(coords[0]>=nodesFourth[i].x-radio && coords[0]<=nodesFourth[i].x+radio && coords[1]>=nodesFourth[i].y-radio && coords[1]<=nodesFourth[i].y+radio){
            var id=nodesFourth[i].id;
        }
    }
    if(nodesFourth[id].participante==1){
        nodesFourth[id].participante=2;
        d3.select(this).style('fill', 'Green')
                .transition()
                .duration(500)
                .style('fill', colorPart);
    }    
    else{
        nodesFourth[id].participante=1;
        d3.select(this).style('fill', 'Green')
                .transition()
                .duration(500)
                .style('fill', colorPadrao);
    }
    lider4=0;
    bestChoose4=0
    recives4 = []; 
    controleAlgoritmo4=[];
    restart4();
    var idAux = document.getElementById("valueMap").value;
    var id = Number(idAux);
    controlNext4=id;
    chooseLider4();
    answer4(id,controleAlgoritmo4);    
}
function chooseLider4()
{
    for(i=0;i<nodesFourth.length;i++){
        if(nodesFourth[i].forca>lider4){
            lider4 = nodesFourth[i].forca;
            idLider4 = nodesFourth[i].id;
            console.log( " Força " + lider4 + " idlider "+ idLider4);
        }
        if(nodesFourth[i].participante==2 && nodesFourth[i].forca>bestChoose4){
            bestChoose4 = nodesFourth[i].forca;
            liderNew4 = nodesFourth[i].id;
            console.log( " best " + bestChoose4 + " lidernew "+ liderNew4);
        }
            
    }
}
function drawLabels4(id){
    fourth.append("rect")
                .attr("x", nodesFourth[id].x-8)
                .attr("y", nodesFourth[id].y+6)
                .attr("width", 20)
                .attr("height", 24)
                .attr("stroke", colorLine)
                .attr("stroke-width", 1)
                .attr("fill", colorBack);

    fourth.append("text")
            .attr("x", nodesFourth[id].x-6)
            .attr("y", nodesFourth[id].y+17)
            .text("P"+id)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", colorLine);
    
    fourth.append("text")
            .attr("x", nodesFourth[id].x-6)
            .attr("y", nodesFourth[id].y+27)
            .text("F"+nodesFourth[id].forca)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", colorLine);
}

function hideLinks4(){ 
    fourth.selectAll("line").remove();
    fourth.selectAll("marker").remove();
    fourth.selectAll("rect").remove();
    fourth.selectAll("text").remove();
}
function answer4(id, vect){
    for(i=0;i<nodesFourth[id].nodes.length;i++){
        var temp = nodesFourth[id].nodes[i];
        if(nodesFourth[temp].participante == 2){
            vect.push(nodesFourth[id].nodes[i]);
        }  
    }
    return vect;
}
function find4()
{
    var idAux = document.getElementById("valueMap").value;
    var id = Number(idAux);
    console.log("FF"+id);
    restart4();
    answer4(id,controleAlgoritmo4);
    controlNext4=id;
    console.log(controleAlgoritmo4);
    console.log("controlNext4 " + controlNext4);
    d3.select("#left").selectAll("button").remove();

    d3.select("#button4").append("button")
                            .attr("onclick","drawNext()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Avançar");  
    d3.select("#button4").append("button")
                            .attr("onclick","restart4()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Restart");
    d3.select("#button4").append("button")
                            .attr("onclick","reset4()")
                            .attr("class","btn btn-rounded btn-light btn-sm")
                            .attr("id","algoritmo")
                            .text("Reset");
    if (nodesFourth[id].participante==1)
    {
        alert("Nó inválido, não é participante!! Insira outro nó.");
        restart4();
    }
}
function drawNext(){
    if(contOp4<controleAlgoritmo4.length+2)
        if(contRecv4>controlRecives4)
            drawRecives(retro4);
        else
        {
            contOp4++;
            algoritmoBully4(controlNext4); 
        }    
}
function drawRecives(id){
    if(controlRecives4==0)
        hideLinks4();
    var aux = recives4[controlRecives4];
    console.log("contro -- "+controlRecives4);
    controlRecives4++;
    console.log("aux -- "+aux);
    recive4(aux,id);
}
function algoritmoBully4(id){
    console.log("entrei " + id);
    console.log("eleito 4 "+eleito4 + " lidernew" + liderNew4);
    console.log("length "+controleAlgoritmo4.length + " contop "+contOp4 );
    
    if(controlEnd4 == 1){ 
        var liderTemp4 = randomResp();
        if (liderTemp4 == 2 && eleito4!=idLider4){
            broadcast4(idLider4); 
            drawLabelMessage4("BULLY ATACK!");
        }
        else{
            drawLabelMessage4(eleito4+" é o LIDER!");}
        
    }else if(eleito4==liderNew4)
    {
        broadcast4(id);
        controlEnd4 = 1;
    }else if(nodesFourth[id].nodes.length == 0 || controleAlgoritmo4.length == 0){
        eleito4 = id;
        controlNext4=id; 
        sender4(id);
        }else if(controleAlgoritmo4.length == contOp4){
            eleito4=id;
            controlNext4=id;
            console.log("heyy " + id);
            sender4(id); 
            } else{  
                retro4 = controlNext4;
                controlRecives4=0;
                recives4=[];
                answer4(retro4,recives4);
                contRecv4= recives4.length;
                console.log("re -- "+contRecv4);
                console.log(recives4);
                controlNext4 = controleAlgoritmo4[contOp4];
                sender4(id);  
            }  
}

function drawLabelMessage4(mensagem){
    fourth.append("rect")
                .attr("x", 2)
                .attr("y", 2)
                .attr("width", 85)
                .attr("height", 28)
                .attr("stroke", colorLine)
                .attr("stroke-width", 1)
                .attr("fill", colorBack);

    fourth.append("text")
            .attr("x", 4)
            .attr("y", 14)
            .text("Mensagem:")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", colorLine);

    fourth.append("text")
            .attr("x", 4)
            .attr("y", 26)
            .text(mensagem)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", colorLine);
}
function sender4(id){
    hideLinks4();
    fourth.append("defs").append("marker")
                .attr("id", "arrow")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 8)
                .attr("refY", 0)
                .attr("markerWidth", 10)
                .attr("markerHeight", 10)
                .attr("orient", "auto-start-reverse")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5");
    for(i=0;i<nodesFourth[id].nodes.length;i++){
        var next = nodesFourth[id].nodes[i];
        fourth.append("line")
                .transition()
                .duration(1000)
                .attr("x1",nodesFourth[next].x)
                .attr("y1",nodesFourth[next].y)
                .attr("x2",nodesFourth[id].x)
                .attr("y2",nodesFourth[id].y)
                .attr("stroke",colorLine)
                .attr("stroke-width",1)
                .attr("stroke-dasharray", 5)
                .attr("marker-start", "url(#arrow)");
        drawLabels4(next);   
    }
    drawLabels4(id);
    drawLabelMessage4("Eleição");
}

function broadcast4(id){
    hideLinks4();
    fourth.append("defs").append("marker")
                .attr("id", "arrow")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 8)
                .attr("refY", 0)
                .attr("markerWidth", 10)
                .attr("markerHeight", 10)
                .attr("orient", "auto-start-reverse")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5");
    for(i=0;i<nodesFourth.length;i++){
        if(i!=id){
            fourth.append("line")
                    .attr("x1",nodesFourth[i].x)
                    .attr("y1",nodesFourth[i].y)
                    .attr("x2",nodesFourth[id].x)
                    .attr("y2",nodesFourth[id].y)
                    .attr("stroke",colorLine)
                    .attr("stroke-width",1)
                    .attr("stroke-dasharray", 5)
                    .attr("marker-start", "url(#arrow)"); 
            drawLabels4(i); 
        }
    }
    drawLabels4(id);
    drawLabelMessage4("Coordenador");
}

function recive4(next,id)
{
    fourth.append("defs").append("marker")
                .attr("id", "arrow")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 8)
                .attr("refY", 0)
                .attr("markerWidth", 10)
                .attr("markerHeight", 10)
                .attr("orient", "auto-start-reverse")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5");
    
    fourth.append("line")
                .transition()
                .duration(1000)
                .attr("x1",nodesFourth[id].x)
                .attr("y1",nodesFourth[id].y)
                .attr("x2",nodesFourth[next].x)
                .attr("y2",nodesFourth[next].y)
                .attr("stroke",colorLine)
                .attr("stroke-width",1)
                .attr("stroke-dasharray", 5)
                .attr("marker-start", "url(#arrow)");
    
    drawLabels4(id);
    drawLabels4(next);
    drawLabelMessage4("OK");
}
function reset4(){
    for(i=0;i<10;i++){
        d3.select(".linha" + i).remove();
    }
    lider4=0;
    bestChoose4=0
    controleAlgoritmo4=[];
    restart4();
    nodesFourth=[];
    desenhoinitFourth();
    var idAux = document.getElementById("valueMap").value;
    var id = Number(idAux);
    controlNext4 = id;
    answer4(id,controleAlgoritmo4);
    console.log(controleAlgoritmo4);
}
function restart4(){
    fourth.selectAll("line").remove();
    fourth.selectAll("marker").remove();
    fourth.selectAll("rect").remove();
    fourth.selectAll("text").remove();
    contOp4 =-1;
    eleito4=-1;
    recives4 = [];
    controlRecives4=0;
    contRecv4=0;
    controlEnd4=0;
    var idAux = document.getElementById("valueMap").value;
    var id = Number(idAux);
    controlNext4 = id;
}
function resetScreen4(){
    var idAux = document.getElementById("valueMap").value;
    var id = Number(idAux);
    if (nodesFourth[id].participante==1)
    {
        alert("Nó inválido, não é participante!! Insira outro nó.");
        reset4();
    }
    reset4();
}
function addLine(objtt) {
    d3.select("#table").append("tr").attr("class","linha"+objtt)
                        .attr("align", "center")
                        .append("td").text(nodesFourth[objtt].id);
    d3.select(".linha"+objtt).append("td").append("input")
                                    .attr("type","number")
                                    .attr("step","1")
                                    .attr("min","1")
                                    .attr("max","10")
                                    .attr("class","form")
                                    .attr("value",nodesFourth[objtt].forca)
                                    .attr("id","mapValue"+objtt)
                                    .attr("oninput","simulator("+objtt+")");
}
 
function simulator(idf){
    var x = Number(document.getElementById("mapValue"+idf).value);

    if(x == ""){
        alert("Atenção! Forças não podem ficar vazias!");
        document.getElementById("mapValue" + idf).value = nodesFourth[idf].forca;
    }
    else{
        var flagr = false;

        for(i=0;i<n4;i++){
            if(nodesFourth[i].forca==x)
                flagr = true;
        }
        if(flagr){
            alert("Atenção! Forças devem ser únicas!");
            document.getElementById("mapValue" + idf).value = nodesFourth[idf].forca;
        }
        else{
            nodesFourth[idf].forca=x;
            lider4=0;
            bestChoose4=0
            recives4 = []; 
            controleAlgoritmo4=[];
            restart4();
            var idAux = document.getElementById("valueMap").value;
            var id = Number(idAux);
            controlNext4=id;
            chooseLider4();
            console.log("Aqui -- "+lider4+" g "+ idLider4);
            console.log("Aqui ee -- "+bestChoose4+" g "+ liderNew4);
            controlForcaChanged();
            answer4(id,controleAlgoritmo4);
            console.log(controleAlgoritmo4);
        }
    } 
}

function controlForcaChanged(){
    var j,k;
    for(j=0;j<n4;j++){ 
        nodesFourth[j].nodes = [];
        for(k=0;k<n4;k++){
            if (nodesFourth[j].forca<nodesFourth[k].forca)
                nodesFourth[j].nodes.push(k);
        }
    }
}
var slider4 = document.getElementById("sliderNodeFourth");
    slider4.oninput = function (){
        n4=this.value;
        nodesFourth.splice(0,10);
        d3.select("#fourthsvg").selectAll("circle").remove();
        d3.select("#fourthsvg").selectAll("path").remove();
        d3.select("#fourthsvg").selectAll("marker").remove();
        d3.select("#fourthsvg").selectAll("rect").remove();
        d3.select("#fourthsvg").selectAll("text").remove();
        reset4();
}

var slider3 = document.getElementById("sliderNodeThird");
    slider3.oninput = function (){
        n3=this.value;
        nodesThird.splice(0,10);
        d3.select("#thirdsvg").selectAll("circle").remove();
        d3.select("#thirdsvg").selectAll("path").remove();
        d3.select("#thirdsvg").selectAll("marker").remove();
        d3.select("#thirdsvg").selectAll("rect").remove();
        d3.select("#thirdsvg").selectAll("text").remove();
        reset();
        
}
var slider1 = document.getElementById("sliderNodeFirst");
    slider1.oninput = function (){
        n1=this.value;
        nodesFirst.splice(0,10);
        d3.select("#firstsvg").selectAll("circle").remove();
        d3.select("#firstsvg").selectAll("path").remove();
        d3.select("#firstsvg").selectAll("marker").remove();
        d3.select("#firstsvg").selectAll("rect").remove();
        d3.select("#firstsvg").selectAll("text").remove();
        desenhoinitFirst();
}
var slider5 = document.getElementById("sliderGrafo");
    slider5.oninput = function (){
        n5=this.value;
        nodesGrafo.splice(0,10);
        grafo.selectAll("circle").remove();
        initGrafo();
}
//Funções da navegação
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