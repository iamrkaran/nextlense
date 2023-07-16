import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex bg-white flex-col items-center justify-center h-screen">
      <svg
        className="animate-spin h-16 w-16 text-gray-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
        ></path>
      </svg>
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Unauthorized Access</h1>
      <p className="text-gray-500 mb-4">You are not authorized to access this page.</p>
      <Link href="/">
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </span>
      </Link> 
    </div>
  );
}
