import { Text, StyleSheet } from 'react-native'
import React from 'react';

const HeaderText = ({text}) => {
    return <Text style={styles.headerText}>{text}</Text>
}

const NormalText = ({text}) => {
    return <Text style={styles.normalText}>{text}</Text>
}

const SubHeader = ({text}) => {
    return <Text style={styles.subHeader}>{text}</Text>
}

const ThickHeading = ({text}) => {
    return <Text style={styles.thickHeading}>{text}</Text>
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: "bold",
        fontSize: 16
    },
    normalText: {
        fontSize: 15
    },
    subHeader: {
        color: "grey",
        fontSize: 14
    },
    thickHeading: {
        fontWeight: "bold",
        fontSize: 25
    }
})

export {HeaderText, NormalText, SubHeader, ThickHeading}