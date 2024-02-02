import { AppState } from "../AppState.js";
import { Entry } from "../models/Entry.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class EntryService {
    async getMyEntries() {
        const response = await api.get('api/entries')
        logger.log('my entries response data:', response.data)
        AppState.entries = response.data.map(entry => new Entry(entry))
    }
}

export const entryService = new EntryService()