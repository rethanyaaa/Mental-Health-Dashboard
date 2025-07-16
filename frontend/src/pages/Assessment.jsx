 import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Assessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, token, userData } = useContext(AppContext);
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/assessments/${id}`);
        setAssessment(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load assessment');
        navigate('/assessments');
      }
    };

    fetchAssessment();
  }, [id, backendUrl, navigate]);

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: assessment.questions[currentQuestion]._id,
      selectedOption: value
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== assessment.questions.length) {
      toast.warning('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/assessments/submit`,
        {
          userId: userData?._id,
          assessmentId: assessment._id,
          answers
        },
        { headers: { token } }
      );

      setResult(data);
      setCompleted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit assessment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (completed && result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <h1 className="text-3xl font-bold">Assessment Completed</h1>
              <p className="mt-2 opacity-90">{assessment.title}</p>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">Your Score</h3>
                  <p className="text-4xl font-bold text-blue-600">{result.totalScore}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                  <h3 className="text-sm font-medium text-green-800 mb-1">Result</h3>
                  <p className="text-xl font-semibold text-green-600">{result.result}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => navigate('/assessments')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex-1 flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Assessments</span>
                </button>
                <button
                  onClick={() => navigate('/my-assessments')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>View All Results</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = assessment.questions[currentQuestion];
  const currentAnswer = answers[currentQuestion]?.selectedOption;
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-700">{assessment.title}</h2>
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question Card */}
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-medium text-gray-800 mb-6">{question.text}</h3>
            
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${currentAnswer === option.value 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${currentAnswer === option.value 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'}`}>
                      {currentAnswer === option.value && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between space-x-4">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className={`flex items-center justify-center px-6 py-3 rounded-lg transition-colors ${currentQuestion === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              {currentQuestion < assessment.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                  className={`flex-1 px-6 py-3 rounded-lg transition-colors flex items-center justify-center ${!answers[currentQuestion] 
                    ? 'bg-blue-300 text-white cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !answers[currentQuestion]}
                  className={`flex-1 px-6 py-3 rounded-lg transition-colors ${submitting || !answers[currentQuestion] 
                    ? 'bg-blue-300 text-white cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Assessment'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;