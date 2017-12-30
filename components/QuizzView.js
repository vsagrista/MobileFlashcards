import React from 'react'
import {
	StyleSheet,
	View,
	Text,
    TouchableOpacity,
	FlatList
} from 'react-native'

class QuizzView extends React.Component {

	constructor() {
		super();
		this.state = {
			questions: [],
			currentQuestion: 0
		}
	}

	componentDidMount() {
		console.log('quizzView', this.props.navigation.state.params)
		this.setState({
		    count: `${this.state.currentQuestion + 1} / ${this.props.navigation.state.params.length}`,
		    questions: this.props.navigation.state.params
		})
	}

	/*renderItem = ({ item }) => (
		<View style={styles.item}>
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('QuizzView', item)
				}}>
				<Text style={{textAlign: 'center'}}>Question: {item.question}</Text>
			</TouchableOpacity>
		</View>
	)*/


	// _keyExtractor = (item, i) => i;

	render() {	
        console.log('this.state: ', this.state)
		return (
			<View>
				<View style={styles.container}>
					<Text>QUIZZ</Text>
				</View>
                <View>
					<Text>{this.state.count}</Text>
				</View>
                <View>
                    {this.state.questions.length > 0 &&
                        <Text>{this.state.questions[this.state.currentQuestion].question}</Text>
                    }
                </View>
                <View>
                    <Text>Answer</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text>Correct</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>
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

export default QuizzView;