# backend/quiz_bank.py

ALL_SUBJECT_QUIZZES = {
    "mathematics_stats": {
        "title": "Mathematics, Linear Algebra & Statistics",
        "category": "Core Mathematics",
        "passing_score": 70,
        "questions": [
            {
                "id": 1,
                "question": "What is the derivative of f(x) = x^3 + 2x?",
                "options": ["3x^2 + 2", "x^2 + 2", "3x + 2", "3x^2"],
                "correct": 0,
                "topic": "Calculus"
            },
            {
                "id": 2,
                "question": "In Probability, what does a p-value less than 0.05 signify?",
                "options": [
                    "Accept the null hypothesis",
                    "Statistically significant result to reject null hypothesis",
                    "The data is invalid",
                    "No correlation exists"
                ],
                "correct": 1,
                "topic": "Statistics"
            },
            {
                "id": 3,
                "question": "What is the determinant of a 2x2 Identity Matrix [[1,0],[0,1]]?",
                "options": ["0", "1", "2", "-1"],
                "correct": 1,
                "topic": "Linear Algebra"
            }
        ]
    },
    "english_proficiency": {
        "title": "English Grammar & Professional Communication",
        "category": "Languages",
        "passing_score": 70,
        "questions": [
            {
                "id": 1,
                "question": "Choose the correct sentence:",
                "options": [
                    "Neither of the reports are complete.",
                    "Neither of the reports is complete.",
                    "Neither of reports were complete.",
                    "Neither report are completed."
                ],
                "correct": 1,
                "topic": "Grammar"
            },
            {
                "id": 2,
                "question": "What is the synonym of 'Meticulous' in professional reporting?",
                "options": ["Careless", "Thorough & Precise", "Rapid", "Incomplete"],
                "correct": 1,
                "topic": "Vocabulary"
            },
            {
                "id": 3,
                "question": "Which tone is most appropriate for a formal business proposal?",
                "options": ["Casual and sarcastic", "Professional, clear, and objective", "Overly aggressive", "Informal"],
                "correct": 1,
                "topic": "Business Communication"
            }
        ]
    },
    "data_science_python": {
        "title": "Data Science & Machine Learning",
        "category": "Computer Science",
        "passing_score": 70,
        "questions": [
            {
                "id": 1,
                "question": "Which evaluation metric is best suited for imbalanced classification tasks?",
                "options": ["Accuracy", "F1-Score / ROC-AUC", "Mean Squared Error", "R-Squared"],
                "correct": 1,
                "topic": "Machine Learning"
            },
            {
                "id": 2,
                "question": "Which Pandas function is used to load a CSV file into a DataFrame?",
                "options": ["pd.open_csv()", "pd.read_csv()", "pd.import_csv()", "pd.load_csv()"],
                "correct": 1,
                "topic": "Python & Data Science"
            },
            {
                "id": 3,
                "question": "Which SQL JOIN returns all matching records from both tables?",
                "options": ["LEFT JOIN", "INNER JOIN", "CROSS JOIN", "RIGHT JOIN"],
                "correct": 1,
                "topic": "SQL & Databases"
            }
        ]
    }
}
