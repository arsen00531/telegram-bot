// import { Telegraf } from 'telegraf';

import { Telegraf, session } from "telegraf";
import { IConfigService } from "../config/config.interface.js";
import { ConfigService } from "../config/config.service.js";
import { IBotContext } from "../context/context.interface.js";
import { Command } from "../commands/command.class.js";

// const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.launch({
//     webhook: {
//         domain: process.env.DOMAIN,
//         path: process.env.path
//     }
// });

// export { bot }

class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = []

    constructor(
        private readonly configService: IConfigService
    ) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'))
        this.bot.use(session())
    }

    async init() {
        for (const command of this.commands) {
            command.handle()
        }
        await this.bot.launch({
            webhook: {
                domain: this.configService.get('DOMAIN'),
                path: this.configService.get('PATH')
            }
        })
    }

}

const bot = new Bot(new ConfigService())
bot.init()