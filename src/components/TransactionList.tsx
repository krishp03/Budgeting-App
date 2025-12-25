import { Ionicons } from '@expo/vector-icons';
import { FlatList, Text, View } from 'react-native';

export const TransactionList = () => {
    return (
        <View className="flex-1 mt-6 bg-white rounded-t-3xl shadow-sm">
            <View className="flex-row justify-between items-center p-5 border-b border-gray-100">
                <Text className="text-lg font-bold text-black">Recent Transactions</Text>
                <Text className="text-blue-500 text-sm font-medium">See All</Text>
            </View>
            <FlatList
                data={[]}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                ListEmptyComponent={
                    <View className="p-8 items-center justify-center">
                        <Text className="text-gray-400 text-base">No recent transactions</Text>
                    </View>
                }
                renderItem={({ item }: { item: any }) => (
                    <View className="flex-row justify-between items-center p-4 border-b border-gray-50">
                        <View className="flex-row items-center gap-4">
                            <View className={`p-3 rounded-full ${item.amount > 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
                                <Ionicons name={item.icon as any} size={20} color={item.amount > 0 ? '#16a34a' : '#374151'} />
                            </View>
                            <View>
                                <Text className="font-semibold text-base text-black">{item.title}</Text>
                                <Text className="text-xs text-gray-500">{item.category} • {item.date}</Text>
                            </View>
                        </View>
                        <Text className={`font-bold text-base ${item.amount > 0 ? 'text-green-600' : 'text-black'}`}>
                            {item.amount > 0 ? '+' : ''}{item.amount.toFixed(2)}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};
