import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text } from '@nozbe/watermelondb/decorators'

export default class Expense extends Model {
    static table = 'expenses'

    @text('title') title
    @field('amount') amount
    @text('category') category
    @date('date') date
    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt
}
