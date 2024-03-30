import HATEOAS from "../helpers/hateoas.js"
import { createPostModel, deletePostModel, getAllPostsWithHateos, getAllpostModelLimitFormat, getAllpostlimitModel, getPostModel, updatePostModel, } from "../models.js/up.model.js";
import { findError } from "../utils/utils.js";

export const createPost = async (req, res) => {
    try {
        const { post } = req.body;
        if (!post) {
            return res.status(400).json({ error: 'Post requerido' });
        }
        const posts = await getPostModel();
        const postExists = posts.find(
            (p) => p.name == post.name && p.descripcion == post.descripcion
        );
        if (postExists) {
            return res.status(400).json({ error: 'Post already exists' });
        }
        const newPost = await createPostModel(post);
        res.status(201).json({ post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error al procesar', error);
    }
};


export const getAllpost = async (req, res) => {
    try {
        const posts = await getPostModel();
        res.status(200).json({ posts: posts });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, metal } = req.body.joyas; 
        const updatedPost = await updatePostModel(id, { nombre, categoria, metal });
        if (!updatedPost) {
            return res.status(404).json({ error: "No se encontró el post" });
        }
        res.status(200).json({ post: updatedPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deletePost = async (req,res) => {
    try{
        const{id} = req.params;
        const posts = await deletePostModel(id)
        if(posts === 0){
            return res.status(404).json({error: "Post no encontrado"});
        }
        res.status(204).json ({message: "Post Borrado"});
    }catch(error) {
        const errorFound = findError(error.code);
        res.status(errorFound[0].status)
            .json({ error: errorFound[0].message });
    } 
};

export const getAllpostlimit = async (req, res) => {
    try{
    const {limit} = req.query;
    const result = await getAllpostlimitModel(limit);
    res.status(200).json({post: result});
    } catch (error){
        const errorFound = findError(error.code);
        return res
        .status(errorFound[0].status)
        .json({error: errorFound[0].message})
    }

};

export const getOrderAndLimitsPosts = async (req,res) => {
    try{
        const {order_by, limit, page} = req.query;
        const posts = await getAllpostModelLimitFormat(order_by, limit, page);
        res.status(200).json({ post: posts});
    } catch(error){
        console.log('error', error);
        const errorFound = findError(error.code);
        return res
        .status(errorFound[0].status)
        .json({error: errorFound[0].message});

    }
}

export const getAllPostsHateos = async (req,res) => {
    try{
        const allPost = await getAllPostsWithHateos();
        const getAllPostsHateos = await HATEOAS('posts', allPost);
        res.status(200).json({post: getAllPostsHateos});
    } catch (error){
        const errorFound = findError(error.code);
        return res
        .status(errorFound[0].status)
        .json({error: errorFound[0].message});

    }
};


export const allPostPaginator = async (req,res) =>{
    try{
        const {items, page} = req.query;
        const allPost = await getPostModel();
        const isPage = /^[1-9]\d*$/.test(page);
        if (isPage){
            return res.status(400).json({message: 'Invalid page number'});
        }
        const pageData = pagination(allPost, items, page);
        res.status(200).json(pageData);

    }catch(error){
        const errorFound = findError(error.code);
        return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message});

    }
};

export const getallpostModelFilter = async (filters) => {
    const {query, values} = postQuery('post', filters);
    const result = await pool.query(query, values);
    return result.rows;
};

export const filterPosts = async (req,res) => {
    try{
        const {items, page, filters} = req.body;
        console.log('filter', filters);
        const allPosts = await getallpostModelFilter(filters);
        console.log('allPosts', allPosts);
        const pageData = pagination(allPosts, items, page);
        console.log('pageData', pageData);
        res.status(200).json(pageData);
    }catch(error){
        const errorFound = findError(error.code);
        return res
        .status(errorFound[0].status)
        .json({error: errorFound[0].message})
    }
};