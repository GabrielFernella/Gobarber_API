import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
    constructor(){
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares(){
        //Para conseguir devolver resuisições json
        this.server.use(express.json());
        //para tornar a url de imagens static, assim o frontend consegue ler o arquivo
        this.server.use(
            '/files', 
            express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;