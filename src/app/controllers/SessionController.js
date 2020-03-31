import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

import User from '../models/User';


class SessionController {
    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails'});
        }

        
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});
        if(!user){ //Compara se o User se encontra no Banco procurando pelo Email
            return res.status(401).json({ error: 'User not found'})
        }

        if(!(await user.checkPassword(password))) { //Compara se a senha bate com a senha do hash do user, Método está em Models do User
            return res.status(401).json({ error: 'Password does not match'});
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });

        
    }
}

export default new SessionController();