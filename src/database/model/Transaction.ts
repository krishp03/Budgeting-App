import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text, writer } from '@nozbe/watermelondb/decorators'

export default class Transaction extends Model {
    static table = 'transactions'

    @text('title') title!: string
    @field('amount') amount!: number
    @text('type') type!: 'income' | 'expense'
    @text('category_id') categoryId!: string
    @date('date') date!: Date
    @text('notes') notes!: string
    @text('activity_tag') activityTag!: string
    @text('location') location!: string
    @field('is_recurring') isRecurring!: boolean
    @readonly @date('created_at') createdAt!: Date
    @readonly @date('updated_at') updatedAt!: Date

    @writer async updateTransaction(newData: Partial<Transaction>) {
        await this.update(t => {
            if (newData.title) t.title = newData.title
            if (newData.amount) t.amount = newData.amount
            if (newData.type) t.type = newData.type
            if (newData.categoryId) t.categoryId = newData.categoryId
            if (newData.date) t.date = newData.date
            if (newData.notes) t.notes = newData.notes
            if (newData.activityTag) t.activityTag = newData.activityTag
            if (newData.location) t.location = newData.location
            if (newData.isRecurring !== undefined) t.isRecurring = newData.isRecurring
        })
    }
}
