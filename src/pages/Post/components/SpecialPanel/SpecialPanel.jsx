import styled from 'styled-components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
    return (
        <div className={className}>
            <div className="published-at">
                <Icon
                    size="0.8em"
                    margin="0 8px 0 0"
                    id="fa-calendar-o"
                    onClick={() => {}}
                ></Icon>
                {publishedAt}
                <div className="buttons">
                    {editButton}
                    <Icon
                        size="1em"
                        margin="0 8px 0 0"
                        id="fa-trash-o"
                        onClick={() => {}}
                    ></Icon>
                </div>
            </div>
        </div>
    );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
    color: #999;
    font-size: 0.9em;
    margin: ${({ margin }) => margin || '10px 0 10px 0'};

    & .published-at {
        display: flex;
        align-items: center;
    }

    & .buttons {
        display: flex;
        margin-left: auto;
    }
`;
