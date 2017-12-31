import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native'
import { getDecks, saveDeckTitle } from '../utils/api';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

class NewDeck extends React.Component {

	constructor() {
		super();
		this.state = {
			title: '',
			decks: [],
			errors: {
				empty: false,
				repeated: false
			}
		}
	}

	componentDidMount() {
		let decksArr = []
		//AsyncStorage.clear()
		getDecks().then((decks) => {
			//console.log('decks: ', decks)
			Object.values(decks).forEach(function (deck) { decksArr.push(deck) });
			this.setState({
				decks: decksArr
			});
		})
	}

	_saveDeck = () => {
		//console.log('this.state: ', this.state)
		//console.log('index: ', this.state.decks.indexOf(this.state.title))
		if (this._validate()) { console.log('validation ok') }
		else {
			console.log('something happened')
		}
	}

	_validate = () => {
		if (this.state.title.length === 0) {
			this.setState({ errors: { ...this.state.errors, empty: true } });
			return false;
		}
		this.state.decks.forEach((deck) => {
			if (deck.title === this.state.title) {
				this.setState({ errors: { ...this.state.errors, isRepeated: true } });
				return false;
			}
		});
		return true;
	}


	render() {
		console.log('this.state: ', this.state)
		return (
			<View style={styles.container}>
				<View>
					<Text style={{textAlign: 'center'}}>ENTER YOUR NEW DECK</Text>
					<TextInput
						onChangeText={title => this.setState({ title })}
						value={this.state.title}
						style={styles.input}
						placeholder={'Type here'}
						returnKeyType={'done'}
					/>
					<View>
						<TouchableOpacity
							onPress={this._saveDeck}
							style={styles.button}
						>
							<FontAwesome name="save" size={20} color={'black'} style={{textAlign: 'center'}} />

						</TouchableOpacity>
						<Text style={styles.textInput}>Save</Text>
					</View>

				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		width: 300,
		height: 60,
		padding: 5,
		borderWidth: 2,
		borderColor: 'black',
		backgroundColor: '#fff',
		margin: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	textInput: {
		fontWeight: 'bold',
		textAlign: 'center'
	}
})

export default NewDeck;