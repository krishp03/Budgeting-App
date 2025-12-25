import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import Expense from './model/Expense'
import { mySchema } from './schema'

const adapter = new SQLiteAdapter({
    schema: mySchema,
    // (You might want to comment out migrationEvents for now)
    // migrations,
    jsi: true, /* Platform.OS === 'ios' */
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
        console.error(error)
    }
})

export const database = new Database({
    adapter,
    modelClasses: [
        Expense,
    ],
})
