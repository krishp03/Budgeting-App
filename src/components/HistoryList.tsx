import { Text, View } from 'react-native';

export const HistoryList = () => {
    return (
        <View className="mt-6">
            <Text className="text-lg font-bold text-black mb-4 px-4">History</Text>
            <View className="p-8 items-center justify-center bg-gray-50 rounded-xl mx-4 border border-gray-100">
                <Text className="text-gray-400 text-base">No history yet</Text>
            </View>
        </View>
    );
};
