const btBuscar = document.getElementById('btBuscar');
const tbInfos = document.getElementById('tbInfos');

class Aluno{
    constructor(_nome, _ultimoAtendimento, _atendimentosRegistrados, _matricula){
        this.nome = _nome;
        this.ultimoAtendimento = _ultimoAtendimento;
        this.atendimentosRegistrados = _atendimentosRegistrados;
        this.matricula = _matricula;
    }
}

const mostrarAlunos = () =>{
    tbInfos.innerHTML = '';
    //substituir vetor por informações recebidas no back-end
    const alunos = [new Aluno('adre', 'oi', '5', '202'), new Aluno('opaaaa', 'epa', '45', '902')];

    alunos.forEach(aluno => {
        const newTr = document.createElement('tr');
    
        for(let att in aluno){
            newTr.innerHTML += `<td>${aluno[att]}</td>`;
            console.log(aluno[att]);
        }
    
        tbInfos.appendChild(newTr);
    })
}

btBuscar.addEventListener('click', mostrarAlunos)