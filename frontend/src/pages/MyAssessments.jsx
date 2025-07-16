import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import AssessmentDetailedResults from "../components/AssessmentDetailedResults";
 

const MyAssessments = () => {
  const { userData, backendUrl, token } = useContext(AppContext);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [detailedResults, setDetailedResults] = useState(null);
   
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) return;

    const fetchUserAssessments = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${backendUrl}/api/assessments/user/${userData._id}`,
          { headers: { token } }
        );
        setAssessments(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load your assessments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserAssessments();
  }, [userData, backendUrl, token]);

  const viewDetailedResults = async (assessmentId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/assessments/results/${assessmentId}`,
        { headers: { token } }
      );
      setDetailedResults(data);
      setSelectedAssessment(assessmentId);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load detailed results"
      );
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Assessment History
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your assessment history.
          </p>
          <Link
            to="/login"
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading your assessments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Your Assessment History
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              View all assessments you've completed
            </p>
          </div>
          <div className="flex space-x-3">
            {/* <button
              onClick={() => setShowProgress(!showProgress)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              {showProgress ? "Hide Progress" : "View Progress"}
            </button> */}
            <Link
              to="/assessments"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Take New Assessment
            </Link>
          </div>
        </div>

      

        {detailedResults ? (
          <AssessmentDetailedResults resultData={detailedResults} />
        ) : assessments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No assessments completed
            </h3>
            <p className="mt-1 text-sm text-gray-500 mb-6">
              Get started by taking your first assessment.
            </p>
            <Link
              to="/assessments"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Take an Assessment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div
                key={assessment._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-gray-900 truncate">
                        {assessment.assessmentId?.title || "Assessment"}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Completed on{" "}
                        {new Date(assessment.completedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <span
                        className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                          assessment.result === "Low Risk"
                            ? "bg-green-100 text-green-800"
                            : assessment.result === "Moderate Risk"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {assessment.result}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Score</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {assessment.totalScore}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-800">
                        Assessment
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {assessment.assessmentId?.title || "N/A"}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <button
                        onClick={() => viewDetailedResults(assessment._id)}
                        className="w-full text-left"
                      >
                        <p className="text-sm font-medium text-green-800">
                          Details
                        </p>
                        <p className="text-lg font-semibold text-green-600 hover:underline">
                          View Detailed Results
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssessments;
