import React from 'react';
import { Text, View, AnimatedImage, Colors, TouchableOpacity,Button } from 'react-native-ui-lib';
import CstmShadowView from './CstmShadowView';
import { StyleSheet } from 'react-native';
import Loader from './Loader'


class ProductDetails extends React.Component {

    render() {
        return (
            <CstmShadowView style={styles.shadow}>
                <AnimatedImage
                    style={styles.headerImage}
                    source={{ uri: this.props.Image }}
                    loader={<Loader />}
                    containerStyle={styles.AnimatedImageContainerStyle}
                />
                <View>
                    <Text style={styles.headerText}>
                        {this.props.Brand}
                    </Text>
                    <Text style={styles.category}>
                        {this.props.SubCategory}
                    </Text>
                    <View marginH-15 marginT-5 row>
                        <Text style={{color: '#ff0f87', fontSize: 16}}>₹{this.props.SalePrice}</Text>
                        <TouchableOpacity 
                            style={styles.Button}
                            onPress={this.props.removeProduct}>
                            <Text style={{color: '#FFFFFF', fontSize: 10}}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CstmShadowView>
        )
    }
}

const styles = StyleSheet.create({
    Button: {
        position: 'absolute', right: 100,
        marginHorizontal:10,
        backgroundColor: '#ff0f87',
        padding: 5,
    },
    headerText: {
        marginLeft: 20,
        marginRight: 10,
        fontWeight: "bold",
        width: 100,
        color: 'black',
        fontSize: 18,
    },
    category: {
        marginLeft: 20,
        marginRight: 10,
        fontWeight: "bold",
        width: 300,
        color: 'gray',
        fontSize: 12,
    },
    headerImage: {
        height: 80,
        width: 80,
        flex: 1,
        borderRadius: 10,
    },
    AnimatedImageContainerStyle: {
        backgroundColor: Colors.white,
        width: 90,
        height: 90,
        paddingLeft: 10,
    },
    shadow: {
        marginBottom: 5,
        height: 'auto',
        borderRadius: 20,
        paddingVertical: 10,
        flexDirection: 'row',
    },
})

export default ProductDetails;