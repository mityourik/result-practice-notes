import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import { useServerRequest } from '../../../../hooks';

const SpecialPanelContainer = ({
    id,
    className,
    publishedAt,
    editButton,
    isNewPost,
}) => {
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
                {publishedAt && !isNewPost && (
                    <Icon size="0.8em" margin="0 8px 0 0" id="fa-calendar-o" />
                )}
                {publishedAt}
                <div className="buttons">
                    {editButton}
                    {publishedAt && !isNewPost && (
                        <Icon
                            isButton={true}
                            size="1em"
                            margin="0 8px 0 0"
                            id="fa-trash-o"
                            onClick={onPostRemove}
                        />
                    )}
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
