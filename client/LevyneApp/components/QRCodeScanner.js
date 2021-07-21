import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import QRCodeScanner from 'react-native-qrcode-scanner';
import NavbarBack from "./NavBarBack";
import { Dimensions , StyleSheet } from 'react-native';
import Axios from 'axios';
import Loader from './Loader';

const width = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height;

export default class ScanScreen extends React.Component {
    constructor(props){
        super(props);
            this.state= {
                Loading: false
            };
    }

    Header = () => (
        <View style={{width}} flex paddingH-5>
            <Text style={styles.title}>Scan the code on your product to add the item to your cart!</Text>
        </View>
    )

    onSuccess = async ({data: url}) => {
        try{
            this.setState({Loading: true})
            const res = await Axios.get(`http://192.168.1.4:3000/${url}`);
            const product = res.data;
            this.props.navigation.navigate('ProductDetails', {
                Details: product,
            });
            this.setState({Loading: false})
        } catch (error){
            console.log(error);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, height: screenHeight, backgroundColor: '#FFFFFF' }}>
                <NavbarBack 
                Title={"Scan now"} 
                Navigation={this.props.navigation.goBack}
                Cart={()=>this.props.navigation.navigate('Cart')}/>
                {this.state.Loading ? (
                    <Loader/>
                )
                :
                (
                    <QRCodeScanner
                    onRead={this.onSuccess}
                    // flashMode={RNCamera.Constants.FlashMode.auto}
                    showMarker={true}
                    checkAndroid6Permissions={true}
                    topContent={<this.Header/>}
                />  
                )}
            </View>
        );
    }

};


const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontFamily: 'Mulish-ExtraBold',
        color: '#909090',
        marginLeft: 10,
        fontWeight: 'bold',
    }
})