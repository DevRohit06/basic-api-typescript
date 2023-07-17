import { getUsers, deleteUserById, getUserBYId } from "../db/users";
const { get } = require("lodash");
import express from "express";

export const getAllUsers =  async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();

        res.status(200).json(users);

    } catch (error){
        console.log(error);
        res.sendStatus(400);
    }
}
export const deleteUsers = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;

        const currentUser = get(req, 'identity._id') as string;
        if (!currentUser){
            return res.sendStatus(403);
        }
        if(currentUser.toString() != id){
            return res.sendStatus(403);
        }
        if(!id){
            return res.sendStatus(400);
        }
        const user = await deleteUserById(id);
        if(!user){
            return res.sendStatus(400);
        }
        res.sendStatus(200).json(user);
    }
    catch (error){
        console.log(error);
        res.sendStatus(400);

    }
}
export const UpdateUsers = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const { username } = req.body;
        if(!username){
            return res.sendStatus(400);
        }
        const currentUser = get(req, 'identity._id') as string;
        if (!currentUser){
            return res.sendStatus(403);
        }
        if(currentUser.toString() != id){
            return res.sendStatus(403);
        }
        if(!id){
            return res.sendStatus(400);
        }
        const user = await getUserBYId(id);
        user.username = username;
        await user.save();
        res.sendStatus(200).json(user).end();
    }catch(error){
        console.log(error);
    }
}