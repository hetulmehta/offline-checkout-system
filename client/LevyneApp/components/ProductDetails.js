import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';
import CstmShadowView from './CstmShadowView';
import NavbarBack from "./NavBarBack";
import { Dimensions } from 'react-native';
import Axios from 'axios';
import ProductComponent from './ProductComponent';
import GLOBAL from '../Global'

const screenHeight = Dimensions.get('window').height;

const ProductDetails = ({ route, navigation }) => {
    const [ProductData, setProductData] = useState({});
    const [inCart, setInCart] = useState(false)

    useEffect(() => {
        const CancelToken = Axios.CancelToken.source();
        const { Details } = route.params;
        setProductData(Details.data)
        // console.log(ProductData)
        if (Object.keys(ProductData).length !== 0){
            if (Details.data.inCart===true){
                setInCart(true)
            }
        }
        return CancelToken.cancel();
    }, [route.params]);

    const addToCart = async () => {
        try {
            await Axios.post(`${GLOBAL.url}/addtocart`, {
                userID: 1,
                eancode: ProductData.eancode
            })
            setInCart(true)
        } catch (e) {
            console.log(e)
        }
    }

    const removeFromCart = async () => {
        try {
            await Axios.post(`${GLOBAL.url}/removefromcart`, {
                userID: 1,
                eancode: ProductData.eancode
            })
            setInCart(false)
        } catch (e) {
            console.log(e)
        }
    }

    const scanMore = () => {
        navigation.navigate('ScanScreen')
    }

    return (
        <View style={{ flex: 1, height: screenHeight, backgroundColor: '#FFFFFF' }}>
            <NavbarBack
                Title={"Product"}
                Navigation={navigation.goBack}
                Cart={() => navigation.navigate('Cart')} />
            {ProductData ? (
                <View marginH-15>
                    <ProductComponent
                        Image={ProductData.product_image_url}
                        Brand={ProductData.brand}
                        SubCategory={ProductData.sub_category}
                        SalePrice={ProductData.sale_price}
                        MarketPrice={ProductData.market_price} />
                    <CstmShadowView
                        style={{ marginBottom: 10, marginTop: 30 }}>
                        {inCart ? (
                            <TouchableOpacity
                                onPress={removeFromCart}>
                                <Text centerV style={{ color: '#808080', textAlign: 'center', fontSize: 15, padding: 15 }}>
                                    Remove from cart
                                </Text>
                            </TouchableOpacity>
                        )
                            :
                            (
                                <TouchableOpacity
                                    onPress={addToCart}>
                                    <Text centerV style={{ color: '#ff0f87', textAlign: 'center', fontSize: 15, padding: 15 }}>
                                        Add to cart
                                    </Text>
                                </TouchableOpacity>
                            )}
                    </CstmShadowView>
                    <CstmShadowView>
                        <TouchableOpacity
                            onPress={scanMore}
                        >
                            <Text centerV style={{ color: '#ff0f87', textAlign: 'center', fontSize: 15, padding: 15 }}>
                                Scan more products
                            </Text>
                        </TouchableOpacity>
                    </CstmShadowView>
                </View>
            )
                :
                <View flex center>
                    <Text text60 grey30>No Products found!</Text>
                </View>}
        </View>
    )
}

export default ProductDetails;