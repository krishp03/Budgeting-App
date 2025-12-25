import { Text, View } from 'react-native';

interface SummaryCardProps {
    title: string;
    amount: number;
    type?: 'income' | 'expense' | 'neutral';
}

export const SummaryCard = ({ title, amount, type = 'neutral' }: SummaryCardProps) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 mx-1">
            <Text className="text-gray-500 text-xs uppercase font-bold tracking-wider">{title}</Text>
            <Text className={`text-lg font-bold mt-1 ${type === 'income' ? 'text-green-600' : type === 'expense' ? 'text-red-600' : 'text-black'
                }`}>
                {formattedAmount}
            </Text>
        </View>
    );
};
