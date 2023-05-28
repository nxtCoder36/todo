import mongoose from "mongoose";
import { tododb } from "../db/connect.js";
import { nanoid } from 'nanoid';

const todoschema = new mongoose.Schema({
 id: {type:String, unique:true, default: () => "todo-" + nanoid(40) },
 name: {type:String},
 todo: {type: String}
});

const model = tododb.model("todotable", todoschema);

const listAllTodos = async () => {
    return model.find();
}

const addTodo = async ({name, todo}) => {
    return model.create({name, todo});
}

export const todo_domain = {
    listAllTodos,
    addTodo,
}