import { createUserModel } from "../models.js/userModel.js";

const createNewUser = async (req,res) =>{
    try{
        const { user } = req.body;
        const newUser = await createUserModel(user);
        res.status(201).json({ user: newUser});
    } catch (error){
        res.status(400).json(error.message);
    }
};

export {createNewUser};