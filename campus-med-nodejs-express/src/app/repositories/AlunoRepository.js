import { consulta } from "../database/conexao.js";

class AlunoRepository{
    // CRUD
    create(matricula, nomeCompleto){
        const sql = `INSERT INTO alunos(matricula, nomeCompleto)
        SELECT ?, ?
        WHERE NOT EXISTS(
        	SELECT * FROM alunos WHERE matricula = ?
        );`;
        return consulta(sql, [matricula, nomeCompleto, matricula], 'Não foi possível cadastrar o aluno.')
    }

    findAll(){
        const sql = `SELECT * FROM alunos`;
        return consulta(sql, [], 'Não foi possível encontrar alunos.')
    }

    findByName(nome){
        const sql = 'SELECT * FROM alunos WHERE nomeCompleto LIKE ? OR matricula LIKE ? ORDER BY nomeCompleto ASC;';
        return consulta(sql, [`%${nome}%`, `%${nome}%`], 'Não foi possível obter um aluno com este nome.')
    }

    update(aluno, idAluno){
        const sql = `UPDATE alunos SET ? WHERE idAluno = ?`;
        return consulta(sql, [aluno, idAluno], 'Não foi possível atualizar as informações do aluno.')
    }

    delete(id){
        const sql = `DELETE FROM alunos WHERE idAluno = ?;`;
        return consulta(sql, id, 'Não foi possível deletar aluno.')
    }
}

export default new AlunoRepository();