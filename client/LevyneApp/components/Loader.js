import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';

const Loader = () => {
    return (
        <View center flex>
            <ActivityIndicator color="ff0f87" />
        </View>
    );
};

export default Loader;
