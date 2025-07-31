import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePostAsync } from '../../../../actions';
import styled from 'styled-components';
import { Input } from '../../../../components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import { SpecialPanel } from '../SpecialPanel/SpecialPanel';
import { sanitizeContent } from './utils';
import { useServerRequest } from '../../../../hooks';

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

        dispatch(
            savePostAsync(requestServer, {
                id,
                imageUrl: newImageUrl,
                title: newTitle,
                content: newContent,
            })
        ).then(() => navigate(`/post/${id}`));
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
                publishedAt={publishedAt}
                margin="10px 0 10px 0"
                editButton={
                    <Icon
                        size="1em"
                        margin="0 8px 0 0"
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
        font-size: 0.9em;
        white-space: pre-line;
    }
`;
