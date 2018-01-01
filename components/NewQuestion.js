import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import QuizzView from './QuizzView';
import { getDecks, addNewCard } from '../utils/api';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const radio_props = [
  {label: 'Correct', value: true },
  {label: 'Incorrect', value: false }
];

class NewQuestion extends React.Component {

    constructor() {
        super();
        this.state = {
            question: '',
            answer: '',
            correct: true,
            deck: null
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
                deck: decksArr.filter(deck => deck.title === this.props.navigation.state.params)
            });
        })
    }

    _saveCard = () => {
        if (this._validate()) {
            let newCard = {
                title: this.props.navigation.state.params,
                questionData: {
                    question: this.state.question,
                    answer: this.state.answer,
                    correct: this.state.correct
                },
                addCard: true
            }
            addNewCard(newCard, newCard.title, this.props.navigation)
        } else {
            console.log('Error adding new question');
        }
    }

    _validate = () => {
        let isValid = true;
        if (this.state.question.length === 0 || this.state.answer.length === 0) {
            Alert.alert('Title Required', 'The Deck must have a name');
            isValid = false;
        } 
        return isValid;
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{ textAlign: 'center' }}>ENTER THE NEW QUESTION</Text>
                    <TextInput
                        onChangeText={question => this.setState({ question })}
                        value={this.state.question}
                        style={styles.input}
                        placeholder={'Type here'}
                        returnKeyType={'done'}
                    />
                    <Text style={{ textAlign: 'center' }}>ENTER THE ANSWER</Text>
                    <TextInput
                        onChangeText={answer => this.setState({ answer })}
                        value={this.state.answer}
                        style={styles.input}
                        placeholder={'Type here'}
                        returnKeyType={'done'}
                    />
                    <View>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            onPress={(value) => { this.setState({ correct: value }) }}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={this._saveCard}
                            style={styles.button}
                        >
                            <FontAwesome name="save" size={30} color={'black'} style={{ textAlign: 'center' }} />
                        </TouchableOpacity>
                        <Text style={styles.textInput}>- Add Card -</Text>
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

export default NewQuestion;