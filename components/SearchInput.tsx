import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native'


interface Props {
    // value: string,
    // handleChangeText: (e: string) => void,
    // otherStyle: string,
}

const SearchInput = (props: Props) => {
    const pathName = usePathname()
    const [query, setQuery] = useState('')
    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex flex-row items-center space-x-4">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                // value={props.value}
                value={query}
                placeholder="Search for a video topic"
                placeholderTextColor='#CDCDE0'
                onChangeText={(e) => setQuery(e)}
                // onChangeText={''}
            />

            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        return Alert.alert('Missing query', 'Please input something to search results across database')
                    }
                    if (pathName.startsWith('/search')) router.setParams({ query })
                    else router.push(`/search/${query}`)
                }}
            >
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>

        </View>

    )
}

export default SearchInput