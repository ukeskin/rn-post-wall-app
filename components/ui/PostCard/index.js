import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PostCard = ({ title, content, user }) => {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >{title}</Text>
      <Text
        style={styles.body}
      >{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 13,
  },

})


export default PostCard

