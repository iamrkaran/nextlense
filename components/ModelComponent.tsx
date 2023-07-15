import React from 'react';
import AddComment from './AddComment';

type ModelComponentProps = {
  children: React.ReactNode;
  onClose: () => void;
  postId?: string;
  session?: any;
  refresh?: () => void;
};

const ModelComponent: React.FC<ModelComponentProps> = ({
  children,
  onClose,
  postId,
  session,
  refresh,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md overflow-y-auto max-h-80 scrollbar-hidden">
    <style jsx>
          {`
            .scrollbar-hidden::-webkit-scrollbar {
              width: 0;
              height: 0;
              background-color: transparent;
            }
          `}
        </style>
      {children}
      {postId && session && refresh && (
        <AddComment postId={postId} session={session} refresh={refresh} />
      )}
      <button
        className="block w-full px-4 py-2 mt-4 text-center text-white bg-blue-500 hover:bg-blue-600 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
  );
};

export default ModelComponent;
