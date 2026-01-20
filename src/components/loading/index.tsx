const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 text-sm tracking-wide">
      </p>
    </div>
  );
};

export default LoadingSpinner;
