import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createPostAsync, savePostAsync } from '../../../../actions';
import { Input } from '../../../../components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import { useServerRequest } from '../../../../hooks';
import { SpecialPanel } from '../SpecialPanel/SpecialPanel';
import { sanitizeContent } from './utils';

const PostFormContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt },
}) => {
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const requestServer = useServerRequest();

    const onSave = () => {
        const newImageUrl = imageRef.current.value;
        const newTitle = titleRef.current.value;
        const newContent = sanitizeContent(contentRef.current.innerHTML);

        const postData = {
            imageUrl: newImageUrl,
            title: newTitle,
            content: newContent,
        };

        if (id) {
            dispatch(
                savePostAsync(requestServer, {
                    id,
                    ...postData,
                })
            ).then(() => navigate(`/post/${id}`));
        } else {
            dispatch(createPostAsync(requestServer, postData)).then(
                (response) => {
                    if (!response.error && response.res) {
                        navigate(`/post/${response.res.id}`);
                    }
                }
            );
        }
    };

    return (
        <div className={className}>
            <Input
                defaultValue={imageUrl}
                placeholder="Изображение url..."
                ref={imageRef}
            />
            <Input
                defaultValue={title}
                placeholder="Заголовок..."
                ref={titleRef}
            />
            <SpecialPanel
                id={id}
                publishedAt={publishedAt || 'Новый пост'}
                isNewPost={!id}
                margin="10px 0 10px 0"
                editButton={
                    <Icon
                        isButton={true}
                        size="1em"
                        id="fa-floppy-o"
                        onClick={onSave}
                    />
                }
            />
            <div
                ref={contentRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="post-text"
            >
                {content}
            </div>
        </div>
    );
};

export const PostForm = styled(PostFormContainer)`
    margin: 35px 0;

    & .post-image {
        float: left;
        margin: 0 27px 0px 0;
    }

    & .post-text {
        min-height: 100px;
        border: 1px solid #000;
        font-size: 0.9em;
        white-space: pre-line;
    }
`;
