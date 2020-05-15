const express = require('express');
const router = express.Router();
const HttpError = require('./http-error');
const {validationResult} = require('express-validator');
const {v4:uuidv4} =require('uuid');

let DUMMY_PLACES =[
    {
        id: "p1",
        title: "Empire State",
        description: "Rascacielos mas famoso del mundo",
        location : {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: "20 W 34th st, New York, NY, 10001",
        creator: "u1"
    }
];

//regresar 
const getPlacebyId = (req, res, next)=> {
    const placeId = req.params.pid;
    const places = DUMMY_PLACES.filter(p => {
        return(p.id === placeId);
    });
    if(!places){
        throw new HttpError('No se encontró lugares con ese nombre', 404);
    }

    res.json({place: places})
};


//regresar en funcion del usuario
const getPlacebyUser= (req, res, next)=> {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => (p.creator === userId));
    if(!places){
        throw new HttpError('No se encontró lugares con el usuario', 404);
    }

    res.json({place: places})
};

const createPlace= (req, res, next)=>{
    const error = validationResult(req);
    if(!(error.isEmpty())){
        console.log(error);
        throw new HttpError('Argumentos de la ruta invalidos', 422);
    }

    const{title, description, coordinates, address, creator}= req.body;
    createdPlace ={
        id: uuidv4(),
        title,
        description,
        location:coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({message: createdPlace});
};
// editar place
const updatePlace = (req, res, next)=>{
    const error = validationResult(req);
    if(!(error.isEmpty())){
        console.log(error);
        throw new HttpError('Argumentos invalidos.');
    }

    const {title,description}= req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...DUMMY_PLACES.find(p=> (p.id === placeId))};
    const placeIndex = DUMMY_PLACES.findIndex(p=> (p.id === placeId));
    updatedPlace.title= title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex]= updatedPlace;

    res.status(200).json({message: "sitio modificado exitosamente"});
};

//eliminar ruta
const deletePlace = (req, res, next)=>{
    const placeId= req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p=> (p.id !== placeId));
    res.status(200).json({message: 'Sitio eliminado exitosamente'});
};

exports.getPlacebyId = getPlacebyId;
exports.getPlacebyUser = getPlacebyUser;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;