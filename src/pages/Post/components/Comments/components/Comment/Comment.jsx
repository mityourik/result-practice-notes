import styled from 'styled-components';
import { Icon } from '../../../../../../components/Header/components/Icon/Icon';

const CommentContainer = ({
    className,
    postId,
    author,
    content,
    publishedAt,
}) => {
    return (
        <div className={className}>
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
            <div className="comment-text">{content}</div>
        </div>
    );
};
export const Comment = styled(CommentContainer)`
    display: flex;
    flex-direction: column;
    padding: 10px;

    & .information-panel {
        display: flex;
        justify-content: space-between;
    }

    & .author {
        display: flex;
        align-items: center;
    }

    & .published-at {
        display: flex;
        align-items: center;
    }
`;
