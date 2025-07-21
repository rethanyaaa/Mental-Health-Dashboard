 import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookAppointmentCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#f5f3ff' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#7c3aed]">
          Ready to Prioritize Your <span className="text-[#fef08a]">Mental Wellness?</span>
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Connect with licensed professionals who specialize in mental health care.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/doctors')}
            className="px-8 py-3 bg-[#7c3aed] text-white rounded-full font-medium hover:bg-[#6d28d9] transition-colors shadow-lg"
          >
            Browse Doctors
          </button>
          <button
            onClick={() => navigate('/assessments')}
            className="px-8 py-3 bg-[#fef08a] text-[#7c3aed] rounded-full font-medium hover:bg-[#fde68a] transition-colors shadow-lg"
          >
            Take Assessment
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentCTA;