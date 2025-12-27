import { database } from './index';
import Category from './model/Category';

const DEFAULT_CATEGORIES = [
    { id: '1', name: 'Food', icon: 'fast-food', color: '#FF9500', budgetLimit: 500 },
    { id: '2', name: 'Transport', icon: 'car', color: '#007AFF', budgetLimit: 200 },
    { id: '3', name: 'Shopping', icon: 'cart', color: '#FF2D55', budgetLimit: 300 },
    { id: '4', name: 'Salary', icon: 'cash', color: '#4CD964', budgetLimit: 0 },
    { id: '5', name: 'Entertainment', icon: 'film', color: '#5856D6', budgetLimit: 150 },
    { id: '6', name: 'Health', icon: 'medical', color: '#FF3B30', budgetLimit: 100 },
    { id: '7', name: 'Others', icon: 'grid', color: '#8E8E93', budgetLimit: 0 },
];

export async function seedCategories() {
    const categoryCollection = database.get<Category>('categories');
    const count = await categoryCollection.query().fetchCount();

    if (count === 0) {
        console.log('Seeding categories...');
        await database.write(async () => {
            for (const cat of DEFAULT_CATEGORIES) {
                await categoryCollection.create((record) => {
                    record._raw.id = cat.id; // Manually setting ID to match existing mock logic
                    record.name = cat.name;
                    record.icon = cat.icon;
                    record.color = cat.color;
                    record.budgetLimit = cat.budgetLimit;
                    record.isDefault = true;
                });
            }
        });
        console.log('Seeding complete.');
    }
}
