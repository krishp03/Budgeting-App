import { DashboardHeader } from '@/components/DashboardHeader';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionList } from '@/components/TransactionList';
import { database } from '@/database';
import Transaction from '@/database/model/Transaction';
import { RootState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// Separated Dashboard Component to receive observed props
const Dashboard = ({ transactions }: { transactions: Transaction[] }) => {
  const router = useRouter();

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 from-gray-50 to-white" edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <DashboardHeader />

        {/* Summary Cards */}
        <View className="flex-row px-3 mt-2">
          <SummaryCard title="Income" amount={income} type="income" />
          <SummaryCard title="Expenses" amount={expense} type="expense" />
        </View>
        <View className="flex-row px-3 mt-2">
          <SummaryCard title="Total Balance" amount={balance} />
        </View>

        <TransactionList />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push('/finances')}
        className="absolute bottom-6 right-6 bg-black w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Enhance with Observables
// Using observeWithColumns ensures re-render when amount or type changes on any record in the query result
const EnhancedDashboard = withObservables([], () => ({
  transactions: database.get<Transaction>('transactions').query().observeWithColumns(['amount', 'type']),
}))(Dashboard);

// Main Screen Wrapper (Handles Navigation Logic)
export default function HomeScreen() {
  const { isOnboarded } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!isOnboarded) {
      const timer = setTimeout(() => {
        router.push('/onboarding' as any);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOnboarded]);

  return <EnhancedDashboard />;
}
