import { View, Text } from 'react-native'
import React from 'react'

interface Props {
    title: string | number,
    subtitle?: string,
    containerStyle: string,
    titleStyles: string,
}

const InfoBox = (props: Props) => {
    return (
        <View className={props.containerStyle}>
            <Text className={`text-white text-center font-psemibold ${props.titleStyles}`}>{props.title}</Text>

            <Text className='text-sm text-gray-100 text-center font-pregular'>{props.subtitle}</Text>
        </View>
    )
}

export default InfoBox