import express from "express";
import mongoose from "mongoose";

import action from './controllers/actions.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const mongoURL = process.env.MONGO_URI;

const port = process.env.PORT;

app.use('/api', action);
mongoose.set({'strictQuery': false})
mongoose.connect(mongoURL)
.then(result => {
    console.log(result);
    app.listen(port, function() {
        console.log(`listening on port ${port}`);
    });
})
.catch(err => console.log(err))
