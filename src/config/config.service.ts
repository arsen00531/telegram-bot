import { DotenvParseOutput, config } from "dotenv";
import { IConfigService } from "./config.interface.js";

class ConfigService implements IConfigService {
    private config: DotenvParseOutput
    constructor() {
        const { error, parsed } = config()
        if (error) {
            throw new Error(".env file was not found")
        }
        if (!parsed) {
            throw new Error(".env file is empty")
        }
        this.config = parsed
    }
    
    get(key: string): string {
        const res = this.config[key];
        if (!res) {
            throw new Error("The key was not found")
        }
        return res
    }
}

const configService = new ConfigService()

export { configService }