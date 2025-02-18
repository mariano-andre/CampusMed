const timeInicioAtendimento = document.getElementById('timeInicioAtendimento');
const timeFimAtendimento = document.getElementById('timeFimAtendimento');
const inNomeAluno = document.getElementById('inNomeAluno')
const inMatriculaAluno = document.getElementById('inMatriculaAluno');
const inHDA = document.getElementById('inHDA');
const inTratamento = document.getElementById('inTratamento');
const btCadastrar = document.getElementById('btCadastrar');


btCadastrar.addEventListener('click', ()=>{
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = agora.getMonth()+1;
    const dia = agora.getDate()

    const data = `${ano}-${mes}-${dia}`;
    const inicio = timeInicioAtendimento.value;
    const fim = timeFimAtendimento.value;
    const nomeCompleto = inNomeAluno.value;
    const matricula = inMatriculaAluno.value;
    const HDA = inHDA.value;
    const tratamento = inTratamento.value;

    const prontuario = {
        matricula: matricula,
        data: data,
        inicioAtendimento: inicio,
        fimAtendimento: fim,
        HDA: HDA,
        tratamento: tratamento
    };

    document.querySelectorAll('input[type="time"], input[type="text"], textarea').forEach(e => {
        if(e.value == ''){
            e.focus();
            showMsg('Preencha todos os campos.', 1500, 'rgb(206, 41, 41)');
            throw new Error('Preencha todos os campos.')
        }
    })

    const aluno = {
        matricula: matricula,
        nomeCompleto: nomeCompleto
    };

    fetch('/alunos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aluno),
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error('Erro ao cadastrar aluno!')
        }
        return response.json();
    })
    .then((data) => {
        return showMsg('Prontuário cadastrado com sucesso!', 1500, 'green')
    })
    .catch((error) => {
        console.error('Erro:', error)
        showMsg('Erro ao cadastrar prontuário!', 1500, 'rgb(206, 41, 41)')
    })
    
    fetch('/prontuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prontuario),
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error('Erro ao cadastrar prontuário!')
        }
        return response.json();
    })
    .then((data) => {
        console.log('Prontuário cadastrado com sucesso!');
    })
    .catch((error) => {
        console.error('Erro:', error)
    })
})


// FUNÇÃO QUE EXIBE MENSAGEM DE ERRO
const showMsg = (msg, time, color) =>{
    const msgError = document.querySelector('.msg-span')
    msgError.classList.remove('hidden');
    msgError.style.background = color

    msgError.textContent = msg;

    setTimeout(() => {
        msgError.classList.add('hidden')
    }, time);
}