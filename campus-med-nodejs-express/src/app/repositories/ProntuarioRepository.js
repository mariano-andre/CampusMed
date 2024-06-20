import conexao from "../database/conexao.js";

class ProntuarioRepository{
    // CRUD
    create( matricula, data, inicioAtendimento, fimAtendimento, HDA, tratamento){
        const sql = `INSERT INTO prontuarios ( matricula, dataConsulta, inicioAtendimento, fimAtendimento, HDA, tratamento) 
        VALUES (
            (SELECT idAluno FROM alunos WHERE matricula = ? ),
            ?, ?, ?, ?, ?
        );`
        return new Promise((resolve, reject) =>{
            conexao.query(sql, [matricula, data, inicioAtendimento, fimAtendimento, HDA, tratamento], (err, result)=>{
                if(err){
                    console.log(err); 
                    return reject('Não foi possível cadastrar aluno.');
                }else{
                    const rows = JSON.parse(JSON.stringify(result));
                    return resolve(rows); 
                }
            })
        }) 
    }

    findAll(){
        const sql = `SELECT * FROM prontuarios;`;
        return new Promise((resolve, reject) =>{
            conexao.query(sql, (err, result)=>{
                if(err){
                    return reject('Não foi possível encontrar prontuários.');
                } else{
                    // fazer o parse dos resultados
                    const rows = JSON.parse(JSON.stringify(result));
                    return resolve(rows);
                }
            })
        })
    }

    findByName(nome){
        const sql = `SELECT * FROM prontuarios WHERE idAluno in ( SELECT idAluno FROM alunos WHERE nomeCompleto LIKE ? );`;
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

    update(prontuario, idProntuario){
        const sql = `UPDATE prontuarios SET ? WHERE idProntuario = ?;`;
        return new Promise((resolve, reject)=>{
            conexao.query(sql, [prontuario, idProntuario], (err, result)=>{
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
        const sql = `DELETE FROM prontuarios WHERE idProntuario = ?;`;
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

export default new ProntuarioRepository();