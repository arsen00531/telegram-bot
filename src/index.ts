import express from 'express';
import amqp, { Channel } from 'amqplib';
import { config } from 'dotenv';
import { router } from './gateway/gateway.controller.js';

// config()

const app = express();
app.use(express.json());
app.use(router)

const rabbitMQUrl = 'amqp://root:admin@localhost';
const queueName = 'telegram_messages';

let channel: Channel;
(async () => {
    const connection = await amqp.connect(rabbitMQUrl);
    channel = await connection.createChannel();
    await channel.assertQueue(queueName);
})();

// Обработка входящих сообщений от Telegram через AWS API Gateway
app.post('/bot', async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message, 'asfsafsdaf');
        if (message) {
            sendMessageToRabbitMQ(message);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// // Функция отправки сообщения в RabbitMQ
function sendMessageToRabbitMQ(message: Object) {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});