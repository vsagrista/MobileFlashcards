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
        super();
        this.state = {
            questions: [],
            currentQuestion: 0,
            isCorrect: null,
            correctCount: 0,
            title: ''
        }
    }

    componentDidMount() {
        console.log('this.props.navigation.state.params from quizzView: ', this.props.navigation.state.params);
        if (this.props.navigation.state.params.data) { // if true, the quizz is run from the resultsView component
            this.setState({
                count: `${this.props.navigation.state.params.data.currentQuestion + 1} / ${this.props.navigation.state.params.data.questions.length}`,
                currentQuestion: this.props.navigation.state.params.data.currentQuestion,
                questions: this.props.navigation.state.params.data.questions,
                correctCount: this.props.navigation.state.params.data.correctCount,
                title: this.props.navigation.state.params.data.title
            })
        } else {
            this.setState({
                count: `${this.state.currentQuestion + 1} / ${this.props.navigation.state.params.questions.length}`,
                questions: this.props.navigation.state.params.questions,
                title: this.props.navigation.state.params.title
            })
        }
    }


    _handleAnswer = (answer, viewAnswer) => {
        let isCorrect = this.state.questions[this.state.currentQuestion].correct === answer
            ? true
            : false
        let isLastQuestion = this.state.currentQuestion + 1 === this.state.questions.length;
        let correctCount = isCorrect ? this.state.correctCount + 1 : this.state.correctCount;
        let answerData = {
            data: {
                questions: this.state.questions,
                currentQuestion: this.state.currentQuestion + 1,
                isCorrect: isCorrect,
                correctCount: isCorrect ? this.state.correctCount + 1 : this.state.correctCount,
                title: this.state.title
            },
            isLastQuestion: isLastQuestion,
            correctCount: correctCount,
            viewAnswer: {
                show: viewAnswer,
                answer: this.state.questions[this.state.currentQuestion].answer
            }
        }
        this._showResults(answerData);
    }

    _showResults = (answerData) => {
        this.props.navigation.navigate('ResultsView', answerData);
    }


    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text>QUIZZ</Text>
                </View>
                <View>
                    <Text >{this.state.count}</Text>
                </View>
                <View>
                    {this.props.navigation.state.params.data &&
                        <Text>Success rate: {Math.round((this.state.correctCount / this.props.navigation.state.params.data.currentQuestion) * 100)}%</Text>
                    }
                </View>
                <View >
                    {this.state.questions.length > 0 &&
                        <Text style={{ textAlign: 'center' }}>{this.state.questions[this.state.currentQuestion].question}</Text>
                    }
                </View>
                <View style={styles.viewAnswer}>
                    <Text style={{ textAlign: 'center', color: 'red' }}
                        onPress={() => {
                            this._handleAnswer(false, true);
                        }}>
                        View Answer</Text>
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