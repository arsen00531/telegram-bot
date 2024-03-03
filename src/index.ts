import express, { Router } from 'express';
import rabbitMQClient from './rabbitmq/client.js';
import { ConfigService } from './config/config.service.js';
import { Request, Response } from 'express';
import { Bot } from './bot/Bot.js';

const configService = new ConfigService()
const TOKEN = configService.get('BOT_TOKEN')

const botInstanse = new Bot(configService)
const bot = botInstanse.getBot()

const router = Router()
router.post(`/bot${TOKEN}`, (req: Request, res: Response) => {
    console.log("object");
    bot.processUpdate(req.body)
    res.sendStatus(200)
})

// bot.setWebHook(`${configService.get('DOMAIN')}/bot${TOKEN}`)

const app = express();
app.use(express.json());
app.use(router)

// bot.on('message', (msg) => {
//     const { chat: { id } } = msg

//     bot.sendMessage(id, "Pong")
//     .then(() => console.log("Pong send"))
// })

// bot.onText(/\/help (.+)/, (msg, match) => {
//     const { chat: { id } } = msg
//     if(!match) return

//     const name = match[1];
//     bot.sendMessage(id, name)
//     .then(() => console.log("command send"))
// })

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await rabbitMQClient.initialize()
    await botInstanse.init()
});