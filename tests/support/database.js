const { Pool } = require('pg')

const DbConfig = {
    user: 'postgres', 
    host: 'pgdb', // Nome do serviço no Docker Compose
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432 //Porta padrao do banco POSTGRESS SQL
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()
        const result = await client.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL ' + error)
    }

}