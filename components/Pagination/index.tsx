'use client';
import React from 'react';

interface IProperties {
  currentPage: number;
  totalPages: number;
  onClick: (newPage:number) => void;
}

const Pagination = ({ currentPage, totalPages, onClick }:IProperties) => {
  const getPagesToRender = () => {
    let pagesToRender = [];

    let index = -3;

    while (pagesToRender.length < 7) {
      const newPage = currentPage + index;
      if (newPage <= totalPages) {
        if (newPage > 0) {
          pagesToRender.push(newPage);
        }
        index++;
      } else {
        break;
      }
    }

    while (pagesToRender.length < 7 && pagesToRender[0] !== 1) {
      pagesToRender = [pagesToRender[0] - 1, ...pagesToRender];
    }
    return pagesToRender;
  };

  return (
    totalPages > 1 && <section className="flex flex-row border border-black/10 rounded-md overflow-hidden w-fit">
      {getPagesToRender().map((page, index) => {
        const handleOnClick = () => {
          onClick(page);
        };
        return (
          <button
            onClick={handleOnClick}
            className={`rounded-none p-1 aspect-square w-8 text-center ${
              index === 0 ? '' : 'border-l'
            } ${
              page === currentPage ? ' bg-theme-blue text-white' : 'bg-white text-black hover:bg-theme-blue/25'
            } border-black/10`}
            key={page}
          >
            {page}
          </button>
        );
      })}
    </section>
  );
};

export default Pagination;
