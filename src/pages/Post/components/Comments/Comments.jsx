import { useState } from 'react';
import styled from 'styled-components';
import { Comment } from './components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';

const CommentsContainer = ({ className, comments }) => {
    const [newComment, setNewComment] = useState('');
    return (
        <div className={className}>
            <div className="new-comment">
                <textarea
                    value={newComment}
                    placeholder="Комментарий..."
                    onChange={({ target: { value } }) => setNewComment(value)}
                ></textarea>
                <Icon
                    size="1em"
                    margin="0 8px 0 8px"
                    id="fa-paper-plane-o"
                    onClick={() => {}}
                ></Icon>
            </div>

            <div className="comments">
                {comments.map(({ id, author, content, publishedAt }) => (
                    <Comment
                        key={id}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export const Comments = styled(CommentsContainer)`
    display: flex;
    width: 580px;
    margin: 20px auto;

    & .new-comment {
        display: flex;
        width: 100%;
    }

    & .new-comment textarea {
        width: 100%;
        height: 120px;
        padding: 10px;
        resize: none;
`;
