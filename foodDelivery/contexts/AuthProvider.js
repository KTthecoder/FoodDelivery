import React from 'react'
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext()

const AuthProvider = (props) => {
    let [refreshToken, setRefreshToken] = useState(async () => await SecureStore.getItemAsync('refreshToken') ? await SecureStore.getItemAsync('refreshToken') : null)
    let [accessToken, setAccessToken] = useState(async () => await SecureStore.getItemAsync('accessToken') ? await SecureStore.getItemAsync('accessToken') : null)
    let [user, setUser] = useState(async () => await SecureStore.getItemAsync('accessToken') ? jwt_decode(await SecureStore.getItemAsync('accessToken')) : null)
    // let [refreshToken, setRefreshToken] = useState()
    // let [accessToken, setAccessToken] = useState()
    let [loading, setLoading] = useState(false)
    let [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation()

    async function loginUser(username, password) {
        let response = await fetch('http://192.168.1.34:8000/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        let data = await response.json()
        if(response.status == 200){
            setRefreshToken(data['refresh'])
            setAccessToken(data['access'])
            setUser(jwt_decode(data['access']))
            if(!await SecureStore.getItemAsync('refreshToken')){
                SecureStore.setItemAsync('refreshToken', data['access'])
            }
            if(!await SecureStore.getItemAsync('accessToken')){
                SecureStore.setItemAsync('accessToken', data['access'])
            }

            // try{
            //     SecureStore.setItemAsync('refreshToken', data['refresh'])
            //     SecureStore.setItemAsync('accessToken', data['access'])
            //     console.log("Data: ", data['refresh'])
            // } 
            // catch{
            //     console.log("Error Occured")
            // }
            
            
            GetToken()
        }
        else{
            alert("Something went wrong")
        }
    }

    async function logoutUser() {
        setRefreshToken(null)
        setAccessToken(null)
        setUser(null)
        await SecureStore.deleteItemAsync('refreshToken')
        await SecureStore.deleteItemAsync('accessToken')
        console.log("User Logged Out Correctly")
    }

    async function updateToken() {
        console.log("Refresh: " + refreshToken)
        console.log("Access: " + accessToken)
        let response = await fetch('http://192.168.1.34:8000/api/token/refresh/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'refresh' : refreshToken
            })
        })
        let data = await response.json()

        if(response.status == 200){
            setAccessToken(data.access)
            setUser(jwt_decode(data.access))
            console.log('User is stil logged in')
            await SecureStore.setItemAsync('accessToken', JSON.stringify(data.access))
        }
        else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    async function GetToken() {
        // try{
        //     if(await SecureStore.getItemAsync('refreshToken') === null){
        //         setRefreshToken(null)
        //     }
        //     else{
        //         setRefreshToken(await SecureStore.getItemAsync('refreshToken'))

        //         if(await SecureStore.getItemAsync('accessToken') === null){
        //             setAccessToken(null)
        //             setIsLoading(false)
        //             console.log("Token False")
        //         }
        //         else{
        //             setAccessToken(await SecureStore.getItemAsync('accessToken'))
        //             setIsLoading(false)
        //             console.log("AccessToken: ", await SecureStore.getItemAsync('accessToken'))
        //         }
        //     }
        //   }
        // catch(e){
        //     console.log(e)
        // }
        await SecureStore.getItemAsync("refreshToken").then((token) => {
            setRefreshToken(token)
            setIsLoading(false)
        })

        await SecureStore.getItemAsync("accessToken").then((token) => {
            setAccessToken(token)
            setUser(jwt_decode(token))
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if(loading){
            updateToken()
        }

        let time = 1000 * 60 * 60 * 24
        let interval = setInterval(() => {
            if(accessToken){
                updateToken()
            }
        }, time)

        return () => clearInterval(interval)
    }, [accessToken, refreshToken, loading])

    const data = {
        refreshToken: refreshToken,
        accessToken: accessToken,
        loginUser: loginUser,
        user: user,
        loading: loading,
        logoutUser: logoutUser,
        GetToken: GetToken,
        isLoading: isLoading
    }

    useEffect(() => {
        GetToken()
    }, [accessToken])

    return (
        <AuthContext.Provider value={data}>
            {isLoading ? null : props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider