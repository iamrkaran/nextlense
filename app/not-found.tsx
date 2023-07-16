import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <svg
        className="h-16 w-16 text-gray-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Page Not Found</h1>
      <p className="text-gray-500 mb-4">Oops! The page you &apos; re looking for does not exist.</p>
      <Link href="/">
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </span>
      </Link>
    </div>
  );
}
