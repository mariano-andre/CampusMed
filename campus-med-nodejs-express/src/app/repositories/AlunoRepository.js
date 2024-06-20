import conexao from "../database/conexao.js";

class AlunoRepository{
    // CRUD
    create(matricula, nomeCompleto){
        const sql = `INSERT INTO ALUNOS (matricula, nomeCompleto) VALUES (?, ?)`;
        return new Promise((resolve, reject) =>{
            conexao.query(sql, [matricula, nomeCompleto], (err, result)=>{
                if(err){
                    return reject('Não foi possível cadastrar aluno.')
                }else{
                    const rows = JSON.parse(JSON.stringify(result));
                    return resolve(rows);
                }
            })

        })
    }

    findAll(){
        const sql = `SELECT * FROM alunos`;
        return new Promise((resolve, reject) =>{
            conexao.query(sql, (err, result)=>{
                if(err){
                    return reject('Não foi possível encontrar alunos.');
                } else{
                    // fazer o parse dos resultados
                    const rows = JSON.parse(JSON.stringify(result));
                    return resolve(rows);
                }
            })
        })
    }

    findByName(nome){
        const sql = 'SELECT * FROM alunos WHERE nomeCompleto LIKE ? ;';
        return new Promise((resolve, reject)=>{
            conexao.query(sql, `%${nome}%`, (err, result)=>{
                if(err){
                    reject('Não foi possível obter um aluno com este nome.')
                } else{
                    const rows = JSON.parse(JSON.stringify(result));
                    return resolve(rows);
                }
            })
        })
    }

    update(aluno, idAluno){
        const sql = `UPDATE alunos SET ? WHERE idAluno = ?`;
        return new Promise((resolve, reject)=>{
            conexao.query(sql, [aluno, idAluno], (err, result)=>{
                if(err){
                    return reject('Não foi possível atualizar as informações do aluno.')
                }else{
                    const rows = JSON.parse(JSON.stringify(result));
                    return resolve(rows);
                }
            })
        })
    }

    delete(id){
        const sql = `DELETE FROM alunos WHERE idAluno = ?;`;
        return new Promise((resolve, reject)=>{
            conexao.query(sql, id, (err, result)=>{
                if(err){
                    return reject('Não foi possível deletar aluno.')
                }else{
                    const rows = JSON.parse(JSON.stringify(result));
                    return resolve(rows);
                }
            })
        })
    }
}

export default new AlunoRepository();