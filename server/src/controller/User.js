const { User } = require("../Models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    let exsitingName;
    try {
        //Query metode
        exsitingName = await User.findOne({ name: name })
    } catch (error) {
        res.status(500).json({ message: "Couldnt connect to data base" })
        const err = new Error("Couldnt connect to data base", 500)
        return next(err)
    }
    if (exsitingName) {
        res.status(400).json({ message: "User with that name already exist" })
        const err = new Error("User with that name already exist", 400)
        return next(err)
    }
    if(name === '') {
        res.status(400).json({ message: "Please enter name" })
        const err = new Error("Please enter name", 400)
        return next(err)
    }
    let exsitingEmail;
    try {
        //Query metode
        exsitingEmail = await User.findOne({ email: email })
    } catch (error) {
        res.status(500).json({ message: "Couldnt connect to data base" })
        const err = new Error("Couldnt connect to data base", 500)
        return next(err)
    }
    if (exsitingEmail) {
        res.status(400).json({ message: "User with that email already exist" })
        const err = new Error("User with that email already exist", 400)
        return next(err)
    }
    if(regex.test(email)) {
        
    } else {
        res.status(400).json({ message: "Please enter valid email" })
        const err = new Error("Plese enter valid email", 400)
        return next(err)
    }
    if(password === ''){
        res.status(400).json({ message: "Please enter a password" })
        const err = new Error("Please enter a password", 400)
        return next(err)
    }
    if(passwordConfirm === ''){
        res.status(400).json({ message: "Please confirm a password" })
        const err = new Error("Please confirm a password", 400)
        return next(err)
    }

    if(password.length < 6) {
        res.status(400).json({ message: "Please enter 6 or more characters" })
        const err = new Error("Please enter 6 or more characters", 400)
        return next(err)
    }
   

    
        
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        res.status(400).json({ message: "Couldnt has password, pleaser try again" })
        const error = new Error("Couldnt not hash password, please try again", 500)
        return next(error);
    }
    if (password !== passwordConfirm) {
        res.status(403).json({ message: "Password dont match" })
        
        return next(err)
    }
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
    })
    try {
        await newUser.save();
    } catch (error) {
        res.status(400).json({ message: "Couldnt create user" })
        const err = new Error("Couldnt create user", 400)
        return next(err)
    }

    res.status(201).json({ user: newUser })
}
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    let exsitingUser;
    try {
        //Query metode
        exsitingUser = await User.findOne({ email: email })
    } catch (error) {
        res.status(500).json({ message: "Couldnt connect to data base" })
        const err = new Error("Couldnt connect to data base", 500)
        return next(err)
    }
    if (!exsitingUser) {
        res.status(400).json({ message: "User with that email dont exist. Please signup" })
        const err = new Error("User with that email dont exist. Please signup", 400)
        return next(err)
    }
    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, exsitingUser.password);
    } catch (error) {
        res.status(500).json({ message: "Couldnt log you in, please check your credentials and try again" })
        const err = new Error("Couldnt log you in, please check your credentials and try again", 500);
        return next(err)
    }
    if (!isValidPassword) {
        res.status(403).json({ message: "Invalid Credentials, couldnt not log you in" })
        const error = new Error("Invalid Credentials, couldnt log you in", 403)
        return next(error)
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: exsitingUser.id,

            },
            'kenan_base_login',
            { expiresIn: '200000ms' })
    } catch (err) {
        const error = new Error('Logging in field, please try again later', 500);
        return next(error);
    }

    res.status(200).json({ token: token })
}

exports.getProfileInformation = async (req, res, next) => {
    const id = req.userData.userId;

    let user;
    try {
        user = await User.findById(id)
    } catch (err) {
        res.status(500).json({ message: 'Could not connect do database' });
        const error = new Error('Could not connect to database', 500);
        return next(error);
    }

    res.status(200).json({ name: user.name, email: user.email });



};