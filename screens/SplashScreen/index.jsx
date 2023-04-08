import { View, Text } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
        }}
      >
        Post Wall
      </Text>
      <Text style={{ fontSize: 20 }}>Social Media</Text>
    </View>
  )
}

export default index