/*************************** DECLARAÇÃO DE VARIÁVEIS ***************************/
var laranja = '#ff9f1c';                       //cor laranja padrão
var azul= '#2892d7';
var azulEscuro= '#104E8B';
var largura;                                   //largura da tela
var distancia = 40;                            //distância entre linhas
var processos = ['P0', 'P1', 'P2', 'P3'];      //nomes dos processos
var svg1, svg2;                                //varável que vai guardar os svg's estático e dinâmico
var cont = 0;                                  //contador para manipular os vetores de eventos
var parou = 0;                                 //guarda em qual evento estava no momento do redimensionamento de tela

//vetor de eventos do svg estático
vet_estatico = [
    { evento: 'checkBasico', lc: 0, posicao: 0, processo: 0 },
    { evento: 'checkBasico', lc: 0, posicao: 0, processo: 1 },
    { evento: 'checkBasico', lc: 0, posicao: 0, processo: 2 },
    { evento: 'checkBasico', lc: 0, posicao: 0, processo: 3 },
    { evento: 'checkBasico', lc: 1, posicao: 10, processo: 1 },
    { evento: 'envioMsg', lc: 1, posicao: 13, processoEnviou: 1, processoDestino: 3 },
    { evento: 'checkForcado', lc: 1, posicao: 12, processo: 3 },
    { evento: 'checkBasico', lc: 2, posicao: 20, processo: 1 },
    { evento: 'checkBasico', lc: 1, posicao: 30, processo: 0 }
];

inicia();

// Define o comportamento dos svg's quando a janela é redimensionada
d3.select(window).on('resize.updatesvg', reinicia(cont));

/*************************** FUNÇÕES ***************************/
// Cria os svg's
function inicia() {
    largura = window.innerWidth-250;
    if (largura > 600) {
        largura = 600;
    }

    svg1 = d3.select('#svg_estatico')          //variável que recebe o svg estático
            .append('svg')
            .attr('id', 'svg1')
            .style("width", largura)
            .style("height", 200);

    svg2 = d3.select('#svg_dinamico')          //variável que recebe o svg dinâmico
            .append('svg')
            .style("width", largura)
            .style("height", 200);
            
    // Cria a linha do tempo já populada com os eventos para o svg estático
    linha_tempo(svg1);
    for (i=0; i<vet_estatico.length; i++) {
        evento(svg1, vet_estatico);
    }

    // Cria apenas a linha do tempo sem os eventos para o svg dinâmico
    // Insere os eventos até o ponto em que parou em caso de redimensionamento de janela
    linha_tempo(svg2);
    cont = 0;
    if(parou != 0) {
        for(i=0; i<parou; i++) {
            evento(svg2, vet_estatico);
        }
    }

    svg2.select('#gprocessos').style('fill', azulEscuro);
}

// Cria uma linha do tempo para os processos
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
    // Para a execução do protocolo quando chega ao final do vetor de dados
    if (cont === vet.length) {
        return;
    }

    var cor = 'black';

    if (svg === svg2 && cont >= 4) {
        cor = laranja;
        descreveAcao(vet[cont].evento);
    }

    // Colorindo os eventos do svg dinâmico
    svg2.select('#gcheckbasicos').selectAll('rect').style('fill', azul);
    svg2.selectAll('rect').style('stroke', azul);
    svg2.selectAll('polyline').style('fill', azulEscuro).style('stroke', azulEscuro);
    svg2.select('#grelogios').selectAll('text').style('fill', azul);
    svg2.select('#gmensagens').selectAll('text').style('fill', azulEscuro);

    if(vet[cont].evento === 'checkBasico' || vet[cont].evento === 'checkForcado') {         //desenha checkpoint básico ou forçado
        if(vet[cont].evento === 'checkBasico') {
            var svg_temp = svg.select('#gcheckbasicos')                  //prepara quadrado preenchido
                .append('rect')
                .style('fill', cor);
        }

        if(vet[cont].evento === 'checkForcado') {
            var svg_temp = svg.select('#gcheckforcados').append('rect')  //prepara quadrado vazio
                .attr('style', 'fill:rgb(255,255,255);stroke-width:2;')
                .style('stroke', cor);
        }

        svg_temp.attr('x', largura/40*vet[cont].posicao+30)                     //desenha o quadrado
            .attr('y', vet[cont].processo*distancia+27+(600-largura)/80)
            .attr('width', largura/40)
            .attr('height', largura/40);

        svg.select('#grelogios').append('text')          //desenha valor do relógio lógico
            .text(vet[cont].lc)
            .attr('x', largura/40*vet[cont].posicao + 33)
            .attr('y', vet[cont].processo*distancia + 25)
            .style('fill', cor);
    }
    else if(vet[cont].evento === 'envioMsg'){                          //desenha envio de mensagem
        svg.select('#gmensagens').append('polyline')     //desenha seta
            .style('stroke-width', 1)
            .style('fill', cor)
            .style('stroke', cor)
            .attr('points', function(d) {
                return (largura/40*vet[cont].posicao+30) + "," + (distancia*vet[cont].processoEnviou+35) + " " + 
                (largura/40*vet[cont].posicao+largura/30+30) + "," + (distancia*vet[cont].processoDestino+28) + " " + 
                (largura/40*vet[cont].posicao+largura/26.1+30) + "," + (distancia*vet[cont].processoDestino+27) + " " + 
                (largura/40*vet[cont].posicao+largura/27.3+30) + "," + (distancia*vet[cont].processoDestino+34) + " " + 
                (largura/40*vet[cont].posicao+largura/35.3+30) + "," + (distancia*vet[cont].processoDestino+29) + " " +
                (largura/40*vet[cont].posicao+largura/30+30) + "," + (distancia*vet[cont].processoDestino+28) + " ";
        });

        svg.select('#gmensagens').append('text')         //desenha mensagem enviada (m.lc)
            .text("(" + vet[cont].lc + ")")
            .attr('x', largura/40*vet[cont].posicao+largura/27.3+30)
            .attr('y', vet[cont].processoDestino*distancia+15)
            .attr('fill', cor);
    }
    cont++;                                              //incrementa contador a cada chamada da função

    // Mostra os 4 checkpoints iniciais de uma vez só
    if (svg === svg2 && cont === 1) {
        for (i=0; i < 3; i++) {
            evento(svg, vet);
        }
        svg2.select('#gcheckbasicos').selectAll('rect').style('fill', laranja);
        svg2.selectAll('rect').style('stroke', laranja);
        svg2.select('#grelogios').selectAll('text').style('fill', laranja);
        descreveAcao('checkInicial');
    }
}

// Reinicia os svg's e retorna o svg dinâmico no ponto do evento passado por parâmetro
function reinicia(idEvento) {
    if (idEvento < 0) {
        idEvento = 0;
    }
    if (idEvento === 0) {
        d3.select('#acoes').text('');
    }
    parou = idEvento;
    cont = 0;
    svg1.remove();
    svg2.remove();
    inicia();
}

// Mostra a descrição de cada evento
function descreveAcao(evento) {
    switch (evento) {
        case 'checkInicial':
            d3.select('#acoes').html('Checkpoints iniciais: <font color=#7b7b7b>&emsp;lc = 0</font> ');
        break;
        case 'checkBasico':
            d3.select('#acoes').html('Checkpoint básico: <font color=#7b7b7b>&emsp;lc = lc + 1</font> ');
        break;
        case 'checkForcado':
            d3.select('#acoes').html('Checkpoint forçado: <font color=#7b7b7b>&emsp;lc = m.lc</font> ');
        break;
        case 'envioMsg':
            d3.select('#acoes').html('Envio/recebimento de mensagem: <font color=#7b7b7b>&emsp;m.lc > lc ?</font>  <br>-> Sim: tira checkpoint forçado <br>-> Não: continua normalmente');
        break;
        default:
            break;
    }
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
    .style('fill', laranja);
}

function unshowRelogio(){
    svg1.select('#grelogios')
    .selectAll('text')
    .style('fill', 'black');
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