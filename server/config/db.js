import pkg from 'pg';
const {Pool} = pkg;
import dotenv from 'dotenv'
dotenv.config();

const pool = new Pool({
    connectionString : process.env.DATABASE_URL
})

pool.connect((error) => {
    if(error){
        console.log(`error connecting to the database \n ${error}`)
    } else{
        console.log('database connected successfully')
    }
})

export default pool;