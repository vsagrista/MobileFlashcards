import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import NewQuestion from './NewQuestion';

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
			<View style={{ flex: 1 }}>
				<View style={styles.topInfo}>
					<Text style={{ textAlign: 'left' }}>Cards: {this.state.questions.length}</Text>
					<Ionicons name="ios-photos-outline" size={40} color={'black'} style={{ textAlign: 'center' }} />
					<Text style={{ textAlign: 'center' }}>DECK: {this.state.title && this.state.title.toUpperCase()}</Text>
				</View>
				<View style={styles.container}>
					{
						this.state.questions.length > 0 &&
						<View style={[styles.containerInner, styles.containerEven]}>
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate('QuizzView', this.props.navigation.state.params.questions)
								}}>
								<Text style={{ textAlign: 'center' }}>Start quizz</Text>
							</TouchableOpacity>
						</View>
					}
					<View style={[styles.containerInner, styles.containerOdd]}>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('NewQuestion', this.props.navigation.state.params.title)
							}}>
							<Text style={{ textAlign: 'center' }}>Add Question</Text>
						</TouchableOpacity>
					</View>
					<View>
                            <TouchableOpacity style={[styles.button, styles.buttonIncorrect]}
                                onPress={() => {
                                    this.props.navigation.navigate('DeckList', {notify: true});
                                }}>
                                <Ionicons style={{ textAlign: 'center' }} name="ios-home-outline" size={40} color={'black'} />
                                <Text style={{ textAlign: 'center' }}>- Back home -</Text>
                            </TouchableOpacity>
                        </View>
				</View>
			</View>

		)
	}
}

const styles = StyleSheet.create({
	topInfo: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: 30
	},
	iconWrapper: {
		height: 40,
		backgroundColor: 'blue'
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 10,
		flexDirection: 'column',
		alignItems: 'center'
	},
	containerInner: {
		margin: 20,
		height: 80,
		width: 300,
		padding: 20,
		justifyContent: 'center',
		borderRadius: 15,
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		}
	},
	containerOdd: {
		backgroundColor: 'lightgrey'
	},
	containerEven: {
		backgroundColor: 'lightblue'
	}
})

export default DeckView;