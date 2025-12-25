import { DashboardHeader } from '@/components/DashboardHeader';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionList } from '@/components/TransactionList';
import { RootState } from '@/store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const { isOnboarded } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!isOnboarded) {
      // Use a timeout to allow the root layout to mount before navigating
      const timer = setTimeout(() => {
        router.push('/onboarding' as any);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOnboarded]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 from-gray-50 to-white" edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <DashboardHeader />

        {/* Summary Cards */}
        <View className="flex-row px-3 mt-2">
          <SummaryCard title="Income" amount={0} type="income" />
          <SummaryCard title="Expenses" amount={0} type="expense" />
        </View>
        <View className="flex-row px-3 mt-2">
          <SummaryCard title="Total Balance" amount={0} />
        </View>

        <TransactionList />
      </ScrollView>
    </SafeAreaView>
  );
}
