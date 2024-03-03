import express from 'express';
import { router } from './gateway/gateway.controller.js';
import rabbitMQClient from './rabbitmq/client.js';

const app = express();
app.use(express.json());
app.use(router)

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await rabbitMQClient.initialize()
});