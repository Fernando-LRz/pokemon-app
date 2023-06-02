import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Platform, StyleProp, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import useDebouncedValue from '../hooks/useDebouncedValue';

interface Props {
    style?: StyleProp<ViewStyle>;
    onDebounce: (value: string) => void;
};

const SearchInput = ( { style, onDebounce }: Props ) => {

    const [ textValue, setTextValue ] = useState('');
    const { debouncedValue } = useDebouncedValue( textValue );

    useEffect(() => {
        onDebounce(debouncedValue);
    }, [ debouncedValue ]);

    return (
        <View style={{ 
            ...styles.container,
            ...style as any
        }}>
            <View style={ styles.backgroundText }>
                <TextInput 
                    placeholder="Search Pokemon..."
                    autoCapitalize="none"
                    autoCorrect={ false }
                    style={{ 
                        ...styles.inputText,
                        top: ( Platform.OS === 'ios' ) ? 0 : 2
                    }}
                    value={ textValue }
                    onChangeText={ setTextValue }
                />
                <Icon 
                    name="search-outline"
                    color="grey"
                    size={ 30 }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red'
    },
    backgroundText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 50, 
        backgroundColor: '#F3F1F3',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputText: {
        flex: 1,
        fontSize: 18
    }
});

export default SearchInput;