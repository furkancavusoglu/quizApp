"use client"
import React from 'react'
import axios from "axios"

const useFetchData = (refetchDependency) => {
    const [questions, setQuestions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get("https://the-trivia-api.com/v2/questions");
                setQuestions(formatData(response.data));
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [refetchDependency])

    return { questions, loading, error};
}
const formatData = (data) => {
    return [
        ...data.map((question) => {
            const answers = [...question.incorrectAnswers, question.correctAnswer];
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
            return {
                id: question.id,
                question: question.question.text,
                answers: shuffledAnswers,
                correctAnswer: question.correctAnswer,
            }
        }
        )
    ]
}


export default useFetchData