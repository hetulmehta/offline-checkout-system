import { StyleSheet,Image } from 'react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import BackArrowIcon from '../icons/BackArrowIcon.png';
import CartIcon from '../icons/CartIcon.png'

export default class NavBarBack extends React.PureComponent {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<View row centerV left paddingL-10 style={styles.NavBar}>
				<TouchableOpacity onPress={this.props.Navigation}>
                    <Image
                        style={styles.scan}
                        source={BackArrowIcon}
                    />
				</TouchableOpacity>
				<Text marginL-20 style={{fontSize: 18}} >
					{this.props.Title}
				</Text>
				<View flex row centerV right>
                        <TouchableOpacity
                            marginR-12 br100
                            onPress={this.props.Cart}
                        >
                            <Image
                                style={styles.cart}
                                source={CartIcon}
                            />
                        </TouchableOpacity>
                    </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	NavBar: {
		height: 50,
        backgroundColor: '#FFFFFF'
	},
    scan: {
        width: 25,
        height: 25
    },
	cart: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
});
