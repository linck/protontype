import {SequelizeDB} from "./SequelizeDB";
import * as Express from "express";
import {ExpressRouter} from "../routes/ExpressRouter";
import {Middleware} from "../middlewares/Middleware";
import {RouteConfigLoader, RouteConfig} from "./RouteConfigLoader";
import {Method} from "../routes/Method";

/**
 * @author Humberto Machado
 */
export class ExpressApplication {
    private express: any;
    private middlewares: Middleware[] = [];
    private sequelizeDB: SequelizeDB;
    private routers: ExpressRouter[] = [];

    /**
     * Create express application instance and middlewares
     */
    constructor() {
        this.express = Express();
        this.sequelizeDB = new SequelizeDB();
    }

    /**
     * Initialize express application and load middlewares
     * @return express instance
     */
    public bootstrap(): any {
        this.configMiddlewares();
        let port: number = this.express.get("port");
        this.sequelizeDB.getDB().sequelize.sync().done(() => {
            this.configureRoutes();
            this.express.listen(port, () => console.log(`NTask API - porta ${port}`));
        });
        return this.express;
    }

    public addRouter(router: ExpressRouter) {
        this.routers.push(router);
        return this;
    }

    public addMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware);
        return this;
    }

    private configureRoutes(): void {
        this.routers.forEach(router => {
            router.init(this);
            var configs: RouteConfig[] = RouteConfigLoader.routeConfigs[router.getBaseUrl()];

            if (configs != null) {
                configs.forEach(config => {
                    switch (config.method) {
                        case Method.GET:
                            this.express.get(router.getBaseUrl() + config.endpoint, (req, res) => {
                                config.routeFunction.call(router, req, res, this.sequelizeDB.getModel(config.modelName));
                            });
                            break;
                        case Method.POST:
                            this.express.post(router.getBaseUrl() + config.endpoint, (req, res) => {
                                config.routeFunction.call(router, req, res, this.sequelizeDB.getModel(config.modelName));
                            });
                            break;
                        case Method.PUT:
                            this.express.put(router.getBaseUrl() + config.endpoint, (req, res) => {
                                config.routeFunction.call(router, req, res, this.sequelizeDB.getModel(config.modelName));
                            });
                            break;
                        case Method.DELETE:
                            this.express.delete(router.getBaseUrl() + config.endpoint, (req, res) => {
                                config.routeFunction.call(router, req, res, this.sequelizeDB.getModel(config.modelName));
                            });
                            break;
                    }
                });
            }
        });
    }

    private configMiddlewares(): void {
        this.middlewares.forEach(middleware => {
            middleware.init(this);
            middleware.configMiddlewares();
        })
    }

    public getExpress(): any {
        return this.express;
    }

    public getSequelizeDB(): SequelizeDB {
        return this.sequelizeDB;
    }
}