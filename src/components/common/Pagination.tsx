import { Pagination } from "flowbite-react";
import React from "react";

interface Props {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const PaginationBar: React.FC<Props> = ({
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    return (
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={function (page: number): void {
                setCurrentPage(page);
            }}
        />
    );
};

export default PaginationBar;
