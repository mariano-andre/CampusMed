const btBuscar = document.getElementById('btBuscar');
const tbInfos = document.getElementById('tbInfos');
const inNome = document.getElementById('inNome')

class Aluno{
    constructor(_nome, _ultimoAtendimento, _atendimentosRegistrados, _matricula, _id){
        this.nome = _nome;
        this.ultimoAtendimento = _ultimoAtendimento;
        this.atendimentosRegistrados = _atendimentosRegistrados;
        this.matricula = _matricula;
        this.id = _id;
    }
}

const getAlunos = () =>{
    const nome = matricula = inNome.value;
    const alunos = [];

    fetch(`/alunos/${nome}/${matricula}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error('Erro ao buscar Alunos!')
        }
        return response.json();
    })
    .then( async(data) => {

        for(let i in data){
            const aluno = data[i];
            
            const matricula = aluno.matricula;
            let ultimaConsulta;

            // DESCOBRE A ÚLTIMA CONSULTA REALIZADA PELO ALUNO
            await fetch(`/prontuarios/${matricula}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Erro ao buscar prontuários!')
                }
                return response.json();
            })
            .then((data) => {
                if(data.length == 0){
                    return ultimaConsulta = '-'
                }
                
                const ultimaData = (data[0].dataConsulta).slice(0, 10);
                const ultimaHora = (data[0].inicioAtendimento).slice(0, 5)
                ultimaConsulta = `${ultimaData}\tàs\t ${ultimaHora}`
            })
            .catch((error) => {
                console.error('Erro:', error)
            })
            
            // CONTA A QUANTIDADE DE CONSULTAS REALIZADAS PELO ALUNO
            let qtdConsultas;
            await fetch(`/prontuarios/count/${matricula}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if(!response.ok){
                    throw new Error('Erro ao contar a quantidade de consultas realizadas!');
                }
                return response.json();
            })
            .then(data => {
                qtdConsultas = Object.values(data[0])[0];
            })
            
            const novoAluno = new Aluno(aluno.nomeCompleto, ultimaConsulta, qtdConsultas, aluno.matricula, aluno.idAluno);
            alunos.push(novoAluno);
        }

        tbInfos.innerHTML = '';
    
        alunos.forEach(aluno => {
            const newTr = document.createElement('tr');
        
            for(let att in aluno){
                att!='id' ? (newTr.innerHTML += `<td>${aluno[att]}</td>`) : (newTr.innerHTML += `<td style="display: none">${aluno[att]}</td>`);
            }
        
            tbInfos.appendChild(newTr);
        })
    })
    .catch((error) => {
        console.error('Erro:', error)
    })
}

btBuscar.addEventListener('click', ()=> {
    getAlunos();
});

inNome.addEventListener('keypress', (e)=>{
    e.key == 'Enter' ? getAlunos() : [];
})