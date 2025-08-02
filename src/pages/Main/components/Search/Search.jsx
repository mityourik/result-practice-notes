import styled from 'styled-components';
import { Input } from '../../../../components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
    return (
        <div className={className}>
            <Input
                type="text"
                value={searchPhrase}
                onChange={onChange}
                placeholder="Найти пост..."
            />
            <Icon isButton={true} id="fa-search" size="1em" margin="0" />
        </div>
    );
};

export const Search = styled(SearchContainer)`
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto;
    width: 300px;
    height: 40px;
    margin-bottom: 20px;

    & input {
        width: 100%;
        height: 100%;
        border: 1px solid #000;
        border-radius: 4px;
        padding: 0 40px 0 15px;
        font-size: 14px;
        outline: none;
        margin: 0;

        &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
    }

    & > div {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #666;
        z-index: 1;

        &:hover {
            color: #007bff;
        }
    }
`;
