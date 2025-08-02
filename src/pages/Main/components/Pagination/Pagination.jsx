import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, setPage, page, lastPage }) => {
    return (
        <div className={className}>
            <Button
                disabled={page === 1}
                className="pagination-button"
                onClick={() => setPage(1)}
            >
                Первая
            </Button>
            <Button
                disabled={page === 1}
                className="pagination-button"
                onClick={() => setPage(page - 1)}
            >
                Предыдущая
            </Button>
            <span className="current-page">Страница: {page}</span>
            <Button
                disabled={page === lastPage}
                className="pagination-button"
                onClick={() => setPage(page + 1)}
            >
                Следующая
            </Button>
            <Button
                disabled={page === lastPage}
                className="pagination-button"
                onClick={() => setPage(lastPage)}
            >
                Последняя
            </Button>
        </div>
    );
};

export const Pagination = styled(PaginationContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    padding: 0 35px;

    & .current-page,
    & .pagination-button {
        width: 120px;
        height: 32px;
        text-align: center;
        border: 1px solid #000;
        font-size: 13px;
        font-weight: 500;
        margin: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .current-page {
        background-color: #f0f0f0;
        color: #333;
        border-radius: 3px;
        box-sizing: border-box;
    }

    & .pagination-button {
        cursor: pointer;
        background-color: #fff;
        transition: background-color 0.2s;

        &:hover {
            background-color: #e9e9e9;
        }
    }
`;
