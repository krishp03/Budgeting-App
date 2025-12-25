import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text, writer } from '@nozbe/watermelondb/decorators'

export default class Category extends Model {
    static table = 'categories'

    @text('name') name!: string
    @field('budget_limit') budgetLimit!: number
    @text('icon') icon!: string
    @text('color') color!: string
    @field('is_default') isDefault!: boolean
    @readonly @date('created_at') createdAt!: Date
    @readonly @date('updated_at') updatedAt!: Date

    @writer async updateCategory(newData: Partial<Category>) {
        await this.update(c => {
            if (newData.name) c.name = newData.name
            if (newData.budgetLimit) c.budgetLimit = newData.budgetLimit
            if (newData.icon) c.icon = newData.icon
            if (newData.color) c.color = newData.color
            if (newData.isDefault !== undefined) c.isDefault = newData.isDefault
        })
    }
}
