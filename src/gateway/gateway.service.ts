import { Request, Response } from "express";
import { IGatewayDto } from "./gatewayDto.interface.js";
import rabbitMQClient from '../rabbitmq/client.js'

export class GatewayService {

    bot(req: Request, res: Response) {
        try {
            const { message }: IGatewayDto = req.body;
            if (message.text === '/start') {
                rabbitMQClient.produce(
                    {
                        chat: message.chat,
                        path: message.text,
                        entities: message.entities
                    },
                    String(message.message_id)
                )
            }
            res.sendStatus(200);
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}