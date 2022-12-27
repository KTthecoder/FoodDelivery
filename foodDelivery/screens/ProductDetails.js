import { View, Text, Dimensions, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import DeliveryInfoBlock from '../components/DeliveryInfoBlock';
import { useScrollToTop } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthProvider';

const ProductDetails = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const ref = React.useRef(null);
    useScrollToTop(ref);
    const [note, setNote] = useState('')
    const route = useRoute()
    const { accessToken } = useContext(AuthContext)

    return (    
        <KeyboardAvoidingView style={{flex: 1}} {...(Platform.OS === 'ios'
        ? {
            behavior: 'padding' ,
          }
        : {
            behavior: 'height',
        })}>
            <View className='items-center justify-center flex-1'>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <>
                        <View className='flex-row items-center justify-between absolute top-3' style={{width: width * 0.9, zIndex: 1}}>
                            <TouchableOpacity onPress={() => navigation.goBack()} className='bg-gray-200 rounded-full items-center justify-center' style={{width: 40, height: 40}}>
                                <Entypo name="cross" size={35} color="black" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView ref={ref} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} keyboardShouldPersistTaps='handled'>     
                            <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${route.params.image}`}} className='w-screen' style={{ height: 200, resizeMode: 'cover'}} />
                            <View className='w-screen bg-white items-center py-3 rounded-b-xl'>
                                <View className='' style={{width: width * 0.9}}>
                                    <Text className='text-2xl mb-1' style={{fontFamily: 'Montserrat-SemiBold'}}>{route.params.title}</Text>
                                    <View className='flex-row items-center'>
                                        <View className='flex-row items-center mt-2'>
                                            {route.params.discountPrice == null ? (
                                                <Text className='text-base mr-2' style={{fontFamily: 'Montserrat-Medium'}}>${route.params.regularPrice}</Text>
                                            ) : (
                                                <>
                                                    <Text className='text-sm mr-2' style={{fontFamily: 'Montserrat-Medium', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>${route.params.regularPrice}</Text>
                                                    <View className='bg-red-500 rounded-full py-1 px-2'>
                                                        <Text className='text-sm text-white' style={{fontFamily: 'Montserrat-Medium'}}>${route.params.discountPrice}</Text>
                                                    </View>
                                                </>
                                            )}
                                           
                                        </View>
                                    </View>
                                    <Text className='text-sm mt-3' style={{fontFamily: 'Montserrat-Regular'}}>{route.params.description}</Text>
                                </View>
                            </View>
                            <View className='w-screen bg-white items-center mt-4 pt-4 pb-6 rounded-xl'>
                                <View className='' style={{width: width * 0.9}}>
                                    <Text className='text-base mb-3' style={{fontFamily: 'Montserrat-Medium'}}>Leave note for kitchen</Text>
                                    <TextInput 
                                        placeholder='Note' 
                                        value={note} 
                                        onChangeText={(e) => setNote(e)} 
                                        placeholderTextColor={'gray'} 
                                        className='text-black py-3 px-3 rounded-xl justify-start items-start' 
                                        style={{width: width * 0.9, fontSize: 16, borderColor: '#dedede', borderWidth: 1}} 
                                    />
                                </View>
                            </View>
                        </ScrollView>   
                        
                        <View className='w-screen items-center bg-white absolute flex-1 pb-14 bottom-0 pt-6 rounded-t-xl'>
                            <View className='flex-row items-center justify-between' style={{width: width * 0.9}}>
                                {/* <View className='flex-row items-center justify-center rounded-xl px-2' style={{borderWidth: 1, borderColor: '#cdcdcd'}}>
                                    <AntDesign name="minus" size={27} color="black" />
                                    <TextInput keyboardType='numeric' style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, paddingHorizontal: 15, height: 48}} placeholder='1' placeholderTextColor={'gray'} />
                                    <AntDesign name="plus" size={27} color="black" />
                                </View> */}
                                <TouchableOpacity onPress={() => {
                                    fetch(`http://192.168.1.34:8000/api/product/add/${route.params.id}/${route.params.resteurantId}`, {
                                            method: "POST",
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization' : 'Bearer ' + accessToken
                                            },
                                            body: JSON.stringify({
                                                'note' : note,
                                            })
                                        })
                                        .then(res => res.json())
                                        .then((data) => {
                                            console.log(data)
                                            if(data['Error']){
                                                alert('You Have Current Order In Another Resteurant')
                                            }
                                            navigation.goBack()
                                        })
                                        .catch(err => {
                                            console.log(err.message)
                                        })
                                     }} className='bg-green-500 rounded-xl items-center justify-center flex-1' style={{height: 50}}>
                                    <Text className='text-white text-base' style={{fontFamily: 'Montserrat-SemiBold'}}>Add To Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ProductDetails