import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { Dimensions, StyleSheet, Image } from 'react-native';
import HomeIcon from '../icons/HomeIcon.png';

const screenHeight = Dimensions.get('window').height;

const Cart = ({ navigation }) => {
    
    return (
        <View style={{ height: screenHeight, backgroundColor: '#FFFFFF' }}>
            <View row centerV left paddingL-10 style={styles.NavBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.scan} source={HomeIcon} />
                </TouchableOpacity>
                <Text marginL-20 style={{ fontSize: 18 }}>
                    Check Out
                </Text>
            </View>
            <View flex center>
                <Text text60 grey30>
                        You have been checked out!
                </Text>
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
