import express from 'express';
import { todo_domain } from './todo_domain.js';

export const todoRouter = (wss) => {
    const router = express.Router();

    router.get("/list-todos", async (req, res) => {
        const todos = await todo_domain.listAllTodos();
        return res.json(todos);
    });
    router.post("/add-todo", async (req, res) =>{
        const {name, todo} = req.body;
    
        if (!(name || todo)) {
            throw new Error("Bad Request");
        }
        const user = await todo_domain.addTodo({name, todo});
        if (wss != null){
            wss.clients.forEach(client => {
                console.log('aaaaaaaaaaaaaa', JSON.stringify({name,todo}), user._id)
                const _id = user._id
                client.send(JSON.stringify({_id,name,todo}))
            });
        }
        return res.json(user);
    });
    return router
}

// const router = express.Router();

// router.get("/list-todos", async (req, res) => {
//     const todos = await todo_domain.listAllTodos();
//     return res.json(todos);
// });

// router.post("/add-todo", async (req, res) =>{
//     const {id, name, todo} = req.body;

//     if (!(id || name || todo)) {
//         throw new Error("Bad Request");
//     }
//     const user = await todo_domain.addTodo({id, name, todo});
//     // socket.clients.forEach(client => {
//     //     client.send(JSON.stringify({name,todo}))
//     // });
//     return res.json(user);
// });

// export default router