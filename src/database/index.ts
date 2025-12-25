import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import Category from './model/Category'
import Transaction from './model/Transaction'
import { mySchema } from './schema'

const adapter = new SQLiteAdapter({
    schema: mySchema,
    // migrations, // check later on
    jsi: true, /* Platform.OS === 'ios' */
    onSetUpError: error => {
        // Database failed to load -- often because of schema mismatch in dev
        // In production, handle this carefully. In dev, we can just log it.
        console.error(error)
    }
})

export const database = new Database({
    adapter,
    modelClasses: [
        Transaction,
        Category,
    ],
})
