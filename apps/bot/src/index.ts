import express from 'express';
import rabbitMQClient from './rabbitmq/client.js';
import botInstanse from './bot/Bot.js';
import { router } from './gateway/gateway.controller.js';

const app = express();
app.use(express.json());
app.use(router)

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await rabbitMQClient.initialize()
    await botInstanse.init()
});