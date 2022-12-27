import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { Formik } from 'formik'
import KeyboardAvoidWrapper from '../components/KeyboardAvoidWrapper'
import { AuthContext } from '../contexts/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

const LoginScreen = () => {
    const ref1 = useRef()
    const { loginUser } = useContext(AuthContext)
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const navigation = useNavigation()

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
    })

    if (!fontsLoaded){
        return <ActivityIndicator size='large' />
    }

    const { width, height } = Dimensions.get('screen')

    return (
        <KeyboardAvoidWrapper>
            <SafeAreaView className='flex-1 justify-center items-center bg-[#fff]'>
                <View className='mb-8'>
                    <Image source={require('../assets/images/login.png')} style={{width: width * 0.57, height: width * 0.57}} />
                </View>
                <View className='justify-start items-start w-screen pl-5 pr-5 mb-3'>
                    <Text className='text-2xl font-semibold text-black' style={{fontFamily: 'Montserrat-SemiBold'}}>Login</Text>
                </View>
                <Formik
                    initialValues={{username: '', password: ''}}
                    onSubmit={(values) => loginUser(values.username, values.password)}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View className='justify-start w-screen pl-5 pr-5'>
                            <View className='justify-start w-sceeen flex-row items-center mt-4'>
                                <View className='justify-center items-center w-10 mr-1'>
                                  <Ionicons name="person" size={24} color="gray" />
                                </View>
                                <View className='border-b border-gray-400 w-screen flex-1 justify-center'>
                                    <TextInput  
                                        placeholder='Username'
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
                                        blurOnSubmit={false}
                                        returnKeyType='next'
                                        onSubmitEditing={() => {
                                          ref1.current.focus()
                                        }}
                                        placeholderTextColor={'gray'}
                                        className='text-base pr-4 text-black'
                                        style={{fontFamily: 'Montserrat-Regular', color: 'black', height: 53}}
                                    />
                                </View>
                            </View>
                            <View className='justify-start w-sceeen flex-row items-center mt-5'>
                                <View className='justify-center items-center w-10 mr-1'>
                                  <FontAwesome name="lock" size={24} color="gray" />
                                </View>
                                <View className='border-b border-gray-400 w-screen flex-1 justify-between flex-row items-center '>
                                    <TextInput  
                                        placeholder='Password'
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        blurOnSubmit={false}
                                        returnKeyType='Done'
                                        secureTextEntry={hiddenPassword}
                                        ref={ref1}
                                        placeholderTextColor={'gray'}
                                        className='text-base pr-4 text-black flex-1'
                                        style={{fontFamily: 'Montserrat-Regular', color: 'black', height: 53}}
                                    />
                                    {hiddenPassword ? 
                                    (
                                      <View className='pl-3 py-2'>
                                        <Feather name="eye" size={21} color='gray' onPress={() => setHiddenPassword(!hiddenPassword)}/>
                                      </View>
                                    )
                                    :  <View className='pl-3 py-2'>
                                          <Feather name="eye-off" size={21} color='gray' onPress={() => setHiddenPassword(!hiddenPassword)}/>
                                        </View>
                                    }
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleSubmit} className='justify-center items-center bg-[#0082F6] pt-4 pb-4 rounded-md mt-8'>
                                <Text className='text-white font-bold text-base' style={{fontFamily: 'Montserrat-Medium'}}>Login</Text>
                            </TouchableOpacity>
                        </View>  
                    )}
                </Formik>
                <View className='pl-5 pr-5 flex-row justify-between w-screen mt-5'>
                    <Text className='text-gray-400 text-sm pb-2 pt-2 font-bold'>New In App?</Text>
                    <Text className='text-[#0082F6] text-sm font-bold pb-2 pt-2' onPress={() => navigation.navigate('RegisterScreen')}>Register Now!</Text>
                </View>
            </SafeAreaView>
        </KeyboardAvoidWrapper>
    )
}

export default LoginScreen