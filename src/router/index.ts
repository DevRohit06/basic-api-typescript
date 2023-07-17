import express from "express";
import authentication from "./authentication";
const router = express.Router();
import users from "./users";

export default (): express.Router => {
    authentication(router);
    users(router);
    return router
}