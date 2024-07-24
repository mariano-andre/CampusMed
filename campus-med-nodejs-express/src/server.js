import app from './app.js';

const PORT = 3000;

// fazer conexao
app.listen(PORT, ()=>{
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
})