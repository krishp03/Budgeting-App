import { RootState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export const DashboardHeader = () => {
    const { name } = useSelector((state: RootState) => state.user);

    return (
        <View className="flex-row justify-between items-center p-4 pt-2">
            <View>
                <Text className="text-gray-500 text-sm font-medium">Good Morning,</Text>
                <Text className="text-2xl font-bold text-black">{name || 'Guest'}</Text>
            </View>
            <View className="bg-gray-100 p-2 rounded-full">
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
        </View>
    );
};
