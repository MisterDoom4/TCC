/*************************** DECLARAÇÃO DE VARIÁVEIS ***************************/
var laranja = '#ff9f1c';                       //cor laranja padrão
var largura;                             //largura da tela
var distancia = 40;                            //distância entre linhas
var processos = ['P0', 'P1', 'P2', 'P3'];
var svg1;
var svg2;
var vet_estatico = [];                         //vetor de eventos do svg estático
var vet_dinamico = [];                         //vetor de eventos do svg dinâmico
var cont = 0;                                  //contador para manipular os vetores
var parou = 0;

/*  checkpoints = [tipo de evento, lc, posição x, número do processo]
    envio de mensagens = [tipo de evento, lc, posição x, processo que enviou, processo de destino]
    
    Tipo de evento:
      1 - checkpoint básico
      2 - checkpoint forçado
      3 - envio de mensagem  */
vet_estatico = [
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 2],
    [1, 0, 0, 3],
    [1, 1, 10, 1],
    [3, 1, 13, 1, 3],
    [2, 1, 16, 3],
    [1, 2, 20, 1],
    [1, 1, 30, 0]
];

inicia();

d3.select(window).on('resize.updatesvg', updateWindow);

function updateWindow(){
    parou = cont;
    svg1.remove();
    svg2.remove();
    cont = 0;
    inicia();
}

/*************************** FUNÇÕES ***************************/
function inicia() {
    largura = window.innerWidth-250;
    if(largura > 600) {
        largura = 600;
    }

    svg1 = d3.select('#svg_estatico')          //variável que recebe o svg estático
            .append('svg')
            .style("width", largura)
            .style("height", 200);

svg2 = d3.select('#svg_dinamico')          //variável que recebe o svg dinâmico
.append('svg')
            .style("width", largura)
            .style("height", 300);
            

    linha_tempo(svg1);
    for(i=0; i<vet_estatico.length; i++) {
        evento(svg1, vet_estatico);
    }

        
console.log(parou);
    linha_tempo(svg2);
    cont = 0;
        if(parou != 0) {
            for(i=0; i<parou; i++) {
                evento(svg2, vet_estatico);
            }
        }
}

//cria uma linha do tempo para os processos
function linha_tempo(svg){
    svg.append("g").attr('id', 'gprocessos');     //cria grupo de svg's para nomes dos processos

    svg.select('#gprocessos').selectAll('text')   //desenha o nome dos processos
        .data(processos)
        .enter()
        .append('text')
        .text(function (d){return d})
        .attr('y', distancia)
        .attr('style', 'font-weight: bold')
        .attr('transform', function(d, i) {
            return "translate(0," + i * distancia + ")";
        });

    svg.selectAll('line')                       //desenha as linhas
        .data(processos)
        .enter()
        .append('line')
        .attr('x1', 31)
        .attr('x2', largura)
        .attr('y1', distancia-5)
        .attr('y2', distancia-5)
        .attr('style', 'stroke:rgb(0,0,0);stroke-width:1')
        .attr('transform', function(d, i) {
            return "translate(0," + i * distancia +")";
        });

        svg.append("g").attr('id', 'grelogios');      //cria grupo de svg's para relógios lógicos
        svg.append("g").attr('id', 'gmensagens');     //cria grupo de svg's para mensagens enviadas
        svg.append("g").attr('id', 'gcheckbasicos');  //cria grupo de svg's para checkpoints básicos
        svg.append("g").attr('id', 'gcheckforcados'); //cria grupo de svg's para checkpoints forçados
}

//desenha cada evento na linha do tempo
function evento(svg, vet){
    if(vet[cont][0] == 1 || vet[cont][0] == 2) {         //desenha checkpoint básico ou forçado
        if(vet[cont][0] == 1) {
            var svg_temp = svg.select('#gcheckbasicos').append('rect');  //prepara quadrado preenchido
        }

        if(vet[cont][0] == 2) {
            var svg_temp = svg.select('#gcheckforcados').append('rect')  //prepara quadrado vazio
                .attr('style', 'fill:rgb(255,255,255);stroke-width:2;stroke:rgb(0,0,0)');
        }

        svg_temp.attr('x', largura/40*vet[cont][2]+30)                     //desenha o quadrado
            .attr('y', vet[cont][3]*distancia+27+(600-largura)/80)
            .attr('width', largura/40)
            .attr('height', largura/40);

        svg.select('#grelogios').append('text')          //desenha valor do relógio lógico
            .text(vet[cont][1])
            .attr('x', largura/40*vet[cont][2] + 33)
            .attr('y', vet[cont][3]*distancia + 25);
    }
    else if(vet[cont][0] == 3){                          //desenha envio de mensagem
        svg.select('#gmensagens').append('polyline')     //desenha seta
            .attr('style', 'fill:black;stroke:black;stroke-width:1')
            .attr('points', function(d) {
                return (largura/40*vet[cont][2]+30) + "," + (distancia*vet[cont][3]+35) + " " + 
                (largura/40*vet[cont][2]+largura/30+30) + "," + (distancia*vet[cont][4]+28) + " " + 
                (largura/40*vet[cont][2]+largura/26.1+30) + "," + (distancia*vet[cont][4]+27) + " " + 
                (largura/40*vet[cont][2]+largura/27.3+30) + "," + (distancia*vet[cont][4]+34) + " " + 
                (largura/40*vet[cont][2]+largura/35.3+30) + "," + (distancia*vet[cont][4]+29) + " " +
                (largura/40*vet[cont][2]+largura/30+30) + "," + (distancia*vet[cont][4]+28) + " ";
        });

        svg.select('#gmensagens').append('text')         //desenha mensagem enviada (m.lc)
            .text("(" + vet[cont][1] + ")")
            //.attr('fill', 'red')
            .attr('x', largura/40*vet[cont][2]+largura/27.3+30)
            .attr('y', vet[cont][4]*distancia+15);

        //grafico.remove();
    }
    cont++;                                              //incrementa contador a cada chamada da função
}

function showProcessos(){
    svg1.select('#gprocessos')
    .selectAll('text')
    .attr('fill', laranja);
}

function unshowProcessos(){
    svg1.select('#gprocessos')
    .selectAll('text')
    .attr('fill', 'black');
}

function showRelogio(){
    svg1.select('#grelogios')
    .selectAll('text')
    .attr('fill', laranja);
}

function unshowRelogio(){
    svg1.select('#grelogios')
    .selectAll('text')
    .attr('fill', 'black');
}

function showMensagem(){
    svg1.select('#gmensagens')
    .selectAll('text')
    .attr('fill', laranja);

    svg1.select('#gmensagens')
    .selectAll('polyline')
    .style('fill', laranja)
    .style('stroke', laranja);
}

function unshowMensagem(){
    svg1.select('#gmensagens')
    .selectAll('text')
    .attr('fill', 'black');

    svg1.select('#gmensagens')
    .selectAll('polyline')
    .attr('style', 'fill:black;stroke:black;');
}

function showCheckBasico(){
    svg1.select('#gcheckbasicos')
    .selectAll('rect')
    .style('fill', laranja);
}

function unshowCheckBasico(){
    svg1.select('#gcheckbasicos')
    .selectAll('rect')
    .style('fill', 'black');
}

function showCheckForcado(){
    svg1.select('#gcheckforcados')
    .selectAll('rect')
    .style('fill', 'rgb(255,255,255)')
    .style('stroke-width', '2')
    .style('stroke', laranja);
}

function unshowCheckForcado(){
    svg1.select('#gcheckforcados')
    .selectAll('rect')
    .attr('style', 'fill:rgb(255,255,255);stroke-width:2;stroke:black');
}