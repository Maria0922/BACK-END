const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes= require('./routes/places-routes');
const userRoutes= require('./routes/user-routes');
const HttpError = require('./models/http-error');
//creamos aplicacion
const app= express();

app.use(bodyParser.json());

//clase middleware
app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

// manejar el error
app.use((req,res, next)=>{
    const error = new HttpError('No se encontró la ruta solicitada',404);
    throw error;
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    
    res.status(error.code || 500);
    res.json({errorMessage: error.message} || 'Ha ocurrido un error, tronitos');
});
app.listen(5000);