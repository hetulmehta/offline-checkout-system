import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import Axios from 'axios';
import CartComponent from './CartComponent'
import NavBarBack from './NavBarBack';
import { Dimensions, FlatList } from 'react-native';
import Loader from './Loader';

const id = 1;
const screenHeight = Dimensions.get('window').height;

const Cart = ({navigation}) => {
    const [cart, setCart] = useState([]);
    const [Loading, isLoading] = useState(false)

    useEffect(async () => {
        try {
            const resp = await Axios.get(`http://192.168.1.4:3000/checkout/${id}`)
            const products = await resp.data.data
            setCart(products)
        } catch (e) {
            console.log(e)
        }
    }, [cart]);

    const removeItem = async (item) => {
        isLoading(true)
        try {
            await Axios.post('http://192.168.1.4:3000/removefromcart', {
                userID: 1,
                eancode: item.item.eancode
            })
            isLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={{ height: screenHeight, backgroundColor: '#FFFFFF' }}>
            <NavBarBack
                Title={"Cart"}
                Navigation={navigation.goBack} />
            <View marginB-10 paddingT-10 flex>
                {cart == [] ? (
                    <View flex centerV centerH style={{ height: 655 }} paddingH-40>
                        <Text center grey40>Cart is empty.</Text>
                    </View>
                ) :
                    (
                        <FlatList
                            data={cart}
                            ListEmptyComponent={
                                <View flex centerV centerH style={{ height: 655 }} paddingH-40>
                                    <Text center grey40>Cart is empty.</Text>
                                </View>
                            }
                            renderItem={(item) =>
                                <View marginH-15>
                                    <CartComponent
                                        Image={item.item.product_image_url}
                                        Brand={item.item.brand}
                                        SubCategory={item.item.sub_category}
                                        SalePrice={item.item.sale_price}
                                        MarketPrice={item.item.market_price} 
                                        removeProduct={()=>removeItem(item)}/>
                                </View>}
                            // onEndReached={this.onEndReached}
                            onEndReachedThreshold={0.75}
                            keyExtractor={(item) => item.ProductID.toString()}
                        />
                    )}
            </View>
            <TouchableOpacity>
                <Text centerV style={{ color: '#ff0f87', textAlign: 'center', fontSize: 15, padding: 10 }}>
                    Checkout
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Cart;