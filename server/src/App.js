const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const userRoutes = require('./routes/User');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({extended: true} ));

app.use(cors());
app.use('/users', userRoutes);

mongoose
.connect("mongodb+srv://kenan123:kenan123@cluster0.3gs3z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then( () =>app.listen(5000), console.log('server is listening on port: 5000'))
.catch((err) => console.log(err));