# backend/quiz_data.py

QUIZ_DATABASE = {
    "english_grammar": {
        "title": "English Proficiency & Business Communication",
        "category": "Language & Communication",
        "passing_score": 70,
        "questions": [
            {
                "id": 1,
                "question": "Choose the correct sentence for professional communication:",
                "options": [
                    "I am waiting for your reply since yesterday.",
                    "I have been waiting for your reply since yesterday.",
                    "I waited for your reply from yesterday.",
                    "I am wait reply since yesterday."
                ],
                "correct": 1
            },
            {
                "id": 2,
                "question": "What is the synonym of 'Meticulous' in data reporting?",
                "options": [
                    "Careless",
                    "Thorough & Precise",
                    "Rapid",
                    "Incomplete"
                ],
                "correct": 1
            },
            {
                "id": 3,
                "question": "Which tone is most appropriate for a client email regarding a project delay?",
                "options": [
                    "Blame the infrastructure and ignore the deadline",
                    "Polite, empathetic, providing updated timeline & proactive solution",
                    "Casual with slang words",
                    "Demand extra payment immediately"
                ],
                "correct": 1
            }
        ]
    },
    "python_data": {
        "title": "Python for Data Analysis & Pandas",
        "category": "Technical Skills",
        "passing_score": 70,
        "questions": [
            {
                "id": 1,
                "question": "Which Pandas function is used to load a CSV file into a Dataframe?",
                "options": [
                    "pd.open_csv()",
                    "pd.read_csv()",
                    "pd.import_csv()",
                    "pd.load_csv()"
                ],
                "correct": 1
            },
            {
                "id": 2,
                "question": "Which library is primarily used for numerical matrix operations in Python?",
                "options": [
                    "Flask",
                    "NumPy",
                    "Django",
                    "Seaborn"
                ],
                "correct": 1
            },
            {
                "id": 3,
                "question": "How do you drop missing values (NaNs) from a Pandas DataFrame `df`?",
                "options": [
                    "df.remove_null()",
                    "df.dropna()",
                    "df.clean_nan()",
                    "df.delete_empty()"
                ],
                "correct": 1
            }
        ]
    },
    "sql_database": {
        "title": "SQL Querying & Database Analytics",
        "category": "Technical Skills",
        "passing_score": 70,
        "questions": [
            {
                "id": 1,
                "question": "Which SQL JOIN returns all rows from the left table and matched rows from the right table?",
                "options": [
                    "INNER JOIN",
                    "LEFT JOIN",
                    "RIGHT JOIN",
                    "FULL OUTER JOIN"
                ],
                "correct": 1
            },
            {
                "id": 2,
                "question": "Which clause is used to filter group summary results after an aggregation like GROUP BY?",
                "options": [
                    "WHERE",
                    "HAVING",
                    "FILTER",
                    "ORDER BY"
                ],
                "correct": 1
            }
        ]
    }
}
