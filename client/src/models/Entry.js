

export class Entry {
    constructor(data) {
        this.id = data.id
        this.description = data.description
        this.creatorId = data.creatorId
        this.img = data.img
        this.notebookId = data.notebookId
        this.notebook = data.notebook
    }
}