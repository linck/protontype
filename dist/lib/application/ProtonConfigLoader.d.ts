import * as cors from 'cors';
import * as winston from 'winston';
import { ConnectionOptions } from 'typeorm';
export declare class ProtonConfigLoader {
    /**
     * Load confg file
     *
     * @param filePath Optional configuration file path. Default value is './proton.json'
     */
    static loadConfig(filePath?: string): GlobalConfig;
}
export interface GlobalConfig {
    port: number;
    database: ConnectionOptions;
    cors?: cors.CorsOptions;
    logger?: LoggerConfig;
    https?: HTTPSConfig;
    defaultRoutes?: boolean;
}
export interface DBDefine {
    underscored: boolean;
}
export interface HTTPSConfig {
    enabled: boolean;
    key: string;
    cert: string;
}
export interface LoggerConfig {
    enabled: boolean;
    transports: {
        type: string;
        options: winston.TransportOptions;
    }[];
}
export declare const DEFAULT_CONFIG: GlobalConfig;
