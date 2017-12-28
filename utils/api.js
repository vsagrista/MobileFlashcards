
import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'udaciCards';

const quizzData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks() {
	return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    //console.log()
   // let r =
    //console.log('results: ', r)
		return results === null ? storeData() : JSON.parse(results);
	})
}

export function storeData() {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(quizzData))
	return quizzData;
}

