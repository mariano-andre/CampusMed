
const statusInner = document.querySelector('.status-inner');
const selStatus = document.getElementById('selStatus');
const btSalvarStatus = document.getElementById('btSalvarStatus');

btSalvarStatus.addEventListener('click', ()=>{
    const status = selStatus.value;

    switch(status){
        case 'disponivel':
            statusInner.style.backgroundColor = '#7AB14F';
        break;
        case 'em atendimento':
            statusInner.style.backgroundColor = '#D3B54B';
        break;
        case 'volto logo':
            statusInner.style.backgroundColor = '#E58E5D';
        break;
        case 'fim do expediente':
            statusInner.style.backgroundColor = '#B14F4F'
        break;
    }
})
