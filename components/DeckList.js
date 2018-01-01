import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	AsyncStorage
} from 'react-native'
import { getDecks } from '../utils/api'
import DeckView from './DeckView'

class DeckList extends React.Component {

	constructor() {
		super();
		this.state = {
			decks: [],
			showNotification: false
		}
	}

	componentDidMount() {
		this._fetchDecks();
	}

	// Refreshes and notifies after adding new deck
	componentWillReceiveProps() {
		this._fetchDecks();
		this.setState({
			showNotification: true
		})
	}

	componentWillMount() {
		this._fetchDecks();
	}

	_fetchDecks = () => {
		let decksArr = []
		getDecks().then((decks) => {
			Object.values(decks).forEach(function (deck) { decksArr.push(deck) });
			this.setState({
				decks: decksArr
			});
		})
	}

	_keyExtractor = (item, i) => i;

	renderItem = ({ item }) => (
		<View style={styles.item}>
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('DeckView', item)
				}}>
				<Text style={{ textAlign: 'center' }}>Deck: {item.title}</Text>
				<Text style={{ textAlign: 'center' }}>Cards: {item.questions.length}</Text>
			</TouchableOpacity>
		</View>
	)


	render() {
		return (

			<View style={styles.container}>
				<View style={styles.topInfo}>
					<Text style={{ textAlign: 'center' }}>DECKS</Text>
				</View>
				<View style={styles.notification}>
					{this.state.showNotification
						&& <Text style={{ color: 'white', textAlign: 'center' }}>Deck saved!</Text>
					}
					{this.state.showNotification
						&& <Text onPress={() => {
							this.setState({showNotification: false})
						}} style={{ color: 'white', textAlign: 'center' }}>- Close -</Text>
					}
				</View>
				<FlatList
					data={this.state.decks}
					renderItem={this.renderItem}
					keyExtractor={this._keyExtractor}
				/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	topInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 30
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	item: {
		backgroundColor: 'white',
		borderRadius: 16,
		width: 300,
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
	notification: {
		backgroundColor: 'green',
		width: 300,
		marginTop: 50,
		borderRadius: 15
	}
});


export default DeckList;