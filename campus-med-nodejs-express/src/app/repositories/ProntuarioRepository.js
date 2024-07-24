import { consulta } from "../database/conexao.js";

class ProntuarioRepository{
    // CRUD
    create( matricula, data, inicioAtendimento, fimAtendimento, HDA, tratamento){
        const sql = `INSERT INTO prontuarios ( idAluno, dataConsulta, inicioAtendimento, fimAtendimento, HDA, tratamento) 
        VALUES (
            (SELECT idAluno FROM alunos WHERE matricula = ? ),
            ?, ?, ?, ?, ?
        );`

        return consulta(sql, [matricula, data, inicioAtendimento, fimAtendimento, HDA, tratamento], 'Não foi possível cadastrar prontuário.');
    }

    findAll(){
        const sql = `SELECT * FROM prontuarios;`;
        return consulta(sql, [], 'Não foi possível encontrar prontuários.')
    }

    findByName(nome){
        const sql = `SELECT * FROM prontuarios WHERE idAluno in ( SELECT idAluno FROM alunos WHERE nomeCompleto LIKE ? );`;
        return consulta(sql, `%${nome}%`, 'Não foi possível obter um prontuário de um aluno com este nome.');
    }

    update(prontuario, idProntuario){
        const sql = `UPDATE prontuarios SET ? WHERE idProntuario = ?;`;
        return consulta(sql, [prontuario, idProntuario], 'Não foi possível atualizar as informações do prontuário.')
    }

    delete(id){
        const sql = `DELETE FROM prontuarios WHERE idProntuario = ?;`;
        return consulta(sql, id, 'Não foi possível deletar prontuário.');
    }
}

export default new ProntuarioRepository();