import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
    private readonly envConfig: Record<string, string>;

    constructor() {
        const envFile = `${process.env.NODE_ENV || ""}.env`;

        if (fs.existsSync(envFile)) {
            this.envConfig = dotenv.parse(fs.readFileSync(envFile));
        } else {
            throw new Error(`Missing ${envFile} file`);
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}