const express = require('express');
const bodyParser = require('body-parser');
require('./db');
require('./models/Users');


///

const port = 3000;
const app = express();
const authRoutes = require('./routes/authRoutes');
const requireToken = require('./middlewares/AuthToken');
///

app.use(authRoutes);
app.use(bodyParser.json())
app.get('/',requireToken,(req,res)=>{
    res.send(req.user);
    console.log(req.user);
})
app.listen(port,()=>{
    console.log(`server running on the port :${port}`);
})