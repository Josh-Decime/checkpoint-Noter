import { reactive } from 'vue'
import { Notebook } from './models/Notebook.js'
import { Entry } from './models/Entry.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {Notebook} */
  notebooks: [],
  /**@type {Entry} */
  entries: {}
})
