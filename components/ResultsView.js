import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import QuizzView from './QuizzView';
import DeckList from './DeckList';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

class ResultsView extends React.Component {

    _containerStyle = (isAnswerCorrect, isLastQuestion) => {
        let backgroundColor;
        if (isLastQuestion) {
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

    render() {
        let isAnswerCorrect = this.props.navigation.state.params.data.isCorrect;
        let isLastQuestion = this.props.navigation.state.params.isLastQuestion;
        return (
            <View style={this._containerStyle(isAnswerCorrect, isLastQuestion)}>
                {!isLastQuestion &&
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
                        <Text
                            onPress={() => {
                                this.props.navigation.navigate('QuizzView', this.props.navigation.state.params)
                            }} > - Next Question - </Text>
                    </View>
                }
                {isLastQuestion &&
                    <View>
                        <Text style={{ textAlign: 'center' }}>CONGRATS FOR FINISHING!!!</Text>
                        <Text style={{ textAlign: 'center' }}>Your success rate was: {Math.round((this.props.navigation.state.params.data.correctCount / this.props.navigation.state.params.data.currentQuestion) * 100)}%</Text>
                        <View>
                            <TouchableOpacity style={[styles.button, styles.buttonIncorrect]}
                                onPress={() => {
                                    this.props.navigation.navigate('DeckList');
                                }}>
                                <Ionicons style={{ textAlign: 'center' }} name="ios-home-outline" size={40} color={'black'} />
                                <Text style={{ textAlign: 'center' }}>- Finish -</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.containerInner, styles.containerEven]}>
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate('QuizzView', this.props.navigation.state.params.data.questions)
								}}>
                                <Ionicons style={{ textAlign: 'center' }} name="ios-photos-outline" size={40} color={'black'} />
								<Text style={{ textAlign: 'center' }}>- Retake quizz -</Text>
							</TouchableOpacity>
						</View>
                    </View>}
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