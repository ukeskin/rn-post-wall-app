import { Button as Buttonx, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({ loading, ...props }) => {
  return (
    <Buttonx
      style={styles.button}
      disabled={loading}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
})


export default Button