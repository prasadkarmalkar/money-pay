const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schemas/UserSchema");
const { authenticateUser } = require("../middleware/userMiddleware");

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

router.put('/',authenticateUser, async (req, res)=>{
    const {firstName, lastName, avatar} = req.body;
    const user = await User.findById(req.userId);
    if(user){
        if ( firstName ) {
            user.firstName = firstName
        }
        if ( lastName ) {
            user.lastName = lastName
        }
        if ( avatar ) {
            user.avatar = lastName
        }
        await user.save();
        res.json({message: 'User updated successfully'})
    }else{
        res.status(404).json({message: 'Invalid credentials'});
    }
})


module.exports = router;