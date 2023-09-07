import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { styled } from "styled-components";
import { createPageArr } from "../../utils/createPageArr";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}
export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  setPage,
}: PaginationProps) {
  const [pageArr, setPageArr] = useState([1]);
  useEffect(() => {
    setPageArr(createPageArr(totalItems, itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const onClickSetPage = (page: number) => {
    setPage(page);
  };

  return (
    <StContainer>
      {pageArr.map((item) => {
        return (
          <StPageNumber
            key={item}
            onClick={() => onClickSetPage(item)}
            $isCurrentPage={item === currentPage}
          >
            {item}
          </StPageNumber>
        );
      })}
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const StPageNumber = styled.div<{ $isCurrentPage: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  cursor: pointer;
  ${(props) => props.$isCurrentPage && "border-radius:50%"};
  ${(props) => props.$isCurrentPage && "background-color:black"};
  ${(props) => props.$isCurrentPage && "color:white"};
`;
