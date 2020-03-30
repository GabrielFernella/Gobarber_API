const { Router} = require('express'); // Forma de importar o Router para o APP.js

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({message: 'Hello World'})
})


module.exports = routes; //está sendo executado em app.js