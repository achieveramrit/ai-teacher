from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def grade_essay(essay, rubric):
    """Simple essay grading using cosine similarity"""
    vectorizer = TfidfVectorizer(stop_words='english')
   
    # Compare with model answers
    vectors = vectorizer.fit_transform([rubric['model_answer'], essay])
    similarity = cosine_similarity(vectors[0], vectors[1])[0][0]
   
    # Scale to grade (0-100)
    grade = min(100, max(50, int(similarity * 85 + 15)))  # Adjusted curve
   
    # Generate feedback
    feedback = "Good work! " if grade > 75 else "Keep practicing. "
    feedback += rubric['feedback_comments'][0 if grade > 75 else 1]
   
    return {
        'grade': grade,
        'feedback': feedback,
        'similarity_score': float(similarity)
    }