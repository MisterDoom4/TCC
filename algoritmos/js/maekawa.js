var arrayNodes = [];
var fila = [];
var operation = "SEND";
var Node = {
    x: x0,
    y: y0,
    id: p,
    state: 'RELEASED',
    queue: [],
    clock,
    vote
};
arrayNodes.push(newNode);
var newVote = [bool, id]
var electionGrups = [];

//broadcast para o grupo que ele recebeu voto 
function sendLiberation(id) {
    //resetVoteGroup(groupId)
}

//reseta os votos do grupo de um processo que sai de HELD
function resetVoteGroup(params) {
    
}

//retorna o Node dentro de arrayNodes a partir do id de um Node
function getNode(id) {
 
    //................. 
    
    return  arrayNodes[index].id.find(element => element == id);
}

//Group tem os id's para quem se deve enviar as mensagens
function sendMessage(Node, Group) {
    
    //getNode(Group[index]);
    
    //................
}

//passa por todos os Node de Group verificando quantos votos ele ganha
function acessAnalisys(Node, Group) {
    let kVotes = 0;
    Group.forEach(element => {
        let processoDestino = getNode(element);
        if (element != Node.id) {
            if (processoDestino.message === "RELEASED" && processoDestino.vote === false) {
                kVotes++;
                processoDestino.vote = true;
                desenharMensagem(Node, processoDestino);
            } else {
                if (processoDestino.message === "HELD") { 
                    if (arrayNodes[i].filaProcesso.find(element => element == processoSolicitante.id) == undefined) {
                        arrayNodes[i].filaProcesso.push(processoSolicitante.id);
                        desenharFila(arrayNodes[i]);
                    }

                } else {
                    if (processoDestino.message == "WANTED" && processoDestino.vote === false) {
                        if (processoDestino.clock > Node.clock) {
                            acesso++;
                            processoDestino.vote = true;
                            desenharMensagem(Node, processoDestino);
                            if (arrayNodes[i].filaProcesso.find(element => element == processoSolicitante.id) == undefined) {
                                processoSolicitante.filaProcesso.push(arrayNodes[i].id);
                                desenharFila(processoSolicitante);
                            }

                        } else {
                            processoDestino.fila.push(Node);
                        }
                    }
                    if (processoDestino.message == "WANTED" && processoDestino.vote === true) {
                        processoDestino.fila.push(Node);
                    }
                }
            }
    
        }
    })
}
// quando o usuário cliclar volta para o topo
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function requireAcess(Node) {
    let kVotes = 0;

    index = findGroup(Node, Groups)    //retorna o index de um grupo que contenha o Node requisitante
    sendMessage(Groups[index]);           //envia menssagem a todos os processos daquele grupo
    kVotes = acessAnalisys(Groups[index]);            //analisa as resposta de cada elemento do grupo
 
    if (kVotes === electionGrups[index].length - 1) {
        Node.state = 'HELD';
        Node.vote.id = index;
    }
}
