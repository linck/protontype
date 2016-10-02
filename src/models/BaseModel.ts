import {SequelizeDB} from "../libs/SequelizeDB";
import * as Sequelize from "sequelize"

/**
 * @author Humberto Machado
 */
export abstract class BaseModel {
    //Sequelize Model native instance. @see http://docs.sequelizejs.com/en/latest/docs/models-usage/
    protected model: Sequelize.Model<any, any>;
    protected name: string;
    protected definition: Sequelize.DefineAttributes;

    public getModelName(): string {
        return this.name;
    }

    public defineModel(sequelize: Sequelize.Sequelize): BaseModel {
        this.model = sequelize.define(this.getModelName(), this.definition, {});
        return this;
    }

    public associate(sequelizeDB: SequelizeDB): void {
        //Hook Method
    }

    public configure(sequelizeDB: SequelizeDB) {
        //Hook Method
    }

    public getInstance(): Sequelize.Model<any, any> {
        return this.model;
    }
}

export var DataTypes: Sequelize.DataTypes = Sequelize;