import { icons } from '@/constants'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View, TextInput } from 'react-native'


interface Props {
    // value: string,
    // handleChangeText: (e: string) => void,
    // otherStyle: string,
}

const SearchInput = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex flex-row items-center space-x-4">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                // value={props.value}
                value=""
                placeholder="Search for a video topic"
                placeholderTextColor='#7b7b8b'
                // onChangeText={props.handleChangeText}
                // onChangeText={''}
            />

            <TouchableOpacity>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>

        </View>

    )
}

export default SearchInput