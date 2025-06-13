require('dotenv').config() //vai carregar o arquivo dotnev na memoria no moemento em que o projeto do pw estiver em execucao

const { Pool } = require('pg')

const DbConfig = {
    user: process.env.DB_USER, 
    host: process.env.DB_HOST, //'localhost', // Nome do serviço no Docker Compose
    database: process.env.DB_NAME,//'zombieplus',
    password: process.env.DB_PASSWORD,//'pwd123',
    port: process.env.DB_PORT//5432 //Porta padrao do banco POSTGRESS SQL
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()
        const result = await client.query(sqlScript)
        c//onsole.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL ' + error)
    }

}