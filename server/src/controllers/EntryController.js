import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { entryService } from "../services/EntryService.js";

export class EntryController extends BaseController {
    constructor() {
        super('api/entries')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEntry)
    }
    async createEntry(request, response, next) {
        try {
            const entryData = request.body
            entryData.creatorId = request.userInfo.id
            const userId = request.userInfo.id
            const entry = await entryService.createEntry(entryData, userId)
            response.send(entry)
        } catch (error) {
            next(error)
        }
    }
}