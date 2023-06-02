import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 20
    },
    pokeballBG: {
        position: 'absolute',
        width: 300, 
        height: 300,
        top: -100,
        right: -100,
        opacity: 0.3,
    },
    title: {
        fontSize: 35,
        color: 'black',
        fontWeight: 'bold'
    }
});

export default styles;