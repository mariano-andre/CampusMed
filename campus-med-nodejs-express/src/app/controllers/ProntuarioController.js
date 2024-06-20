import conexao from "../database/conexao.js";
import ProntuarioRepository from "../repositories/ProntuarioRepository.js";

class ProntuarioController {

    async index(req, res){
        const row = await ProntuarioRepository.findAll();
        res.json(row)
    }
  
    async show(req, res){
        const nome = req.params.nome;
        const row = await ProntuarioRepository.findByName(nome);
        res.json(row);
    }

    async store(req, res){
        const pront = req.body;
        const matricula = pront.matricula;
        const data = pront.data;
        const inicioAtendimento = pront.inicioAtendimento;
        const fimAtendimento = pront.fimAtendimento;
        const HDA = pront.HDA;
        const tratamento = pront.tratamento;
        const row = await ProntuarioRepository.create(matricula, data, inicioAtendimento, fimAtendimento, HDA, tratamento);
        res.json(row);
    }

    async update(req, res){
        const prontuario = req.body;
        const idProntuario = req.params.id;
        const row = await ProntuarioRepository.update(prontuario, idProntuario);
        res.json(row);
    }

    async delete(req, res){
        const id = req.params.id;
        const row = await ProntuarioRepository.delete(id);
        res.json(row);
    }
}

// padrão singleton
export default new ProntuarioController();
