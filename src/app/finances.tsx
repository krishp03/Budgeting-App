import { database } from '@/database';
import Category from '@/database/model/Category';
import Transaction from '@/database/model/Transaction';
import { Ionicons } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { of } from 'rxjs';

function FinancesForm({ transaction, categories, transactionId }: { transaction?: Transaction | null, categories: Category[], transactionId?: string }) {
  const router = useRouter();

  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Initialize state from existing transaction
  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount.toString());
      setTitle(transaction.title);
      setSelectedCategory(transaction.categoryId);
      setDate(transaction.date);
    }
  }, [transaction]);

  // Auto-select first category if none is selected for a NEW transaction
  useEffect(() => {
    if (!transactionId && !selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, transactionId, selectedCategory]);

  const handleSave = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Missing Category', 'Please select a category.');
      return;
    }

    setLoading(true);
    try {
      if (transaction) {
        // Update existing
        await transaction.updateTransaction({
          title: title.trim() || (type === 'income' ? 'Income' : 'Expense'),
          amount: parsedAmount,
          type,
          categoryId: selectedCategory,
          date,
        });
      } else {
        // Create new
        await database.write(async () => {
          await database.get<Transaction>('transactions').create(t => {
            t.title = title.trim() || (type === 'income' ? 'Income' : 'Expense');
            t.amount = parsedAmount;
            t.type = type;
            t.categoryId = selectedCategory;
            t.date = date;
            t.isRecurring = false;
          });
        });
      }
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save transaction.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!transaction) return;
    Alert.alert("Delete", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await database.write(async () => {
              await transaction.markAsDeleted();
              await transaction.destroyPermanently();
            });
            router.back();
          } catch (e) {
            Alert.alert("Error", "Could not delete");
          }
        }
      }
    ]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white">
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      {/* Header */}
      <View className={`pt-4 pb-6 px-4 ${type === 'expense' ? 'bg-red-500' : 'bg-green-500'}`}>
        <View className="flex-row justify-between items-center mb-6 mt-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-white text-lg font-medium">Cancel</Text>
          </TouchableOpacity>

          <View className="flex-row bg-black/20 rounded-lg p-1">
            <TouchableOpacity
              onPress={() => setType('expense')}
              className={`px-4 py-1 rounded-md ${type === 'expense' ? 'bg-white' : 'transparent'}`}
            >
              <Text className={`font-bold ${type === 'expense' ? 'text-red-500' : 'text-white/70'}`}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setType('income')}
              className={`px-4 py-1 rounded-md ${type === 'income' ? 'bg-white' : 'transparent'}`}
            >
              <Text className={`font-bold ${type === 'income' ? 'text-green-500' : 'text-white/70'}`}>Income</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSave} disabled={loading}>
            <Text className="text-white text-lg font-bold">{loading ? "Saving" : "Save"}</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center">
          <Text className="text-white/80 text-lg font-medium mb-2">Amount</Text>
          <View className="flex-row items-center">
            <Text className="text-white text-5xl font-bold mr-1">$</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="numeric"
              className="text-white text-5xl font-bold min-w-[100px] text-center h-20 leading-tight"
              autoFocus={!transactionId}
            />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-6">
        {/* Title */}
        <View className="mb-6">
          <Text className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">Description</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="What is this for?"
            className="bg-gray-50 p-4 rounded-xl text-lg text-black border border-gray-100"
          />
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-3">Category</Text>
          {categories.length === 0 ? (
            <View className="p-4 items-center">
              <ActivityIndicator color="#666" />
              <Text className="text-gray-400 mt-2">Loading categories...</Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-3">
              {categories.map((cat: any) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-3 rounded-xl border flex-row items-center gap-2 ${selectedCategory === cat.id
                    ? (type === 'expense' ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500')
                    : 'bg-white border-gray-200'
                    }`}
                >
                  <Ionicons
                    name={cat.icon as any || 'help'}
                    size={18}
                    color={selectedCategory === cat.id ? (type === 'expense' ? '#ef4444' : '#22c55e') : '#666'}
                  />
                  <Text className={`font-medium ${selectedCategory === cat.id
                    ? (type === 'expense' ? 'text-red-600' : 'text-green-600')
                    : 'text-gray-600'
                    }`}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Date */}
        <View className="mb-8">
          <Text className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">Date</Text>
          <View className="bg-gray-50 p-3 rounded-xl border border-gray-100 items-start">
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(e, d) => d && setDate(d)}
            />
          </View>
        </View>

        {/* Delete */}
        {transactionId && (
          <TouchableOpacity onPress={handleDelete} className="mb-10 p-4 bg-red-100 rounded-xl items-center">
            <Text className="text-red-600 font-bold text-lg">Delete Transaction</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const enhance = withObservables([], ({ transactionId }: { transactionId?: string }) => ({
  transaction: transactionId ? database.get<Transaction>('transactions').findAndObserve(transactionId) : of(null),
  categories: database.get<Category>('categories').query().observe(),
}));

const EnhancedFinancesForm = enhance(FinancesForm);

export default function FinancesScreen() {
  const params = useLocalSearchParams();
  const transactionId = params.id as string | undefined;

  return <EnhancedFinancesForm transactionId={transactionId} />;
}
