import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
    version: 2, // Incremented version
    tables: [
        tableSchema({
            name: 'transactions',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'type', type: 'string' }, // 'income' or 'expense'
                { name: 'category_id', type: 'string', isIndexed: true },
                { name: 'date', type: 'number' },
                { name: 'notes', type: 'string', isOptional: true },
                { name: 'activity_tag', type: 'string', isOptional: true },
                { name: 'location', type: 'string', isOptional: true },
                { name: 'is_recurring', type: 'boolean' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'categories',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'budget_limit', type: 'number' },
                { name: 'icon', type: 'string' },
                { name: 'color', type: 'string' },
                { name: 'is_default', type: 'boolean' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
    ],
})
