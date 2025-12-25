import { setUserName } from '@/store/userSlice';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function OnboardingModal() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleContinue = () => {
        if (name.trim()) {
            dispatch(setUserName(name.trim()));
            router.back(); // Dismiss modal
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white p-6 justify-center"
        >
            <View className="mb-8">
                <Text className="text-3xl font-bold mb-2">Welcome!</Text>
                <Text className="text-gray-500 text-lg">Let's get to know you. What should we call you?</Text>
            </View>

            <View className="mb-8">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1 uppercase tracking-wide">Your Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="e.g. Krish"
                    className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-lg text-black"
                    autoFocus
                />
            </View>

            <TouchableOpacity
                onPress={handleContinue}
                disabled={!name.trim()}
                className={`p-4 rounded-xl items-center ${name.trim() ? 'bg-black' : 'bg-gray-200'}`}
            >
                <Text className={`font-bold text-lg ${name.trim() ? 'text-white' : 'text-gray-400'}`}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
