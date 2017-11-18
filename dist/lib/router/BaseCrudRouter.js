"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressRouter_1 = require("../router/ExpressRouter");
const Method_1 = require("./Method");
const class_transformer_1 = require("class-transformer");
/**
 * Created by Humberto Machado on 14/08/2016.
 */
class BaseCrudRouter extends ExpressRouter_1.ExpressRouter {
    init(protonApplication) {
        super.init(protonApplication);
        this.addRoute('/', Method_1.Method.GET, this.findAll, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/', Method_1.Method.POST, this.create, this.useAuth ? this.useAuth.create : false);
        this.addRoute('/:id', Method_1.Method.GET, this.findOne, this.useAuth ? this.useAuth.read : false);
        this.addRoute('/:id', Method_1.Method.PUT, this.update, this.useAuth ? this.useAuth.update : false);
        this.addRoute('/:id', Method_1.Method.DELETE, this.destroy, this.useAuth ? this.useAuth.delete : false);
    }
    addRoute(endpoint, method, routeFunction, useAuth) {
        this.addRouteConfig({
            endpoint: endpoint,
            method: method,
            routeFunction: routeFunction,
            useAuth: useAuth
        });
    }
    findAll(params) {
        params.app.db.getRepository(this.crudModel)
            .find().then(result => params.res.send(JSON.stringify(result)))
            .catch(error => super.sendErrorMessage(params.res, error));
    }
    create(params) {
        params.app.db.getRepository(this.crudModel).save(class_transformer_1.plainToClass(this.crudModel, JSON.parse(params.req.body)))
            .then(result => params.res.send(JSON.stringify(result)))
            .catch(error => this.sendErrorMessage(params.res, error));
    }
    findOne(params) {
        params.app.db.getRepository(this.crudModel).findOne({ where: params.req.params })
            .then(result => {
            if (result) {
                params.res.send(JSON.stringify(result));
            }
            else {
                params.res.sendStatus(404);
            }
        })
            .catch(error => this.sendErrorMessage(params.res, error));
    }
    update(params) {
        params.app.db.getRepository(this.crudModel).update(params.req.params, JSON.parse(params.req.body))
            .then(result => { params.res.sendStatus(204); })
            .catch(error => this.sendErrorMessage(params.res, error));
    }
    destroy(params) {
        let ids = params.req.params.id.split(',');
        params.app.db.getRepository(this.crudModel).removeByIds(ids)
            .then(result => params.res.sendStatus(204))
            .catch(error => this.sendErrorMessage(params.res, error));
    }
}
exports.BaseCrudRouter = BaseCrudRouter;
/**
 * Decorator @UseAuth()
 *
 * Indicates that a BaseCrudRouter uses the authentication middleware
 */
function UseAuth(options) {
    return function (constructor) {
        if (options) {
            constructor.prototype.useAuth = options;
        }
        else {
            constructor.prototype.useAuth = { create: true, update: true, read: true, delete: true };
        }
    };
}
exports.UseAuth = UseAuth;
//# sourceMappingURL=BaseCrudRouter.js.map