import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert
} from 'react-native'
import { getDecks, saveDeck } from '../utils/api';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckList from './DeckList';

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

	_saveDeck = () => {
		if (this._validate()) {
			let title = this.state.title
			let newDeck = {
				[title]:
				{
					title: title,
					questions: []
				}
			}
			this.setState({
				title: ''
			});
			saveDeck(newDeck, title, this.props.navigation);
			this._fetchDecks();
		} else {
			console.log('Error adding deck');
		}
	}

	_validate = () => {
		let isValid = true;
		if (this.state.title.length === 0) {
			Alert.alert('Title Required', 'The Deck must have a name');
			isValid = false;
		} else {
			this.state.decks.forEach((deck) => {
			if (deck.title === this.state.title) {
				Alert.alert('Error', 'This deck already exits. Try with a new name');
				isValid = false;
			}
			});
		}
		return isValid;
	}


	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={{ textAlign: 'center' }}>ENTER YOUR NEW DECK</Text>
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
							<FontAwesome name="save" size={30} color={'black'} style={{ textAlign: 'center' }} />
						</TouchableOpacity>
						<Text style={styles.textInput}>- Save -</Text>
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
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#fff',
		margin: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	textInput: {
		textAlign: 'center'
	}
})

export default NewDeck;