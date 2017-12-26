import React from 'react'
import {
	StyleSheet,
	View,
	Text,
} from 'react-native'

class DeckList extends React.Component {

	render() {		
		return (
			<View style={styles.container}>
                <Text>Deck here</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
        backgroundColor: 'white',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	deck: {
		width: 400,
		margin: 0,
		padding: 0,
	},
})

export default DeckList;