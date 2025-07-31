import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';

const SpecialPanelContainer = ({ id, className, publishedAt, editButton }) => {
    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();

    const onPostRemove = () => {
        dispatch(
            openModal({
                text: 'Вы уверены, что хотите удалить этот пост?',

                onConfirm: () =>
                    dispatch(removePostAsync(requestServer, id)).then(() => {
                        navigate(`/`);
                    }),
                onCancel: () => dispatch(CLOSE_MODAL),
            })
        );
    };
    return (
        <div className={className}>
            <div className="published-at">
                <Icon size="0.8em" margin="0 8px 0 0" id="fa-calendar-o"></Icon>
                {publishedAt}
                <div className="buttons">
                    {editButton}
                    <Icon
                        size="1em"
                        margin="0 8px 0 0"
                        id="fa-trash-o"
                        onClick={onPostRemove}
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
