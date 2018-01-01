import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import QuizzView from './QuizzView';
import DeckView from './DeckView';
import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/helperFunctions';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

class ResultsView extends React.Component {

    constructor() {
        super();
        this.state = {
            showStats: false
        }
    }

    _containerStyle = (isAnswerCorrect, showStats) => {
        let backgroundColor;
        if (showStats) {
            backgroundColor = 'lightblue';
        } else {
            backgroundColor = isAnswerCorrect
                ? 'green'
                : 'red'
        }
        return {
            padding: 10,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: backgroundColor
        }
    }


    _renderSummary = (deckViewParams) => {
        return (
            <View>
                <Text style={{ textAlign: 'center' }}>CONGRATS FOR FINISHING!!!</Text>
                <Text style={{ textAlign: 'center' }}>Your success rate was: {Math.round((this.props.navigation.state.params.data.correctCount / this.props.navigation.state.params.data.currentQuestion) * 100)}%</Text>
                <View>
                    <TouchableOpacity style={[styles.button, styles.buttonIncorrect]}
                        onPress={() => {
                            this.props.navigation.navigate('DeckView', deckViewParams);
                        }}>
                        <Ionicons style={{ textAlign: 'center' }} name="ios-photos-outline" size={40} color={'black'} />
                        <Text style={{ textAlign: 'center' }}>- Back to deck -</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerInner, styles.containerEven]}>
                    <TouchableOpacity
                        onPress={() => {
                            clearLocalNotification().then(setLocalNotification)
                            this.props.navigation.navigate('QuizzView', this.props.navigation.state.params.data)
                        }}>
                        <Ionicons style={{ textAlign: 'center' }} name="ios-refresh" size={40} color={'black'} />
                        <Text style={{ textAlign: 'center' }}>- Retake quizz -</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        let isAnswerCorrect = this.props.navigation.state.params.data.isCorrect;
        let isLastQuestion = this.props.navigation.state.params.isLastQuestion;
        // params for single deck view
        let deckViewParams = {
            title: this.props.navigation.state.params.data.title,
            questions: this.props.navigation.state.params.data.questions
        }
        return (
            <View style={this._containerStyle(isAnswerCorrect, this.state.showStats)}>
                {!this.state.showStats &&
                    <View style={styles.message}>
                        {
                            isAnswerCorrect
                                ? <Text>Awesome!</Text>
                                : <Text>Bummer!</Text>
                        }
                        {
                            isAnswerCorrect
                                ? <Ionicons name="ios-happy-outline" size={40} color={'black'} />
                                : <Ionicons name="ios-sad-outline" size={40} color={'black'} />
                        }
                        <View>
                            {
                                this.props.navigation.state.params.viewAnswer.show &&
                                <Text>Right answer: {this.props.navigation.state.params.viewAnswer.answer}</Text>
                            }
                        </View>

                        <Text>
                            Success rate: {Math.round((this.props.navigation.state.params.data.correctCount / this.props.navigation.state.params.data.currentQuestion) * 100)}%
                        </Text>
                        {
                            !isLastQuestion &&
                            <Text
                                onPress={() => {
                                    this.props.navigation.navigate('QuizzView', this.props.navigation.state.params)
                                }} > - Next Question - 
                            </Text>
                        }
                        {
                            isLastQuestion &&
                            <Text
                                onPress={() => {
                                    this.setState({ showStats: true})
                                }} > - Show stats - 
                            </Text>
                        }

                    </View>
                }
                {
                    this.state.showStats && this._renderSummary(deckViewParams)
                }
            </View >

        )
    }
}

const styles = StyleSheet.create({
    message: {
        flex: 1,
        margin: 20,
        width: 400,
        alignItems: 'center'
    }
})

export default ResultsView;