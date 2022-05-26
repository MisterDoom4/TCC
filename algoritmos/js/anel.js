
function desenhoinit () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
                        
    var i, x, y, angle, aux, n;
    
    n=10;
    
    for(i=0;i<n;i++){
        angle = 2*3.14159265359*i/n;
        x=Math.cos(angle)*103;
        y=Math.sin(angle)*103;
        
        ctx.beginPath();
        ctx.arc(x+150,y+150,10,0,2*Math.PI);
        ctx.stroke();
    }
} 

window.onload = desenhoinit();

function myEnterFunction() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
                      
    var i, x, y, angle, aux, n;

    n=10;

    for(i=0;i<n;i++){
        angle = 2*3.14159265359*i/n;
        x=Math.cos(angle)*103;
        y=Math.sin(angle)*103;

        ctx.beginPath();
        ctx.arc(x+150,y+150,10,0,2*Math.PI);
        ctx.fillStyle = 'orange' ;
        ctx.fill();
    }
}

function myOutFunction() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
                      
    var i, x, y, angle, aux, n;

    n=10;

    for(i=0;i<n;i++){
        angle = 2*3.14159265359*i/n;
        x=Math.cos(angle)*103;
        y=Math.sin(angle)*103;

        ctx.beginPath();
        ctx.arc(x+150,y+150,10,0,2*Math.PI);
        ctx.fillStyle = 'white' ;
        ctx.fill();
    }
}

function mouseEnter() {
    document.getElementById("demo").style.color = "red";
}

function mouseLeave() {
    document.getElementById("demo").style.color = "black";
}
