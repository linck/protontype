import {SequelizeDB} from "./SequelizeDB";
import {BaseModel} from "../models/BaseModel";
import * as Sequelize from "sequelize"

/**
 * @author Humberto Machado
 */
export class SequelizeModelLoader {
    //Injected by @Model
    public static modelsList: BaseModel[] = [];

    public static loadModels(sequelizeDB: SequelizeDB): void {
        this.modelsList.forEach((model: BaseModel) => {
            sequelizeDB.addModel(model.getModelName(), model.defineModel(sequelizeDB.getInstance()));

            console.log(`Model loaded: ${model.getModelName()}`)
        });

        this.modelsList.forEach((model: BaseModel) => {
            model.associate(sequelizeDB);
            model.configure(sequelizeDB);
        });
    }
}

//Decorators
export function Model(config: ModelConfig) {
    return function (constructor: Function) {
        constructor.prototype.name = config.name;
        constructor.prototype.definition = config.definition;
        SequelizeModelLoader.modelsList.push(constructor.prototype);
    }
}

export interface ModelConfig {
    name: string;
    definition: Sequelize.DefineAttributes
}
