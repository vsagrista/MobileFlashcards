import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList
} from 'react-native'
import DeckView from './DeckView'

class DeckList extends React.Component {

	_keyExtractor = (item, index) => item.id;

	renderItem = ({ item }) => (
		<View style={styles.item}>
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('DeckView')
					console.log('item')
				}}>
				<Text>{item.name}</Text>
			</TouchableOpacity>
		</View>
	)


	render() {
		let sampleData = [{ name: 'text1', id: 'orirnie' }, { name: 'text2', id: 'frpofmperf' }]
		return (
			<View style={styles.container}>
				<FlatList
					data={sampleData}
					renderItem={this.renderItem}
					keyExtractor={this._keyExtractor}
				/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		borderRadius: 16,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 25,
		justifyContent: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		}
	},
});


export default DeckList;