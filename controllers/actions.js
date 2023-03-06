import express from "express";
const Router = express.Router();
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import category from "../models/category.js";
import Account from "../models/Account.js";


Router.get('/getCategories', async(request, response) => {
    // options 1
    // find all categories
    const categories = await category.find();

    // find all by condition
    //const categories = await category.find({isPublic: true});

    // find bay id
    //const categories = await category.findById('6401c0150075865cecc2f2cd')
    
    // find one bay condition
    //const categories = await category.findOne({isPublic: true});


    response.status(200).json({
        categories: categories
    })
})


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


// auth function

// regestir
Router.post('/regester', async (request, response) => {
    // get account information
    const {firstName, lastName, email, password} = request.body;

    // check if user (email) exists
    const isAccountExists = await Account.findOne({email: email});
    if(isAccountExists){
        return response.status(200).json({
            message: 'Account already exists',
        });
    }

    // password crypt
    const hashPassword = await bcryptjs.hash(password, 10)

    // create user in db
    const id = mongoose.Types.ObjectId();
    const _account = new Account({
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
    })
    _account.save()
    .then( result => {
        return response.status(200).json({
            result: result
        })
    })
    .catch(err => {console.log(err.message)});
})




// login
Router.post('/login', async (request, response) => {
    // get account information from db 
    const { email, password } = request.body;

    // check if user is logged in
    Account.findOne({ email: email})
    .then(async account => {
        if (!account){
            return response.status(200).json({
                message: 'Account not exists',
            });
        }
        
        // compare password
        const isMatch = await bcryptjs.compare(password, account.password);
        if(!isMatch){
            return response.status(200).json({
                message: 'Password Not Match',
            });
        }
        
        // generate jwt token
        const dataToToken = {
            _id: account.id,
            name: account.firstName + ' ' + account.lastName,
            email: account.email,
            avatar: account.avatar
        }
        const jwtToken = await jwt.sign({dataToToken}, process.env.JWT_KEY, {expiresIn: '30d'});
        // response
        return response.status(200).json({
            message: account,
            token: jwtToken,
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err.message
        })
    })
})





export default Router;