import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import DetailsRow from '../components/DetailsRow';
import { useScrollToTop } from '@react-navigation/native';
import useFetchGet from '../hooks/useFetchGet';

const DetailsResteurantScreen = () => {
    const navigation = useNavigation()
    const { width, height } = Dimensions.get('screen')
    const ref = React.useRef(null);
    const route = useRoute()
    const { data, isLoading } = useFetchGet(`http://192.168.1.34:8000/api/resteurant/${route.params.slug}`)
    useScrollToTop(ref);

    return (
        <View className='bg-[#ededed] flex-1' style={{justifyContent: 'center', alignItems: 'center', width: width}}>
            <ScrollView ref={ref} contentContainerStyle={{justifyContent: 'center', alignItems: 'center', width: width, paddingBottom: 110}} showsVerticalScrollIndicator={false}>
                <View className='w-screen' style={{zIndex: 1, width: width * 0.9}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='absolute bg-white mt-14 rounded-full items-center justify-center' style={{width: 38, height: 38, zIndex: 1}}>
                        <AntDesign name="left" size={27} color="black" />
                    </TouchableOpacity>
                </View>
                <View className='w-screen items-center' style={{height: height * 0.26}}>
                    <Image source={{cache: "force-cache", uri: `http://192.168.1.34:8000${data && data['resteurant'].image}`}} style={{width: width, height: height * 0.26, resizeMode: 'cover'}} />
                </View>
                <View className='w-screen bg-white items-center py-3 rounded-b-xl'>
                    <View className='' style={{width: width * 0.9}}>
                        <Text className='text-2xl mb-1' style={{fontFamily: 'Montserrat-SemiBold'}}>{data && data['resteurant'].title}</Text>
                        <View className='flex-row items-center'>
                            <AntDesign name="star" size={24} color="black" />
                            <Text className='ml-2 text-sm' style={{fontFamily: 'Montserrat-Medium'}}>{data && data['resteurant'].rating} · {data && data['resteurant'].categoryTitle}</Text>
                        </View>
                    </View>
                </View>
                <View className='w-screen bg-white items-center pt-4 pb-5 rounded-xl mt-3'>
                    <TouchableOpacity className='justify-between flex-row items-center mb-4 pb-4' style={{width: width * 0.9, borderBottomColor: '#ededed', borderBottomWidth: 1}}>               
                        <View className='flex-row items-center justify-center'>
                            <View style={{width: 35}}>
                                <MaterialIcons name="delivery-dining" size={30} color="black" />
                            </View>
                            <View className='ml-2'>
                                {data && data.discountDeliveryFeePrice ? (
                                    <View className='flex-row items-center justify-center mb-1'>
                                        <Text className='mr-2 text-sm text-[#848484]' style={{fontFamily: 'Montserrat-Regular', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>${data && data.deliveryFeePrice}</Text>
                                        <Text className='text-base' style={{fontFamily: 'Montserrat-Medium', fontSize: 15}}>${data && data.discountDeliveryFeePrice}</Text>
                                    </View>
                                ) : (
                                    <Text className='mb-1' style={{fontFamily: 'Montserrat-Medium', fontSize: 15}}>${data && data['resteurant'].deliveryFeePrice}</Text>
                                )}
                                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 15}}>20-25 min</Text>
                            </View>
                        </View>
                        <AntDesign name="right" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className='justify-between flex-row items-center' style={{width: width * 0.9}}>               
                        <View className='flex-row items-center justify-center'>
                            <View style={{width: 35}}>
                                <AntDesign name="infocirlceo" size={26} color="black" />
                            </View>                        
                            <View className='ml-2 items-center justify-center'>
                                <Text className='mb-1' style={{fontFamily: 'Montserrat-Medium', fontSize: 15}}>Allergies and contact details</Text>
                            </View>
                        </View>
                        <AntDesign name="right" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                    {/* Details Row */}
                    {data && data['categories'].map((item, nr) => (             
                        <DetailsRow title={item} key={nr} products={data['products']} resteurantId={data['resteurant']['id']} />
                    ))}
            </ScrollView>
        </View>
        
    )
}

export default DetailsResteurantScreen