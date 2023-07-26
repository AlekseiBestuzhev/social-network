import cls from '@/components/PaginationBlock/PaginationBlock.module.scss';
import { RiArrowRightLine } from 'react-icons/ri';
import { RiArrowLeftLine } from 'react-icons/ri';
import ReactPaginate from "react-paginate";
import { FC, memo } from "react";

type PaginationBlockProps = {
	pageSize: number,
	totalUsersCount: number,
	onPageChange: (newPage: number) => void
};

export const PaginationBlock: FC<PaginationBlockProps> = memo(({ pageSize, totalUsersCount, onPageChange }) => {

	const pageCount = Math.ceil(totalUsersCount / pageSize);

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = event.selected + 1;
		onPageChange(newOffset);
	};

	return (
		<ReactPaginate
			containerClassName={cls.wrapper}
			pageClassName={cls.item}
			activeClassName={cls.active}
			previousLabel={<RiArrowLeftLine />}
			breakLabel="..."
			nextLabel={<RiArrowRightLine />}
			onPageChange={handlePageClick}
			pageCount={pageCount}
			renderOnZeroPageCount={null}
			pageRangeDisplayed={5}
			marginPagesDisplayed={1}
		/>
	);
})