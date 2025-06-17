import i18next from "i18next";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type TFootProps = {
  page: number;
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export default function TFoot({ page, lastPage, onPageChange }: TFootProps) {
  const [activeIndex, setActiveIndex] = useState(page - 1);
  const maxVisiblePages = 5;

  useEffect(() => {
    setActiveIndex(page - 1);
  }, [page]);

  const handleClick = (newPage: number) => {
    setActiveIndex(newPage - 1);
    onPageChange(newPage);
  };

  const handleNext = () => {
    if (activeIndex + 1 < lastPage) {
      handleClick(activeIndex + 2);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      handleClick(activeIndex);
    }
  };

  const getVisiblePages = () => {
    const start = Math.max(
      1,
      Math.min(
        page - Math.floor(maxVisiblePages / 2),
        lastPage - maxVisiblePages + 1
      )
    );
    const end = Math.min(lastPage, start + maxVisiblePages - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const [currentLang, setCurrentLang] = useState(i18next.language);

  useEffect(() => {
    const handleLanguageChange = (lang: string) => {
      setCurrentLang(lang);
    };
    i18next.on("languageChanged", handleLanguageChange);
    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <div
      className={`${
        getVisiblePages().length <= 1 ? "hidden" : "flex"
      } items-center gap-3 absolute top-[104%] left-1/2 -translate-x-1/2`}
    >
      <span
        onClick={handlePrevious}
        className={`h-[50px] w-[50px] flex items-center justify-center rounded-full bg-[#EBEBEB] dark:bg-inherit dark:border border-shadow_blue cursor-pointer
          ${currentLang === "ar" && "rotate-180"}`}
      >
        <FaAngleLeft />
      </span>
      {getVisiblePages().map((pageNum) => (
        <span
          key={pageNum}
          onClick={() => handleClick(pageNum)}
          className={`h-[50px] w-[50px] flex items-center justify-center rounded-full cursor-pointer ${
            activeIndex === pageNum - 1
              ? "bg-[#42E8B9] text-white"
              : "bg-[#EBEBEB] dark:bg-inherit dark:border border-shadow_blue"
          } ${activeIndex !== pageNum - 1 && "hidden md:flex"} `}
        >
          {pageNum}
        </span>
      ))}
      <span
        onClick={handleNext}
        className={`h-[50px] w-[50px] flex items-center justify-center rounded-full bg-[#EBEBEB] dark:bg-inherit dark:border border-shadow_blue cursor-pointer
          ${currentLang === "ar" && "rotate-180"}`}
      >
        <FaAngleRight />
      </span>
    </div>
  );
}

----------------------
roles :
const [page, setPage] = useState<number>(1);
you should pass this state and setState
you should pass the last page from api

----------------------
how to use ??? 
    <TFoot
                page={page}
                onPageChange={setPage}
                lastPage={meta?.last_page}
              />
----------------------