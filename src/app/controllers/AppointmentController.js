import Appointment from '../models/Appointment';
import {startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import File from '../models/File';
import * as Yup from 'yup';

class AppointmentController {
    async index(req, res){
        const { page = 1} = req.query;

        const appointment = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null},
            order: ['date'], //ordenar
            limit:20, //limite de 20 por pagina
            offset: (page -1) * 20, //para pular 20 quando a pagina for maior que 1
            attributes: ['id', 'date'], //atributos que são retornados
            include: [ //incluir valor de outras tabelas
                {
                    model: User, //nome da tabela
                    as: 'provider', //identificação
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id','path','url'],
                        }
                    ]
                }
            ]

        });

        return res.json(appointment);
    }


    async store(req, res){
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validations Fails'})
        }

        const { provider_id, date } = req.body;

        //Check if provider_id is a provider
        const isProvider = await User.findOne({
            where: {id: provider_id, provider: true},
        });
        if(!isProvider){
            return res.status(401).json({ error: 'You can only create appointments with providers.'})
        }

        const hourStart = startOfHour(parseISO(date));

        //Check for past dates
        if(isBefore(hourStart, new Date())){
            return res.status(400).json({ error: 'Past dates are not permited.'})
        }

        //check date availability
        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            }
        });
        if(checkAvailability){
            return res.status(400).json({ error: 'Appointment date is not available.'})
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();