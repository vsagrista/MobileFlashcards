import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native'
import DeckView from './DeckView'

class DeckList extends React.Component {

	render() {
		return (
			<View style={styles.item}>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('DeckView')
						console.log('clicked')
					}}>
					<Text>Click</Text>
				</TouchableOpacity>
    		</View>
		)
	}
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
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
});


export default DeckList;