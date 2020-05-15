const HttpError = require('../models/http-error');
const {v4:uuidv4} = require('uuid'); //import de node
const {validationResult} = require('express-validator');

let DUMMY_USERS =[
    {
        id: "u1",
        name: "Karen Salguero",
        email: "karen@gmail.com",
        password: "12345"
    },
    {
        id: "u2",
        name: "Maria Jose Aguilar",
        email: "majo@gmail.com",
        password: "12345"
    }
];

const getUsers = (req,res,next)=>{
    res.status(200).json({user: DUMMY_USERS});
   /*  const userId = req.params.pid;
    const users = DUMMY_USERS.filter(p => {
        return(p.id === userId);
    });
    if(!users){
        throw new HttpError('No se encontró usuario', 404);
    }

    res.json({user: users}) */
};

/* var randomNumber = {
    random: Math.ceil(Math.random() * 10000)
} */
  
const signup = (req,res,next)=>{
    const error = validationResult(req);
    if(!(error.isEmpty())){
        throw new HttpError('argumentos invalidos', 422)
    }
    const{name, email,  password}= req.body;
    const createdUser= {
        id: uuidv4(),
        name: name,
        email: email,
        password:password
    }
    DUMMY_USERS.push(createdUser);
    //201 por que acabamos de agregar algo
    res.status(201).json({message: 'se ha creado el usuario con exito'});

};

const login = (req,res,next)=>{
    const {email,password} = req.body;
    const identifiedUser =DUMMY_USERS.find(u => (u.email === email));
    if((!identifiedUser) || (identifiedUser.password !== password)){
        throw new HttpError('No se identifico al usuario, las credenciales son incorrectas', 401);

    }
    res.json({message: "TRUE"});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;