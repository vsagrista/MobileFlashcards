import React from 'react';
import { StyleSheet, Text, View, Platform  } from 'react-native';
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

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
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue',
      }
    }
  }
})



export default class App extends React.Component {
  render() {
    return (
        <View style={{flex: 1}}>
           <MainNavigator />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
