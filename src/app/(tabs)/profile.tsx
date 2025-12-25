import { HistoryList } from '@/components/HistoryList';
import { RootState } from '@/store';
import { updateUserName } from '@/store/userSlice';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileScreen() {
    const { name } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name || '');

    const handleSave = () => {
        dispatch(updateUserName(editedName));
        setIsEditing(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="p-6 border-b border-gray-100">
                    <Text className="text-3xl font-bold text-black mb-6">Profile & Insights</Text>

                    <View className="flex-row items-center justify-between bg-gray-50 p-4 rounded-2xl">
                        <View className="flex-1">
                            <Text className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Display Name</Text>
                            {isEditing ? (
                                <TextInput
                                    value={editedName}
                                    onChangeText={setEditedName}
                                    className="text-xl font-bold text-black p-0 border-b border-blue-500"
                                    autoFocus
                                />
                            ) : (
                                <Text className="text-xl font-bold text-black">{name}</Text>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`p-3 rounded-full ${isEditing ? 'bg-blue-600' : 'bg-white shadow-sm border border-gray-100'}`}
                        >
                            <Ionicons
                                name={isEditing ? "checkmark" : "pencil"}
                                size={20}
                                color={isEditing ? "white" : "black"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Insights Section Placeholder */}
                <View className="p-6 pb-0">
                    <Text className="text-lg font-bold text-black mb-4">Monthly Insights</Text>
                    <View className="bg-blue-50 p-6 rounded-2xl items-center">
                        <Ionicons name="stats-chart" size={48} color="#3b82f6" />
                        <Text className="text-blue-900 font-bold text-lg mt-3">Coming Soon</Text>
                        <Text className="text-blue-600 text-center mt-1">Detailed analytics and spending trends will appear here.</Text>
                    </View>
                </View>

                <HistoryList />
            </ScrollView>
        </SafeAreaView>
    );
}
