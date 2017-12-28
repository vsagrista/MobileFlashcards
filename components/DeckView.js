import React from 'react'
import {
	StyleSheet,
	View,
	Text,
    TouchableOpacity,
	FlatList
} from 'react-native'

class DeckView extends React.Component {

	constructor() {
		super();
		this.state = {
			questions: [],
			currentQuestion: 0
		}
	}

	componentDidMount() {
		console.log('params', this.props.navigation.state.params)
		this.setState({
			title: this.props.navigation.state.params.title,
			questions: this.props.navigation.state.params.questions
		})
	}

	renderItem = ({ item }) => (
		<View style={styles.item}>
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('DeckView', item)
				}}>
				<Text style={{textAlign: 'center'}}>Question: {item.question}</Text>
			</TouchableOpacity>
		</View>
	)


	_keyExtractor = (item, i) => i;

	render() {	
		return (
			<View>
				<View style={styles.container}>
					<Text>{this.state.title}</Text>
				</View>
				<FlatList
					data={this.state.questions}
					renderItem={this.renderItem}
					keyExtractor={this._keyExtractor}
				/>
				<Text style={{textAlign: 'center'}}>{this.state.questions.length} cards</Text>

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

export default DeckView;