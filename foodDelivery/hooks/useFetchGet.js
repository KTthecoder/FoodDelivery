import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { LogBox } from 'react-native'
import { AuthContext } from '../contexts/AuthProvider'
import * as SecureStore from "expo-secure-store"

const useFetchGet = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { accessToken, isLoading } = useContext(AuthContext)
  const navigation = useNavigation()
  const [change, setChange] = useState(false)
  const route = useRoute()

  const [refresh, setRefresh] = useState(false)

  const isVisible = useIsFocused()

  const [token, setToken] = useState()

  async function getData() {
    await SecureStore.getItemAsync("accessToken").then(async(token) => {
      setToken(token)
      let response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
          },
      })
      let data = await response.json()
      // if(response.status == 200){
        // try{
          setData(data)
          setLoading(false)
          console.log(data['Order Items Count'])
        // } 
        // catch{
        //     console.log("Error Occured")
        // }
    })
  }

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
      // if(isLoading){
        if(token !== null){
          // fetch(url, {
          //   method: 'GET',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Authorization' : 'Bearer ' + accessToken
          //   }
          // })
          // .then(res => res.json())
          // .then((data) => {
          //   setData(data)
            
          //   console.log(data)
          //   setLoading(false)
          //   // console.log(data)
          // })
          // .catch(err => {
          //   console.log(err.message)
          // })
          // console.log("Token: ", accessToken)
          navigation.addListener('focus', () => {
            getData()
          })
          
        }
      // }

    // });
    // return unsubscribe
  }, [url, refresh])

  return {data, loading, refresh, setRefresh}
}

export default useFetchGet