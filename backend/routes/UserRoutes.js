const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schemas/UserSchema");

router.post('/', async (req, res)=>{
    const {firstName, lastName, email, password, avatar} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const myUser = new User({firstName, lastName, email, password:hashPassword , avatar});
    myUser.save()
    .then(user => res.status(201).json({message: 'Account created successfully', id: user._id}))
    .catch(err => console.log(err));
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.status(200).json({message: 'Login successful', token: token});
        }else{
            res.status(401).json({message: 'Invalid credentials'});
        }
    }else{
        res.status(401).json({message: 'Invalid credentials'});
    }
})


module.exports = router;