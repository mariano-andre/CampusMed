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