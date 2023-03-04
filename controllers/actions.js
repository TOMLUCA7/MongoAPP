import express from "express";
const Router = express.Router();
import mongoose from "mongoose";

import category from "../models/category.js";

Router.post('/createNewCategory', async(request, response) => {
    // creater object id
    const id = mongoose.Types.ObjectId();

    // get data from postman
    const categoryName = request.body.categoryName;

    // create new document in category collection
    const _category = new category({
        _id: id,
        categoryName: categoryName
    })

    _category.save()
    .then( result => {
        return response.status(200).json({
            result: result
        })
    })
    .catch(err => {console.log(err.message)});
})


export default Router;