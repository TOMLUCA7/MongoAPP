import express from "express";
import mongoose from "mongoose";

import action from './controllers/actions.js';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const mongoURL = 'mongodb+srv://tomluca:7pX8yMC8vl07XJKo@cluster0.uqmmyfn.mongodb.net/?retryWrites=true&w=majority';

const port = 3001;



app.use('/api', action);

mongoose.connect(mongoURL)
.then(result => {
    console.log(result);
})
.catch(err => console.log(err))

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});