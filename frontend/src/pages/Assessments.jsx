import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Assessments = () => {
  const { userData, backendUrl, token } = useContext(AppContext);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/assessments`);
        setAssessments(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load assessments');
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [backendUrl]);

  if (loading) {
    return <div className="text-center py-8">Loading assessments...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mental Health Assessments</h1>
      <p className="text-gray-600 mb-8">
        Take one of our self-assessment quizzes to evaluate your mental health status and get personalized recommendations.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {assessments.map((assessment) => (
          <div key={assessment._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{assessment.title}</h2>
              <p className="text-gray-600 mb-4">{assessment.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {assessment.questions.length} questions
                </span>
                <Link
                  to={`/assessment/${assessment._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Assessment
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userData && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Assessment History</h2>
          <Link
            to="/my-assessments"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View your past assessment results →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Assessments;