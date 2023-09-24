import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const CharacterGuessScreen = () => {
  const characters = [
    {
      name: "Leonardo da Vinci",
      attributes: {
        artist: true,
        inventions: true,
        nationality: true,
      },
    },
    {
      name: "Isaac Newton",
      attributes: {
        artist: false,
        inventions: true,
        nationality: false,
      },
    },
  ];
  const questions = [
    "Is the character an artist?",
    "Is the character known for inventions?",
    "Is the character of Italian nationality?",
    // Add more questions as needed
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [characterPool, setCharacterPool] = useState([...characters]);
  const [userResponses, setUserResponses] = useState({});
  const [guessedCharacter, setGuessedCharacter] = useState(null);

  const askQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      return (
        <View>
          <Text style={styles.question}>{question}</Text>
          <Button title="Yes" onPress={() => handleResponse(true)} />
          <Button title="No" onPress={() => handleResponse(false)} />
        </View>
      );
    } else {
      makeGuess();
    }
  };

  const handleResponse = (response) => {
    const currentQuestion = questions[currentQuestionIndex];
    const attribute = getAttributeFromQuestion(currentQuestion);

    // Filter the character pool based on the user's response
    const updatedCharacterPool = characterPool.filter(
      (character) => character.attributes[attribute] === response
    );

    setUserResponses({ ...userResponses, [currentQuestion]: response });
    setCharacterPool(updatedCharacterPool);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const makeGuess = () => {
    // After all questions are answered, if there's only one character left in the pool, make that guess
    if (characterPool.length === 1) {
      setGuessedCharacter(characterPool[0]);
    } else {
      // If there are multiple characters left or none, display "I couldn't make a specific guess"
      setGuessedCharacter({
        name: "I couldn't make a specific guess",
      });
    }
  };

  const getAttributeFromQuestion = (question) => {
    // Map the question to the character attribute
    switch (question) {
      case "Is the character an artist?":
        return "artist";
      case "Is the character known for inventions?":
        return "inventions";
      case "Is the character of Italian nationality?":
        return "nationality";
      default:
        return "";
    }
  };

  const styles = {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    question: {
      fontSize: 16,
      marginBottom: 10,
    },
    result: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character Guessing Game</Text>
      {!guessedCharacter ? askQuestion() : null}
      {guessedCharacter !== null ? (
        <View>
          <Text style={styles.result}>I guess: {guessedCharacter.name}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default CharacterGuessScreen;
