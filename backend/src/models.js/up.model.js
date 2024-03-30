import { v4 as uuidv4 } from 'uuid';
import format from 'pg-format';
import pool from '../../database/config.js';

export const createPostModel = async ({ nombre, categoria, metal }) => {
    try {
        const newId = uuidv4();
        const result = await pool.query('INSERT INTO inventario (id, nombre, categoria, metal) VALUES ($1, $2, $3, $4) RETURNING * ',
            [newId, nombre, categoria, metal]
            );
        console.log(result.rows);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al crear el post: ' + error.message);
    }
};

export const getPostModel = async () => {
    try {
        const allPost = await pool.query('SELECT * FROM inventario');
        return allPost.rows;
    } catch (error) {
        throw new Error('Error al obtener los posts: ' + error.message);
    }
};


export const updatePostModel = async (id, { nombre, categoria, metal }) => {
    const result = await pool.query(
        'UPDATE inventario SET nombre = $2, categoria = $3, metal = $4 WHERE id = $1 RETURNING *',
        [id, nombre, categoria, metal]
    );
    return result.rows[0]; 
};



export const deletePostModel = async (id) => {
    try {
        const result = await pool.query('DELETE FROM inventario WHERE id=$1', [id]);
    return "Post eliminado exitosamente";
} catch (error) {
    throw new Error('Error al eliminar el post: ' + error.message);
}
}

export const getAllpostlimitModel = async (limits = 10) => {
    const allPost = await pool.query(
        'SELECT * FROM joyas ORDER BY id DESC LIMIT $1', 
        [limits]
    );
    return allPost.rows;
};


export const getAllpostModelLimitFormat = async (
    order_by = 'id_DESC',
    limits = 10,
    page = 0
) => {
    const [attribute, direction] = order_by.split('_');
    const offset = page * limits;
    const allPost = format(
        'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
        attribute,
        direction,
        limits,
        offset
    );
    console.log('query:', allPost);
    const response = await pool.query(allPost);
    return response.rows;
};

export const getAllPostsWithHateos = async () =>{
    const allPost = await pool.query('SELECT * FROM inventario');
        return allPost.rows;
};

export const getallpostModelFilter = async (filters) => {
    const {query, values} = postQuery('post', filters);
    const result = await pool.query(query,values);
    return result.rows;
 }