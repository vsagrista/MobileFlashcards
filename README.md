# Mobile Flashcards

Welcome to Mobile Flashcards! This is an application with the goal of learning how to create mobile apps using React Native's API. It's built for IOS using the create-react-native-app toolset.
<br>
You can create quizzes (decks), with custom questions, view the percentage of right answers and so on. It is a great tool for students who want to test themselves :)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

```
Git installed
Node, Yarn, Expo and Xcode installed
```

### Installing

Open the console and follow these steps:

Git clone the repo & cd to file

```
git clone https://github.com/vsagrista/MobileFlashcards.git
cd MobileFlashcards
```
open the Expo app where the project is located
yarn install 
```

Wait for yarn to download the node libraries
Then again on the console:

```
yarn start
```

This last command will promp you with several options. Simply type "i" and the app will open on the IOS simulator. You can alternatively take a picture of the QR code from your phone (requires to download Expo mobile). If you're using android on your phone some views might not display correctly, as the app if built for IOS. Enjoy!!  

## Built With

* React Native - React for native apps
* Using create-react-native-app - React app boilerplate tool 
* Asyncstorage - Native API to manage localstorage in an asynchronous manner
* Expo - App that lets you build IOS and Android apps with Javascript
* Xcode - Required to run the IOS simulator
* Node libraries & Yarn - Several node libraries managed by the yarn package manager