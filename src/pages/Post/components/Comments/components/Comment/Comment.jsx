import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
    CLOSE_MODAL,
    openModal,
    removeCommentAsync,
} from '../../../../../../actions';
import { Icon } from '../../../../../../components/Header/components/Icon/Icon';
import { ROLE } from '../../../../../../constants';
import { useServerRequest } from '../../../../../../hooks';
import { selectUserRole } from '../../../../../../selectors';

const CommentContainer = ({
    className,
    id,
    postId,
    author,
    content,
    publishedAt,
}) => {
    const dispatch = useDispatch();
    const userRole = useSelector(selectUserRole);
    const requestServer = useServerRequest();

    const onCommentRemove = () => {
        dispatch(
            openModal({
                text: 'Вы уверены, что хотите удалить этот комментарий?',
                onConfirm: () =>
                    dispatch(removeCommentAsync(requestServer, postId, id)),
                onCancel: () => dispatch(CLOSE_MODAL),
            })
        );
    };

    const canDelete = userRole === ROLE.ADMIN || userRole === ROLE.MODERATOR;

    return (
        <div className={className}>
            <div className="comment-column">
                <div className="comment">
                    <div className="information-panel">
                        <div className="author">
                            <Icon
                                size="1em"
                                margin="0 8px 0 0"
                                id="fa-user-circle-o"
                                onClick={() => {}}
                            ></Icon>
                            {author}
                        </div>
                        <div className="published-at">
                            <Icon
                                size="1em"
                                margin="0 8px 0 0"
                                id="fa-calendar-o"
                                onClick={() => {}}
                            ></Icon>
                            Дата публикации: {publishedAt}
                        </div>
                    </div>
                </div>

                <div className="comment-text">{content}</div>
            </div>

            {canDelete && (
                <div className="button-delete-column">
                    <Icon
                        size="1em"
                        margin="0 0 0 8px"
                        id="fa-trash-o"
                        onClick={onCommentRemove}
                        title="Удалить комментарий"
                    ></Icon>
                </div>
            )}
        </div>
    );
};
export const Comment = styled(CommentContainer)`
    display: flex;
    flex-direction: row;

    & .comment-column {
        display: flex;
        flex-direction: column;
        width: 526px;
        border: 1px solid #000;
        padding: 10px;
        font-size: 11px;
    }

    & .comment {
        display: flex;
        align-items: center;
    }

    & .information-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    & .author {
        display: flex;
        align-items: center;
    }

    & .published-at {
        display: flex;
        align-items: center;
    }

    & .comment-text {
        margin-top: 8px;
        line-height: 1.5;
    }
`;
