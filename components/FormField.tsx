import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SignInForm } from '@/app/(auth)/sign-in'
import { TextInput } from 'react-native-gesture-handler'

interface Props {
    title: string,
    value: string,
    handleChangeText: (e: string) => void,
    placeholder?: string,
    otherStyle: string,
    keyboardType?: string
}

const FormField = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${props.otherStyle}`}>
            <Text className='text-base text-gray-100 font-pmedium'>{props.title}</Text>

            <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center'>
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={props.value}
                    placeholder={props.placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={props.handleChangeText}
                    secureTextEntry={props.title === 'password' && !showPassword}
                />
            </View>
        </View>
    )
}

export default FormField