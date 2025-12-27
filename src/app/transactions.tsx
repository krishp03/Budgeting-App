import { TransactionItem } from '@/components/TransactionList';
import { database } from '@/database';
import Transaction from '@/database/model/Transaction';
import { withObservables } from '@nozbe/watermelondb/react';
import { Stack } from 'expo-router';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FullTransactionList = ({ transactions }: { transactions: Transaction[] }) => {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
            <Stack.Screen options={{
                title: 'All Transactions',
                headerShown: true,
                headerBackTitle: 'Dashboard'
            }} />
            <View className="flex-1 px-2">
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransactionItem transaction={item} />}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const enhance = withObservables([], () => ({
    transactions: database.get<Transaction>('transactions').query().observe(),
}));

export default enhance(FullTransactionList);
