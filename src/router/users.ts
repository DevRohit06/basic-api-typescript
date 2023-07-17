import { getAllUsers, deleteUsers, UpdateUsers } from "../controllers/users";
import express from "express";
import { isAuthenticated, isCurrentUser } from "../middleware";


export default(router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id',isAuthenticated, deleteUsers)
    router.patch('/users/:id', isAuthenticated, UpdateUsers)
}