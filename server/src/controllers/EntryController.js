import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { entryService } from "../services/EntryService.js";

export class EntryController extends BaseController {
    constructor() {
        super('api/entries')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEntry)
            .delete('/:entryId', this.deleteEntry)
            .get('', this.getMyEntries)
            .put('/:entryId', this.editEntry)
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

    async getMyEntries(request, response, next) {
        try {
            const userId = request.userInfo.id
            const entries = await entryService.getMyEntries(userId)
            response.send(entries)
        } catch (error) {
            next(error)
        }
    }


    async deleteEntry(request, response, next) {
        try {
            const entryId = request.params.entryId
            const userId = request.userInfo.id
            const message = await entryService.deleteEntry(entryId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async editEntry(request, response, next) {
        try {
            const entryId = request.params.entryId
            const updateData = request.body
            const userId = request.userInfo.id
            const entry = await entryService.editEntry(entryId, updateData, userId)
            response.send(entry)
        } catch (error) {
            next(error)
        }
    }
}