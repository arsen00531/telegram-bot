import { Command } from "./abstract/command.class.js";
import TelegramBot from "node-telegram-bot-api";

export class StartCommand extends Command {

    constructor(
        bot: TelegramBot
    ) {
        super(bot)
    }

    handle(): void {
        this.bot.onText(/\/start/, async (msg) => {
            const { chat: { id } } = msg
            
            this.bot.sendMessage(id, "Привет!")
            this.bot.sendPhoto(id, 'https://interesnoewmire.ru/wp-content/uploads/165-kartinok-s-privetom-9487e8e.jpg')
        })
    }

    getCommand() {
        return {
            command: 'start',
            description: 'Старт бота'
        }
    }
}