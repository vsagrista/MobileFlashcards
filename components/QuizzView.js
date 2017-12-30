import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ResultsView from './ResultsView';

class QuizzView extends React.Component {

    constructor() {
        console.log('running quizzview')
        super();
        this.state = {
            questions: [],
            currentQuestion: 0,
            isCorrect: null
        }
    }

    componentDidMount() {
        console.log('this.props.navigation.state.params: ', this.props.navigation.state.params)
        if (this.props.navigation.state.params.data) {
            console.log('yesss ----> ', this.props.navigation.state.params.data)
            this.setState({
                count: `${this.props.navigation.state.params.data.currentQuestion + 1} / ${this.props.navigation.state.params.data.questions.length}`,
                currentQuestion: this.props.navigation.state.params.data.currentQuestion,
                questions: this.props.navigation.state.params.data.questions
            })
        } else {
            this.setState({
                count: `${this.state.currentQuestion + 1} / ${this.props.navigation.state.params.length}`,
                questions: this.props.navigation.state.params
            })
        }
    }


    _handleAnswer = (answer) => {
        console.log('here, this.state.currentQuestion: ', this.state.currentQuestion)
        let isCorrect = this.state.questions[this.state.currentQuestion].correct === answer
            ? true
            : false
        let isLastQuestion = this.state.currentQuestion + 1  === this.state.questions.length
        //console.log('this.state.questions[this.state.currentQuestion].correct: ', this.state.questions[this.state.currentQuestion].correct, answer, isCorrect)
        let answerData = {
            data: {
                questions: this.state.questions,
                currentQuestion: this.state.currentQuestion + 1,
                isCorrect: isCorrect
            },
            isLastQuestion: isLastQuestion
        }
        this._showResults(answerData);
    }

    _showResults = (answerData) => {
        this.props.navigation.navigate('ResultsView', answerData);
    }


    render() {
        //console.log('this.state: ', this.state)
         console.log('here rendering')
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
                        <Text style={{ textAlign: 'center' }}>{this.state.questions[this.state.currentQuestion].question}</Text>
                    }
                </View>
                <View style={styles.viewAnswer}>
                    <Text style={{ textAlign: 'center', color: 'red' }}>View Answer</Text>
                </View>
                <View onPress={() => {
                    this.props.navigation.navigate('DeckView', item)
                }}>
                    <TouchableOpacity style={[styles.button, styles.buttonCorrect]}
                        onPress={() => {
                            this._handleAnswer(true);
                        }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Correct</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.button, styles.buttonIncorrect]}
                        onPress={() => {
                            this._handleAnswer(false);
                        }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Incorrect</Text>
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