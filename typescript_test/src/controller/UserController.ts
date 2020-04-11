import { Request, Response } from "express";
import EmailService from '../services/EmailService';

export default {
    async index(req: Request, res: Response) {
        const data = await {name: 'girvX', email: 'giovani.rdgs@gmail.com'}
        return res.json(data)
    },

    async create(req: Request , res: Response) {
        const email = new EmailService();
        const data = await email.sendEmail({
            to: {
                name: 'Giovani',
                email: 'giovani.rdgs@gmail.com'
            },
            message: {
                subject: 'Assunto X',
                body: 'Hello Wolrld!',
            }
        });

        return res.json(data)

    }
}