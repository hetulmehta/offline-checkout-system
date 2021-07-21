import React from 'react';
import { Text, View, AnimatedImage, Colors, ComponentsColors } from 'react-native-ui-lib';
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
                    <View marginL-15 row marginT-15 >
                        <Text marginT-2 marginL-5 style={{ color: '#ff0f87', fontSize: 16 }}>₹{this.props.SalePrice}</Text>
                        <Text marginT-2 marginL-8 style={{ textDecorationLine: 'line-through', fontSize: 16 }}>₹{this.props.MarketPrice}</Text>
                    </View>
                </View>
            </CstmShadowView>
        )
    }
}

const styles = StyleSheet.create({
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
        height: 125,
        width: 125,
        flex: 1,
        borderRadius: 10,
    },
    AnimatedImageContainerStyle: {
        backgroundColor: Colors.white,
        width: 135,
        height: 135,
        paddingLeft: 10,
    },
    shadow: {
        marginBottom: 5,
        height: 'auto',
        borderRadius: 20,
        paddingVertical: 10,
        flexDirection: 'row',
    }
})

export default ProductDetails;