import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

interface Props  {
    title: string,
    handlePress: () => void,
    containerStyles: string,
    textStyles?: string,
    isLoading?: boolean
}

const CustomButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.handlePress} activeOpacity={.7} className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${props.containerStyles} ${props.isLoading ? 'opacity-50' : ''}`} disabled={props.isLoading}>
      <Text className={`text-primary font-psemibold text-lg ${props.textStyles}`}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
