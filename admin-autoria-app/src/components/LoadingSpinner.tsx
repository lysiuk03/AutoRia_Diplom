const LoadingSpinner = () => {
  return (
    <div className="h-[calc(100vh-150px)] flex justify-center items-center">
      <ul className="flex">
        <li className="h-5 w-5 rounded-full bg-sky-900 m-1 animate-bounce" style={{ animationDelay: "0.2s" }}></li>
        <li className="h-5 w-5 rounded-full bg-blue-800 m-1 animate-bounce" style={{ animationDelay: "0.8s" }}></li>
        <li className="h-5 w-5 rounded-full bg-sky-300 m-1 animate-bounce" style={{ animationDelay: "0.1s" }}></li>
        <li className="h-5 w-5 rounded-full bg-blue-800 m-1 animate-bounce" style={{ animationDelay: "0.8s" }}></li>
        <li className="h-5 w-5 rounded-full bg-sky-900 m-1 animate-bounce" style={{ animationDelay: "0.2s" }}></li>
      </ul>
    </div>
  );
};

export default LoadingSpinner;
