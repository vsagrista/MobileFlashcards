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

    render() {
        console.log('this.state: ', this.state)
        return (
            <View>
                <View style={styles.container}>
                    <Text>QUIZZ</Text>
                </View>
                <View>
                    <Text >{this.state.count}</Text>
                </View>
                <View >
                    {this.state.questions.length > 0 &&
                        <Text style={{textAlign: 'center'}}>{this.state.questions[this.state.currentQuestion].question}</Text>
                    }
                </View>
                <View style={styles.viewAnswer}>
                    <Text style={{textAlign: 'center', color: 'red'}}>View Answer</Text>
                </View>
                <View>
                    <TouchableOpacity style={[styles.button, styles.buttonCorrect]}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Correct</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.button, styles.buttonIncorrect]}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Incorrect</Text>
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
    viewAnswer: {
        justifyContent: 'center',
        margin: 20
    },  
    button: {
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
    buttonCorrect: {
        backgroundColor: 'green'
    },
    buttonIncorrect: {
        backgroundColor: 'red'
    },
})

export default QuizzView;