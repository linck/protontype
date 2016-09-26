/// <reference types="sequelize" />
import { SequelizeDB } from "./SequelizeDB";
import { SequelizeModel } from "../models/SequelizeModel";
import * as Sequelize from "sequelize";
/**
 * @author Humberto Machado
 */
export declare class SequelizeModelLoader {
    static modelsList: SequelizeModel[];
    static loadModels(sequelizeDB: SequelizeDB): void;
}
export declare function Model(config: ModelConfig): (constructor: Function) => void;
export interface ModelConfig {
    name: string;
    definition: Sequelize.DefineAttributes;
}
