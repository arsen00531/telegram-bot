import Bot from "../bot/Bot.js";
import { Command } from "./abstract/command.class.js";
import TelegramBot from "node-telegram-bot-api";
import { checkUser } from "./users.js";

export class StartCommand extends Command {

    constructor(
        bot: TelegramBot
    ) {
        super(bot)
    }

    async handle() {
        let userId: number
        this.bot.onText(/\/start/, async (msg) => {
            const { chat: { id } } = msg
            userId = msg.from.id

            await this.bot.sendMessage(id, "Привет!")
            await this.bot.sendPhoto(id, 'https://interesnoewmire.ru/wp-content/uploads/165-kartinok-s-privetom-9487e8e.jpg')

            checkUser(msg.from.id)
        })
    }

    getCommand() {
        return {
            command: 'start',
            description: 'Старт бота'
        }
    }
}