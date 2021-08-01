import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import Axios from 'axios';
import CartComponent from './CartComponent';
import { Dimensions, FlatList, StyleSheet, Image } from 'react-native';
import Loader from './Loader';
import HomeIcon from '../icons/HomeIcon.png';
import GLOBAL from '../Global'

const id = 1;
const screenHeight = Dimensions.get('window').height;

const Cart = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const [Loading, isLoading] = useState(true);

    useEffect(async () => {
        try {
            const CancelToken = Axios.CancelToken.source();
            const resp = await Axios.get(`${GLOBAL.url}/usercart/${id}`);
            const products = await resp.data.data;
            setCart(products);
            isLoading(false)
            return CancelToken.cancel();
        } catch (e) {
            console.log(e);
        }
    }, [cart]);

    const removeItem = async item => {
        isLoading(true);
        try {
            await Axios.post(`${GLOBAL.url}/removefromcart`, {
                userID: 1,
                eancode: item.item.eancode,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const checkout = async () => {
        isLoading(true);
        try {
            const CancelToken = Axios.CancelToken.source();
            await Axios.get(`${GLOBAL.url}/checkout/${id}`);
            navigation.navigate("Checkout")
            return CancelToken.cancel();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        // Test ean numbers: 8901030722615 8901396142423 8901396115113
        <View style={{ height: screenHeight, backgroundColor: '#FFFFFF' }}>
            <View row centerV left paddingL-10 style={styles.NavBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.scan} source={HomeIcon} />
                </TouchableOpacity>
                <Text marginL-20 style={{ fontSize: 18 }}>
                    Cart
                </Text>
            </View>
            <View marginB-10 flex>
                {Loading ? (
                    <Loader />
                ) : (
                    <View style={{ height: screenHeight - 50 }}>
                        <FlatList
                            data={cart}
                            ListEmptyComponent={
                                <View flex center style={{ height: 655 }} paddingH-40>
                                    <Text center grey40>
                                        Cart is empty.
                                    </Text>
                                </View>
                            }
                            renderItem={item => (
                                <View marginH-15>
                                    <CartComponent
                                        Image={item.item.product_image_url}
                                        Brand={item.item.brand}
                                        SubCategory={item.item.sub_category}
                                        SalePrice={item.item.sale_price}
                                        MarketPrice={item.item.market_price}
                                        removeProduct={() => removeItem(item)}
                                    />
                                </View>
                            )}
                            onEndReachedThreshold={0.75}
                            keyExtractor={item => item.ProductID.toString()}
                        />
                        {cart.length!=0 ?
                            <TouchableOpacity style={{ backgroundColor: GLOBAL.color.pink }} onPress={checkout}>
                                <Text
                                    centerV
                                    style={{
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        fontSize: 16,
                                        padding: 10,
                                    }}>
                                    Checkout
                                </Text>
                            </TouchableOpacity>
                            :
                            <View>

                            </View>
                        }
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    NavBar: {
        height: 50,
        backgroundColor: '#FFFFFF',
    },
    scan: {
        width: 30,
        height: 30,
    },
});

export default Cart;
