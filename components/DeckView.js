import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList
} from 'react-native';

class DeckView extends React.Component {

	constructor() {
		super();
		this.state = {
			questions: [],
			currentQuestion: 0
		}
	}

	componentDidMount() {
		this.setState({
			title: this.props.navigation.state.params.title,
			questions: this.props.navigation.state.params.questions
		})
	}

	renderItem = ({ item }) => (
		<View style={styles.item}>
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('QuizzView', item)
				}}>
				<Text style={{ textAlign: 'center' }}>Question: {item.question}</Text>
			</TouchableOpacity>
		</View>
	)


	_keyExtractor = (item, i) => i;

	render() {
		return (
			<View>
				<View style={styles.container}>
					<Text>Title: {this.state.title}</Text>
				</View>
				{/*<FlatList
					data={this.state.questions}
					renderItem={this.renderItem}
					keyExtractor={this._keyExtractor}
				/>*/}
				<Text style={{ textAlign: 'center' }}>Cards: {this.state.questions.length} cards</Text>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('QuizzView', this.props.navigation.state.params.questions)
					}}>
					<Text style={{ textAlign: 'center' }}>Start quizz</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						// this.props.navigation.navigate('QuizzView', item) New question
					}}>
					<Text style={{ textAlign: 'center' }}>Add Question</Text>
				</TouchableOpacity>

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