import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { NotebookSchema } from '../models/Notebook.js';
import { EntrySchema } from '../models/Entry.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  // would have been better if Notebooks & Notebook Entries & Entry matched
  Notebooks = mongoose.model('Notebook', NotebookSchema);
  Entries = mongoose.model('Entry', EntrySchema)
}

export const dbContext = new DbContext()
