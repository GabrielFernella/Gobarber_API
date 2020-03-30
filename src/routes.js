import { Router } from 'express'; // Forma de importar o Router para o APP.js

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Gabs',
        email: 'gabs@gmail.com',
        password_hash: '123456'
    })

    return res.json(user);
})


export default routes; //está sendo executado em app.js