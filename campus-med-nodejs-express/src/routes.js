import { Router } from "express";
import ProntuarioController from './app/controllers/ProntuarioController.js';
import AlunoController from './app/controllers/AlunoController.js';

const router = Router();

// ROTAS
router.get('/prontuarios', ProntuarioController.index);
router.get('/prontuarios/:nome', ProntuarioController.show);
router.post('/prontuarios', ProntuarioController.store);
router.put('/prontuarios/:id', ProntuarioController.update);
router.delete('/prontuarios/:id', ProntuarioController.delete);

router.get('/alunos', AlunoController.index);
router.get('/alunos/:nome', AlunoController.show);
router.post('/alunos', AlunoController.store);
router.put('/alunos/:id', AlunoController.update);
router.delete('/alunos/:id', AlunoController.delete);

export default router;