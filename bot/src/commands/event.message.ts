import TelegramBot from "node-telegram-bot-api";
import { MessageAbstract } from "./abstract/message.class.js";
import { cost, free } from "../scenarios/freeCost.scenario.js";
import { tarif } from "../scenarios/tarif.scenario.js";
import { checkUser } from "./users.js";

export class EventCommand extends MessageAbstract {

    constructor(
        bot: TelegramBot
    ) {
        super(bot)
    }

    handle(): void {
        this.bot.on('callback_query', async (ctx) => {
            checkUser(ctx.from.id)
            try {
                switch(ctx.data) {
                    case 'tryFree':
                        free(this.bot, ctx, 15000)
                        break;
                    case 'chooseWay':
                        cost(this.bot, ctx)
                        break;
                }
                switch(ctx.message.text) {
                    case 'Тариф':
                        tarif(this.bot, ctx)
                        break
                }
            } catch (error) {
                throw new Error('Event Error')
            }
        })
    }
}