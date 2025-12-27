import { database } from '@/database';
import Category from '@/database/model/Category';
import Transaction from '@/database/model/Transaction';
import { Ionicons } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';
import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

// Render Item Component
const TransactionItemComponent = ({ transaction, category }: { transaction: Transaction, category?: Category | null }) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push({ pathname: '/finances', params: { id: transaction.id } })}
            className="flex-row justify-between items-center p-4 border-b border-gray-50"
        >
            <View className="flex-row items-center gap-4">
                <View className={`p-3 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Ionicons
                        name={(category?.icon as any) || (transaction.type === 'income' ? 'cash-outline' : 'cart-outline')}
                        size={20}
                        color={transaction.type === 'income' ? '#16a34a' : '#ef4444'}
                    />
                </View>
                <View>
                    <Text className="font-semibold text-base text-black">{transaction.title || category?.name || 'Untitled'}</Text>
                    <Text className="text-xs text-gray-500">
                        {category?.name ? `${category.name} • ` : ''}{new Date(transaction.date).toLocaleDateString()}
                    </Text>
                </View>
            </View>
            <Text className={`font-bold text-base ${transaction.type === 'income' ? 'text-green-600' : 'text-black'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </Text>
        </TouchableOpacity>
    );
};

const enhanceItem = withObservables(['transaction'], ({ transaction }: { transaction: Transaction }) => ({
    transaction: transaction.observe(),
    category: transaction.category.observe(),
}));

export const TransactionItem = enhanceItem(TransactionItemComponent);

const EnhancedTransactionList = ({ transactions }: { transactions: Transaction[] }) => {
    const router = useRouter();

    return (
        <View className="flex-1 mt-6 bg-white rounded-t-3xl shadow-sm pb-20">
            <View className="flex-row justify-between items-center p-5 border-b border-gray-100">
                <Text className="text-lg font-bold text-black">Recent Transactions</Text>
                <TouchableOpacity onPress={() => router.push('/transactions')}>
                    <Text className="text-blue-500 text-sm font-medium">See All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                ListEmptyComponent={
                    <View className="p-8 items-center justify-center">
                        <Text className="text-gray-400 text-base">No recent transactions</Text>
                    </View>
                }
                renderItem={({ item }) => <TransactionItem transaction={item} />}
            />
        </View>
    );
};

const observeTransactions = () => ({
    transactions: database.get<Transaction>('transactions')
        .query()
        .observeWithColumns(['updated_at']),
});

export const TransactionList = withObservables([], observeTransactions)(EnhancedTransactionList);
