import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View , AnimatedImage } from 'react-native-ui-lib';
import CstmShadowView from './CstmShadowView';
import NavbarBack from "./NavBarBack";
import { Dimensions, StyleSheet} from 'react-native';
// import Axios from 'axios';
import Loader from './Loader'

const screenHeight = Dimensions.get('window').height;

const ProductDetails = ({ route, navigation }) => {
    const [ProductData, setProductData] = useState({});

    useEffect(() => {
        const { Details } = route.params;
        setProductData(Details.data[0])
    }, [route.params]);

    const addToCart = async() => {
        // await Axios.post('http://192.168.1.4:3000/addtocart',{
        //     body:{
        //         userID: 1,
        //         eancode: 8901396115113
        //     }
        // })
    }

    const scanMore = () => {
        navigation.navigate('ScanScreen')
    }

    return (
        <View style={{ flex: 1, height: screenHeight, backgroundColor: '#FFFFFF' }}>
            <NavbarBack 
            Title={"Product"} 
            Navigation={navigation.goBack}
            Cart={()=>navigation.navigate('Cart')} />
            <View marginH-15>
                <CstmShadowView
                    style={{ marginBottom: 20, height: 'auto',borderRadius: 20 }}>
                        <AnimatedImage
                            style={styles.headerImage}
                            source={{ uri: ProductData.product_image_url }}
                            loader={<Loader />}
                            containerStyle={styles.AnimatedImageContainerStyle}
                        />
                </CstmShadowView>
                <CstmShadowView
                    style={{ marginBottom: 10, marginTop: 40 }}>
                    <TouchableOpacity
                        onPress={addToCart}
                    >
                        <Text centerV style={{ color: '#ff0f87', textAlign: 'center', fontSize: 15, padding: 15 }}>
                            Add to cart
                        </Text>
                    </TouchableOpacity>
                </CstmShadowView>
                <CstmShadowView
                    style={{ marginBottom: 20 }}>
                    <TouchableOpacity
                        onPress={scanMore}
                    >
                        <Text centerV style={{ color: '#ff0f87', textAlign: 'center', fontSize: 15, padding: 15 }}>
                            Scan more products
                        </Text>
                    </TouchableOpacity>
                </CstmShadowView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerImage: {
        height: 150,
        width: 150,
        flex:1,
        borderRadius:10
    },
    AnimatedImageContainerStyle: {
        backgroundColor: Colors.white,
        width:150,
        height:150,
    },
})

export default ProductDetails;