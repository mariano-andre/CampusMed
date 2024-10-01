import express from 'express';
import routes from './routes.js';

const app = express();

// indicar para o express ler body com json
app.use(express.json());

// usar o router
app.use(routes);


// ENTREGA O FRONT-END
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// permitir linkagem entre os arquivos
app.use(express.static(__dirname + '/public'));

app.get('/cadastrar', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/cadastro/index.html'));
})
app.get('/buscar', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/busca/index.html'));
})


export default app;
