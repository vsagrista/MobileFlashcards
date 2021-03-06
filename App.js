import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import DeckView from './components/DeckView';
import QuizzView from './components/QuizzView';
import ResultsView from './components/ResultsView';
import NewQuestion from './components/NewQuestion';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { setLocalNotification } from './utils/helperFunctions';

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'DeckList',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-photos-outline" size={40} color={tintColor} />
        ),
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add-circle-outline" size={40} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: 'black',
      style: {
        height: 55,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  },
)



const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      header: null
    }
  },
  QuizzView: {
    screen: QuizzView,
    navigationOptions: {
      tabBarLabel: 'Quizz View',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-add-circle-outline" size={40} color='tintColor' />
      ),
    },
  },
  ResultsView: {
    screen: ResultsView,
    navigationOptions: {
      header: null
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      tabBarLabel: 'New Question',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-add-circle-outline" size={40} color={tintColor} />
      )
    }
  },

})



export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
