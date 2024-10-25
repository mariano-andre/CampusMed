const urlParams = new URLSearchParams(window.location.search);
const matricula = urlParams.get('matricula');

const tbPronts = document.getElementById('tbPronts')

fetch(`/alunos/${matricula}/${matricula}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if(!response.ok) {
        showError('Não foi possível obter dados deste aluno', 1500)
        throw new Error('Erro ao buscar Alunos!');
    }
    return response.json();
})
.then(data => {
    document.getElementById('outNome').textContent = `Dados do aluno ${data[0].nomeCompleto}`;

    // BUSCAR PRONTUÁRIOS DO ALUNO
    showProntuarios();
})


// FUNÇÃO QUE EXIBE PRONTUÁRIOS DO ALUNO NA TABELA
const showProntuarios = () => {
    fetch(`/prontuarios/${matricula}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            showError('Não foi possível obter prontuários deste aluno', 1500)
            throw new Error('Erro ao buscar Alunos!');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(pront => {
            const newTr = document.createElement('tr');
            newTr.innerHTML = `<td>${pront.dataConsulta.slice(0, 10)}</td>
            <td>${pront.inicioAtendimento.slice(0, 5)} às ${pront.fimAtendimento.slice(0, 5)}</td>
            <td>${pront.HDA}</td>
            <td>${pront.tratamento}</td>`;
            tbPronts.appendChild(newTr);
        })
    })
}


// FUNÇÃO QUE EXIBE MENSAGEM DE ERRO
const showError = (msg, time) =>{
    msgError.classList.remove('hidden');

    msgError.textContent = msg;

    setTimeout(() => {
        msgError.classList.add('hidden')
    }, time);
}
