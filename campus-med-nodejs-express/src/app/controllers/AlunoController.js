import conexao from "../database/conexao.js";
import AlunoRepository from "../repositories/AlunoRepository.js"

class AlunoController{
    async index(req, res){
        const row = await AlunoRepository.findAll();
        res.json(row)
    }

    async show(req, res){
        const nome = req.params.nome;
        const row = await AlunoRepository.findByName(nome);
        res.json(row);
    }

    async store(req, res){
        const aluno = req.body;
        const matricula = aluno.matricula;
        const nomeCompleto = aluno.nomeCompleto;
        const row = await AlunoRepository.create(matricula, nomeCompleto);
        res.json(row);
    }

    async update(req, res){
        const aluno = req.body;
        const idAluno = req.params.id;
        const row = await AlunoRepository.update(aluno, idAluno);
        res.json(row)
    }

    async delete(req, res){
        const id = req.params.id;
        const row = await AlunoRepository.delete(id);
        res.json(row);
    }
}

// padrão singleton
export default new AlunoController;