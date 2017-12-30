import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import QuizzView from './QuizzView'; 
import { FontAwesome, Ionicons } from '@expo/vector-icons';

class ResultsView extends React.Component {


    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        console.log('results view')
        console.log('params from results: ', this.props.navigation.state.params)
    }

    _containerStyle = (isAnswerCorrect) => {
        return {
            padding: 10,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isAnswerCorrect
                ? 'green'
                : 'red'
        }
    }

    render() {
        let isAnswerCorrect = this.props.navigation.state.params.data.isCorrect;
        return (
            <View style={this._containerStyle(isAnswerCorrect)}>
                <View style={styles.message}>
                    {
                        isAnswerCorrect
                            ? <Text>Awesome!</Text>
                            : <Text>Not quite!</Text>
                    }
                    {
                        isAnswerCorrect
                            ? <Ionicons name="ios-happy-outline" size={40} color={'black'} />
                            : <Ionicons name="ios-sad-outline" size={40} color={'black'} />
                    }
                    <Text>
                        Right answers: {Math.round((this.props.navigation.state.params.data.correctCount / this.props.navigation.state.params.data.currentQuestion) * 100) }%
                    </Text>
                    <Text
                        onPress={() => {
                            this.props.navigation.navigate('QuizzView', this.props.navigation.state.params)
                        }} > - Next Question - </Text>
                </View>
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