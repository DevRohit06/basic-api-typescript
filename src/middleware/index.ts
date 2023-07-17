import { getUserBySessionToken } from '../db/users';
import express from 'express';
import { get, merge } from 'lodash';

export const isCurrentUser = async(res: express.Response, req: express.Request<any>, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUser = get(req, 'identity._id') as any;
        if(!currentUser){
            return res.sendStatus(403);
        }
        if(currentUser != id){
            return res.sendStatus(403);
        }
         next();

    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['AUTH'];
        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            return res.sendStatus(403);
        }
        merge(req, {identity: existingUser });

        return next();
    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
}
