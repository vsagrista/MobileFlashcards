
import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'udaciCards';

const quizzData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'React is a library for managing user interfaces',
        answer: 'A library for managing user interfaces',
        correct: true
      },
      {
        question: 'In React, Ajax requests are contained in the componentDidMount lifecycle event',
        answer: 'Ajax requests are indeed contained in the componentDidMount lifecycle event',
        correct: true
      },
      {
        question: 'React is a programming language',
        answer: 'React is a Javascript library',
        correct: false
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'A closure is the combination of a function and the lexical environment within which that function was declared.',
        answer: 'A closure is the combination of a function and the lexical environment within which that function was declared.',
        correct: true
      }
    ]
  }
}

export function getDecks() {
	return AsyncStorage.getItem(STORAGE_KEY).then(results => {
		return results === null ? storeData() : JSON.parse(results);
	})
}

export function storeData() {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(quizzData))
	return quizzData;
}

