import {ExpressRouter} from "../routes/ExpressRouter";
import {RouteConfigLoader} from "../libs/RouteConfigLoader";
import {Method} from "./Method";
import {SequelizeModel} from "../models/SequelizeModel";
/**
 * Created by beto_ on 14/08/2016.
 */
export abstract class BaseCrudRouter extends ExpressRouter {

    constructor(){
        super();
        this.addRoute(this.getBaseUrl(), '/', Method.GET, this.findAll);
        this.addRoute(this.getBaseUrl(), '/', Method.POST, this.create);
        this.addRoute(this.getBaseUrl(), '/:id', Method.GET, this.findOne);
        this.addRoute(this.getBaseUrl(), '/:id', Method.PUT, this.update);
        this.addRoute(this.getBaseUrl(), '/:id', Method.DELETE, this.destroy);
    }

    private addRoute(baseUrl: string, endpoint: string, method: Method, routeFunction: Function){
        this.getModelInstances().forEach(modelInstance => {
            RouteConfigLoader.addRouteConfig(baseUrl,
                {
                    endpoint: endpoint,
                    method: method,
                    routeFunction: routeFunction,
                    modelName: modelInstance.getModelName()
                });
        });
    }

    public findAll(req, res, model: SequelizeModel) {
        model.find({})
            .then(result => res.json(result))
            .catch(error => super.sendErrorMessage(res, error));
    }

    public create(req, res, model: SequelizeModel) {
        model.create(req.body)
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }

    public findOne(req, res, model: SequelizeModel) {
        model.findOne({where: req.params})
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => this.sendErrorMessage(res, error));
    }

    public update(req, res, model: SequelizeModel) {
        model.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }

    public destroy(req, res, model: SequelizeModel) {
        model.destroy({where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }
}