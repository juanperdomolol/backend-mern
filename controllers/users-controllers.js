const { v4: uuidv4 } = require("uuid");

const HttpError = require('../models/http-error')

const DUMMY_USERS = [
    {
        id:'u1',
        name: 'Max Schwarz',
        email: 'test@example.com',
        password: 'test'
    }
]
const getUsers = (req, res, next) =>{
    res.json({users: DUMMY_USERS})
}

const signup = (req, res, next) =>{
    const {name, email, password} = req.body

    const hasUser = DUMMY_PLACES.find(u=> u.email === email)
    if(hasUser) {
        throw new HttpError('Coul not identify user, email already exist', 402)

    }
    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser)
    res.status(201).json({user: createdUser})
}
const login = (req, res, next) =>{
    const {email, password} = req.body
    const identifiedUser = DUMMY_USERS.find(user => user.email === email)
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Coul not identify user, credentials seem to be wrong', 401)
    }
    res.json({message: 'Logged In!'})
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;