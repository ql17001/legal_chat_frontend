import React, { useState } from 'react';

interface LoadingProps {
  isOpen: boolean;
}

function Loading({ isOpen }: LoadingProps) {

  const [LoadingOpen, setLoadingOpen] = useState(false);

  React.useEffect(() => {
    setLoadingOpen(isOpen);
  }, [isOpen]);

  return (
    LoadingOpen && (
      <div className="loading ">
        <div className="loading-content px-[125px] py-7">
          <div>
            <div className="animate-spin inline-block w-10 h-10 border-[3px]  border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
            <h1 className='font-bold'>CARGANDO...</h1>
          </div>
        </div>
      </div>
    )
  );
}

export default Loading;