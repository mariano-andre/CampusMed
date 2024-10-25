import conexao, { consulta } from "../database/conexao.js";

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

    findByName(matricula){
        const sql = `SELECT * FROM prontuarios 
        WHERE idAluno IN(
        	SELECT idAluno FROM alunos 
        	WHERE matricula LIKE ?
        ) ORDER BY dataConsulta, inicioAtendimento DESC;`
        return consulta(sql, `%${matricula}%`, 'Não foi possível identificar a última consulta deste aluno.')
    }

    countByMatricula(matricula){
        const sql = `SELECT COUNT(idProntuario)
                FROM prontuarios
                WHERE idAluno
                IN (
                    SELECT idAluno FROM alunos 
                    WHERE matricula LIKE ?
                )`
        return consulta(sql, `%${matricula}%`, 'Não foi possível contar a quantidade de consultas realizadas.')
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
