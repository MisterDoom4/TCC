var canvas = d3.select("#background")
                .append("svg")
                .attr("width", 300)
                .attr("height", 300);
//Adiciona svg 300x300 na div de id "background"

var i, x, y, radio=15, angle, aux, n=3; //variáveis numéricas
//var tx=98.50000000000003, ty = 239.2006165897972+5;
//var tx=253, ty = 150;
var tx=0,ty =0,alfa;
var nodes = [];//array onde serão guardados as infos sobre os nós

var teste;//variável de controle de estado dos nós

function desenhoinit(){
    for(i=0;i<n;i++){
        angle = 2*Math.PI*i/n;
        x=Math.cos(angle)*103 + 150;
        y=Math.sin(angle)*103 + 150;
        angle=angle+(Math.PI/2);

        var newNode = {x, y, id: i, angle};
        nodes.push(newNode);
                
        canvas.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", radio)
                .attr("stroke", "RoyalBlue")
                .attr("stroke-width", 1)
                .attr("fill", "CornflowerBlue")
                .append("title")
                .text("P"+i);
    }
    
                    
    teste = d3.selectAll("circle");
    teste.on("mouseover", showLinks);
    teste.on("mouseout", hideLinks);
}

window.onload = desenhoinit(); //carrega desenho na tela ao abrir a página

function showNodes(){ //função apenas para conferir dados dos nós
    console.log(nodes);
}

function arrow(arrow_x,arrow_y,ang){

    var data = [[tx, ty-radio], 
    [tx-radio, ty-radio*2], 
    [tx+radio, ty-radio*2], 
    [tx, ty-radio]];
    
    //console.log(ang);
    
    /* Safe copy 
    var data = [[tx+radio, ty], 
    [tx+radio*2, ty-radio], 
    [tx+radio*2, ty+radio], 
    [tx+radio, ty]];
    var data = [[arrow_x+x1, arrow_y+y1], 
    [arrow_x+x1*2, arrow_y+y1-radio], 
    [arrow_x+x1*2, arrow_y+y1+radio], 
    [arrow_x+x1, arrow_y+y1]];*/

    var lineGenerator = d3.line();
    var pathString = lineGenerator(data);
    
    canvas.append("path")
            .attr('d', pathString)
            .attr("transform","translate("+(arrow_x)+","+(arrow_y)+") rotate("+ang+","+(tx)+","+(ty-radio)+")");           
}

function localX(angX){
    return Math.cos(angX+0.198*2-(alfa))*103 + 150;         
}

function localY(angY){
    return  Math.sin(angY+0.198*2-(alfa))*103 + 150+radio;
}

function showLinks(){//em construção ainda
    var coords = d3.mouse(this);
    d3.select(this).style('fill', 'orange');
    for(i=0;i<nodes.length;i++){
        if(coords[0]>=nodes[i].x-20 && coords[0]<=nodes[i].x+20 && coords[1]>=nodes[i].y-20 && coords[1]<=nodes[i].y+20){
            var id=nodes[i].id;
        }
    }

    var previous, next,v;
    v = 360/(Math.pow(n,3));
    alfa = nodes[n-1].angle - 5.759586531581287;
    
    k = (360/n);

    if(id==0){
        previous=nodes.length-1;
        next=id+1;
    }
    else{
        if(id==(nodes.length-1)){
            previous=id-1;
            next=0;
        }
        else{
            previous=id-1;
            next=id+1;
        }
    }
    
    if(id===nodes.length-1){
        var arc1 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodes[previous].angle+0.198)
                    .endAngle(nodes[id].angle-0.198);
        var arc2 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodes[id].angle+0.198)
                    .endAngle(nodes[next].angle-0.198+(2*Math.PI));              
    }
    else{
        if(id===0){
            var arc1 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodes[previous].angle+0.198-(2*Math.PI))
                    .endAngle(nodes[id].angle-0.198);
            var arc2 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodes[id].angle+0.198)
                    .endAngle(nodes[next].angle-0.198);       
        }
        else{
            var arc1 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodes[previous].angle+0.198)
                    .endAngle(nodes[id].angle-0.198);
            var arc2 = d3.arc()
                    .innerRadius(102.5)
                    .outerRadius(103.5)
                    .startAngle(nodes[id].angle+0.198)
                    .endAngle(nodes[next].angle-0.198);
        }
    }
    
    //arrow(localX(nodes[previous].angle),localY(nodes[previous].angle),(nodes[previous].angle*(180/Math.PI))+v);
    //arrow(localX(nodes[id].angle),localY(nodes[id].angle),(nodes[id].angle*(180/Math.PI))+v);
    
    arrow(localX(nodes[previous].angle),localY(nodes[previous].angle),(id*k));
    arrow(localX(nodes[id].angle),localY(nodes[id].angle),next*k);

    canvas.append("path")
            .attr("d", arc1)
            .attr("transform", "translate(150, 150)");

    canvas.append("path")
            .attr("d", arc2)
            .attr("transform", "translate(150, 150)");    
    
}

function hideLinks(){ //devolve o desenho para o estado anterior sem as ligações entre os nós
    d3.select(this).style('fill', 'CornflowerBlue');
    d3.selectAll("path")
        .remove();
}

var slider1 = document.getElementById("sliderNode");
    slider1.oninput = function (){
        n=this.value;
        nodes.splice(0,10);
        d3.selectAll("circle").remove();
        desenhoinit();
}//muda a quantidade de nós no desenho de acordo com o slider no html