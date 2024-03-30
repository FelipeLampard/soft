import pool from '../../database/config.js'
import bcrypt from 'bcryptjs';


const createUserModel = async ({email, password, rol, languaje }) => {
    const hashPassword = bcrypt.hashSync(password);
    const SQLquery = {
        text: 'INSERT INTO usuarios (email, password, rol, languaje) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [email, hashPassword, rol, languaje],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
};



const byEmail = async({email}) => {
    const SQLquery = {
        text: "SELECT * FROM usuarios WHERE email = $1",
        values: [email],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
}



export {createUserModel, byEmail}
