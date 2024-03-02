import { Request, Response } from "express";

export class GatewayService {

    bot(req: Request, res: Response) {
        try {
            const { message } = req.body;
            console.log(message, 'lox');
            if (message) {
                // sendMessageToRabbitMQ(message);
    
            }
            res.sendStatus(200);
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // sendMessageToRabbitMQ(message: Object) {
    //     channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    // }
}