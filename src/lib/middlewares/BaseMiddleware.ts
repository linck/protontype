import { ProtonApplication } from '../application/ProtonApplication';
import Express from 'express';
/**
 * @author Humberto Machado
 */
export abstract class BaseMiddleware {
    protected express: Express.Application;
    protected protonApplication: ProtonApplication;
    public middlewareFuntion: Express.RequestHandler;
    public autoNext:boolean;

    public init(protonApplication: ProtonApplication): BaseMiddleware {
        this.express = protonApplication.getExpress();
        this.protonApplication = protonApplication;
        return this;
    }

    public configMiddlewares(): void {}
}