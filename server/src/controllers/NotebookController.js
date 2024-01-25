import { Auth0Provider } from "@bcwdev/auth0provider";
import { notebookService } from "../services/NotebookService.js";
import BaseController from "../utils/BaseController.js";

export class NotebookController extends BaseController {
    constructor() {
        super('api/notebooks')
        this.router
            .get('', this.getAllNotebooks)

            .use(Auth0Provider.getAuthorizedUserInfo)

            .post('', this.createNotebook)
    }
    async getAllNotebooks(request, response, next) {
        try {
            const notebooks = await notebookService.getAllNotebooks()
            response.send(notebooks)
        } catch (error) {
            next(error)
        }
    }
    async createNotebook(request, response, next) {
        try {
            const notebookData = request.body
            const userId = request.userInfo.id
            notebookData.creatorId = userId
            const notebook = await notebookService.createNotebook(notebookData)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }
}