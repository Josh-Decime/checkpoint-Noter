import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { NotebookSchema } from '../models/Notebook.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Notebooks = mongoose.model('Notebook', NotebookSchema);
}

export const dbContext = new DbContext()
