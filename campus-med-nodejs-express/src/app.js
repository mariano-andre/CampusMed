import express from 'express';
import ProntuarioController from './app/controllers/ProntuarioController.js';
import AlunoController from './app/controllers/AlunoController.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// indicar para o express ler body com json
app.use(express.json());

// permitir linkagem entre os arquivos
app.use(express.static(__dirname + '/public'));

// ROTAS
app.get('/cadastrar', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/prontuarios', ProntuarioController.index);
app.get('/prontuarios/:nome', ProntuarioController.show);
app.post('/prontuarios', ProntuarioController.store);
app.put('/prontuarios/:id', ProntuarioController.update);
app.delete('/prontuarios/:id', ProntuarioController.delete);

app.get('/alunos', AlunoController.index);
app.get('/alunos/:nome', AlunoController.show);
app.post('/alunos', AlunoController.store);
app.put('/alunos/:id', AlunoController.update);
app.delete('/alunos/:id', AlunoController.delete);

export default app;
