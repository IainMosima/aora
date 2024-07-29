import { icons } from '@/constants'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View, TextInput } from 'react-native'


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

            <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex flex-row items-center'>
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={props.value}
                    placeholder={props.placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={props.handleChangeText}
                    secureTextEntry={props.title === 'Password' && !showPassword}
                />
                {props.title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide } className='w-6 h-6' resizeMode='contain'/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField