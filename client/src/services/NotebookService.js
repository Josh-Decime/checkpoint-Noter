import { AppState } from "../AppState.js";
import { Notebook } from "../models/Notebook.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class NotebookService {
    async getMyNotebooks() {
        const response = await api.get('api/notebooks')
        logger.log('My notebooks from the api:', response.data)
        AppState.notebooks = response.data.map(notebook => new Notebook(notebook))
    }

}

export const notebookService = new NotebookService()