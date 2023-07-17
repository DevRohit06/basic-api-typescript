import express from 'express';
import { createUser, getUserByEmail, getUserByUsername } from '../db/users';
import { random, authentication } from '../helper';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.sendStatus(400); 
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user){
            return res.sendStatus(400);
        }

        const hashedPassword = authentication(user.authentication.salt, password);

        if(hashedPassword != user.authentication.password){
            return res.sendStatus(400);
        }

        const salt = random();
        user.authentication.sessionToken =  authentication(salt, user._id.toString());

        await user.save();
        res.cookie("AUTH", user.authentication.sessionToken, { domain: "localhost", path: "/", httpOnly: true, secure: false,});
     res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

export const register = async(req: express.Request, res: express.Response) => {
    try{
        const { email, password, username } = req.body;

        if(!email || !password || !username){
            res.sendStatus(400);
        }

        const existingEmail = await getUserByEmail(email);
        const existingUser = await getUserByUsername(username);

        if(existingEmail){
            return res.sendStatus(400)
        }
        if(existingUser){
            return res.sendStatus(400)
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        })

         res.status(200).json(user).end();
    } catch(error) {
        console.log(error);
        res.sendStatus(400)
    }
}