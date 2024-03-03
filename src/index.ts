import express from 'express';
import rabbitMQClient from './rabbitmq/client.js';
import { configService } from './config/config.service.js';
import botInstanse from './bot/Bot.js';
import { router } from './gateway/gateway.controller.js';

const TOKEN = configService.get('BOT_TOKEN')

const bot = botInstanse.getBot()

// const router = Router()
// router.post(`/bot${TOKEN}`, (req: Request, res: Response) => {
//     console.log("object");
//     bot.processUpdate(req.body)
//     res.sendStatus(200)
// })

const app = express();
app.use(express.json());
app.use(router)

// bot.on('message', (msg) => {
//     const { chat: { id } } = msg

//     bot.sendMessage(id, "Pong")
//     .then(() => console.log("Pong send"))
// })

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await rabbitMQClient.initialize()
    await botInstanse.init()
});