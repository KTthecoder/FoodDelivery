import { View, Text, Dimensions, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import SearchBlock from '../components/SearchBlock';
import { useNavigation } from '@react-navigation/native';
import { useScrollToTop } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthProvider';

const SearchModuleScreen = () => {
    const { width } = Dimensions.get('screen')
    const navigation = useNavigation()
    const ref = React.useRef(null);
    useScrollToTop(ref);

    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { accessToken } = useContext(AuthContext)

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className='items-center justify-center flex-auto'>
                    <View className={`${Platform.OS === 'ios' ? 'pt-16' : 'pt-9'} bg-[#f1f1f1] items-center rounded-b-xl flex-row`} style={{width: width * 0.9}}>
                        <TouchableOpacity onPress={() => navigation.goBack()} className='rounded-full justify-center items-center mr-3 p-1'>
                            <AntDesign name="left" size={26} color="black" />
                        </TouchableOpacity>
                        <View className='bg-[#dedede] rounded-xl flex-row px-2 items-center flex-1'>
                            <AntDesign name="search1" size={22} color="gray" />
                            <TextInput autoFocus onChangeText={(value) => {
                                if(value != ''){
                                    fetch(`http://192.168.1.34:8000/api/search/resteurant/${value}`, {
                                        method: 'GET',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization' : 'Bearer ' + accessToken
                                        }
                                      })
                                      .then(res => res.json())
                                      .then((data) => {
                                        setData(data)
                                        setIsLoading(false)
                                        console.log(data)
                                      })
                                      .catch(err => {
                                        console.log(err.message)
                                      })
                                }   
                                if(value  === ''){
                                    setData('')
                                    setIsLoading(false)
                                }                           
                            }} placeholder='Search...' className='flex-1 ml-2 text-sm text-black items-center self-center py-2' style={{fontFamily: 'Montserrat-Regular', color: 'gray', color: 'black'}}/>
                        </View>
                    </View>
                    <View className='items-center justify-center'>
                        <ScrollView ref={ref} style={{width: width * 0.9}} showsVerticalScrollIndicator={false}>
                            {data === '' ? (
                                <>
                                    <Text className='text-base mt-5' style={{fontFamily: 'Montserrat-SemiBold'}}>Search Resteurants</Text>
                                </>
                            ) : (
                                <>
                                    <Text className='text-base mt-5' style={{fontFamily: 'Montserrat-SemiBold'}}>Found Resteurants</Text>
                                    {data && data.map((item) => (
                                        <SearchBlock key={item.id} title={item.title} categoryTitle={item.categoryTitle} slug={item.slug} image={item.image} />
                                    ))}
                                </>
                            )}
                            
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
        
    )
}

export default SearchModuleScreen