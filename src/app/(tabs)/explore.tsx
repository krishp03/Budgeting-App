import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoriesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="p-6">
        <Text className="text-3xl font-bold text-black mb-2">Categories</Text>
        <Text className="text-gray-500 mb-8">Manage your spending categories.</Text>

        {/* Placeholder for categories management UI */}
        <View className="bg-gray-50 p-10 rounded-3xl items-center justify-center border border-dashed border-gray-300">
          <Text className="text-gray-400">Categories management coming soon!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
