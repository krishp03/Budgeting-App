import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'expenses',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'category', type: 'string' },
                { name: 'date', type: 'number' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
    ],
})
