const InterviewPage = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900">
      
      {/* Optional Header (keeps it native) */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Interview
        </h1>
      </div>

      {/* Embedded Project */}
      <div className="w-full h-full px-6 pb-6">
        <div className="w-full h-full overflow-hidden bg-white rounded-xl shadow-lg dark:bg-gray-800">
          <iframe
            src="https://ai-mock-interview-fawn-five.vercel.app/"
            className="w-full h-full border-none"
            allow="microphone; camera"
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;