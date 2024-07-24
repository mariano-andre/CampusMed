import mysql from 'mysql';

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bd-campusmed'
})

conexao.connect();
/**
 * Executa um código sql com ou sem valores
 * @param {string} sql instrução sql a ser executada
 * @param {string | array} valores valores a serem passados para o sql
 * @param {string} mensagemReject mensagem a ser exibida em caso de reject
 * @returns objeto da Promise
 */
export const consulta = (sql, valores='', mensagemReject) =>{
    return new Promise((resolve, reject) =>{
        conexao.query(sql, valores, (err, result)=>{
            if(err){
                return reject(mensagemReject);
            }else{
                const rows = JSON.parse(JSON.stringify(result));
                return resolve(rows);
            }
        })
    })
}

export default conexao;
