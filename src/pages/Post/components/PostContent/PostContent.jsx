import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { H2 } from '../../../../components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import { SpecialPanel } from '../SpecialPanel/SpecialPanel';

const PostContentContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt },
}) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <img
                className="post-image"
                src={imageUrl || undefined}
                alt={title}
            />
            <H2>{title}</H2>
            <SpecialPanel
                id={id}
                publishedAt={publishedAt}
                isNewPost={false}
                margin="10px 0 10px 0"
                editButton={
                    <Icon
                        isButton={true}
                        size="1em"
                        margin="0 8.1px 0 0"
                        id="fa-pencil-square-o"
                        onClick={() => navigate(`/post/${id}/edit`)}
                    />
                }
            />
            <div className="post-text">{content}</div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    & .post-image {
        float: left;
        margin: 0 27px 0px 0;
    }

    & .post-text {
        font-size: 0.9em;
    }
`;
