import {SequelizeDB} from "../libs/SequelizeDB";
import * as Sequelize from "sequelize"

/**
 * @author Humberto Machado
 */
export interface SequelizeModel {
    defineModel(sequelize: Sequelize.Sequelize): SequelizeModel;
    associate(sequelizeDB: SequelizeDB): void;
    getModelName(): string;
    getInstance(): Sequelize.Model<any, any>;
}