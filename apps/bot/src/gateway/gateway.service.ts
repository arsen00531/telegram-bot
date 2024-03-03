import { Request, Response } from "express";
import botInstanse from "../bot/Bot.js";

const bot = botInstanse.getBot()

export class GatewayService {

    botHandler(req: Request, res: Response) {
        try {
            bot.processUpdate(req.body)
            res.sendStatus(200)
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}