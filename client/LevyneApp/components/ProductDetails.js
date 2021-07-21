import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View , AnimatedImage, Colors } from 'react-native-ui-lib';
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
        console.log(ProductData)
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
                <CstmShadowView style={styles.shadow}>
                        <AnimatedImage
                            style={styles.headerImage}
                            source={{ uri: ProductData.product_image_url }}
                            loader={<Loader />}
                            containerStyle={styles.AnimatedImageContainerStyle}
                        />
                {/* <View>
                        <Text
                            hb1
                            style={styles.headerText}
                            numberOfLines={2} ellipsizeMode='tail'
                        >
                            {ProductData.description}
                        </Text>
                </View> */}
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
    )
}

const styles = StyleSheet.create({
    headerText: {
        paddingTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    headerImage: {
        height: 125,
        width: 125,
        flex:1,
        borderRadius:10,
    },
    AnimatedImageContainerStyle: {
        backgroundColor: Colors.white,
        width:125,
        height:125,
    },
    shadow: {
        marginBottom: 20, 
        height: 'auto',
        borderRadius: 20, 
        paddingVertical:10,
        marginHorizontal: 15,
    }
})

export default ProductDetails;