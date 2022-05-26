var canvas = d3.select("#background")
                        .append("svg")
                        .attr("width", 300)
                        .attr("height", 300);


        var i, x, y, angle, aux, n=3;
        var nodes = [];

        var teste = d3.selectAll("circle");

        function desenhoinit(){
            for(i=0;i<n;i++){
                angle = 2*3.14159265359*i/n;
                x=Math.cos(angle)*103 + 150;
                y=Math.sin(angle)*103 + 150;
                angle=angle+(Math.PI/2);
                var newNode = {x, y, id: i, angle};
                nodes.push(newNode);
                canvas.append("circle")
                            .attr("cx", x)
                            .attr("cy", y)
                            .attr("r", 20)
                            .attr("stroke", "black")
                            .attr("stroke-width", 1)
                            .attr("fill", "CornflowerBlue")
                            .append("title")
                            .text("P")
                            .append("sub")
                            .text(i);
            }
            teste = d3.selectAll("circle");
            //teste.on("mousedown", showCoord);
            teste.on("mouseover", showCoord);
            teste.on("mouseout", hideCoord);
        }

        window.onload = desenhoinit();

        function addNode(){
            //if(d3.event.button==0){
                nodes.splice(0,10);
                if(n<10)
                    n++;
                d3.selectAll("circle").remove();
                desenhoinit();
                
                d3.selectAll("circle").transition()
                    .duration(2500)
                    .attr("stroke", "black");
            //}
        }

        function removeNode(){
           // if(d3.event.button==0){
                nodes.splice(0,10);
                if(n>3)
                    n--;
                d3.selectAll("circle").remove();
                desenhoinit();
                d3.selectAll("circle").transition()
                    .duration(2500)
                    .attr("stroke", "black");
            //}
        }

        function showNodes(){
            console.log(nodes);
        }

        function showCoord(){
            var coords = d3.mouse(this);
            d3.select(this).style('fill', 'orange');
            for(i=0;i<nodes.length;i++){
                if(coords[0]>=nodes[i].x-20 && coords[0]<=nodes[i].x+20 && coords[1]>=nodes[i].y-20 && coords[1]<=nodes[i].y+20){
                    var id=nodes[i].id;
                }
            }

            var previous, next;
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
            if(nodes[previous].angle>nodes[next].angle){
                var an;
                an=(2*Math.PI)/nodes.length;
                var arc = d3.arc()
                            .innerRadius(101.5)
                            .outerRadius(104.5)
                            .startAngle(nodes[previous].angle)
                            .endAngle(nodes[previous].angle+(2*an));
            }
            else{
                var arc = d3.arc()
                            .innerRadius(101.5)
                            .outerRadius(104.5)
                            .startAngle(nodes[previous].angle)
                            .endAngle(nodes[next].angle);
            }

            canvas.append("path")
                    .attr("d", arc)
                    .attr("transform", "translate(150, 150)");

            /*    var data = [[nodes[next].x-0.198, nodes[next].y-0.198], 
            [nodes[next].x+15, nodes[next].y-15], 
            [nodes[next].x+15, nodes[next].y+15], 
            [nodes[next].x, nodes[next].y]];

    var lineGenerator = d3.line();
    var pathString = lineGenerator(data);

    canvas.append("path").attr('d', pathString); 

           var conex = canvas.append("line")
                            .attr("x1", nodes[id].x)
                            .attr("y1", nodes[id].y)
                            .attr("x2", nodes[previous].x)
                            .attr("y2", nodes[previous].y)
                            .attr("stroke-width", 2)
                            .attr("stroke", "black");

            var conex = canvas.append("line")
                            .attr("x1", nodes[id].x )
                            .attr("y1", nodes[id].y)
                            .attr("x2", nodes[next].x)
                            .attr("y2", nodes[next].y)
                            .attr("stroke-width", 2)
                            .attr("stroke", "black");*/

            /*var data = [[ nodes[id].x, nodes[id].y], 
                        [ nodes[id].x, nodes[id].y], 
                        [nodes[next].x, nodes[next].y]];

            var lineGenerator = d3.value();
            var pathString = data;

            var conex = canvas.append("svg:path"); 
                d3.select('path').attr('d', pathString);*/

            /*var data = [[nodes[next].x, nodes[next].y], 
                        [nodes[next].x+(40/1.73205080757), nodes[next].y-(40/1.73205080757)], 
                        [nodes[next].x+(40/1.73205080757), nodes[next].y+(40/1.73205080757)], 
                        [nodes[next].x, nodes[next].y]];

            var lineGenerator = d3.line();
            var pathString = lineGenerator(data);

            var conex = canvas.append("path"); 
                d3.select('path').attr('d', pathString);/**/

            /*
            var arc = d3.arc()
                            .innerRadius(103)
                            .outerRadius(104)
                            .startAngle(nodes[previous].angle)
                            .endAngle(nodes[id].angle);

            canvas.append("path")
                    .attr("d", arc)
                    .attr("transform", "translate(150, 150)");(como colocar no sentido antihorario)

            var arc = d3.arc()
                            .innerRadius(103)
                            .outerRadius(104)
                            .startAngle(nodes[id].angle)
                            .endAngle(nodes[next].angle);

            canvas.append("path")
                    .attr("d", arc)
                    .attr("transform", "translate(150, 150)");
            */
        }
        function hideCoord(){
            d3.select(this).style('fill', 'CornflowerBlue');
            //d3.selectAll("line")
            d3.selectAll("path")
                .remove();
        }

        var slider1 = document.getElementById("sliderNode");
        slider1.oninput = function (){
        	n=this.value;
        	nodes.splice(0,10);
        	d3.selectAll("circle").remove();
            desenhoinit();
        }


function openNav() {
    document.getElementById("myNav").style.width = "100%";
}
          
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}