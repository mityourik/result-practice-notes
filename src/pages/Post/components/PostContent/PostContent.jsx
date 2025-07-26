import styled from 'styled-components';
import { H2 } from '../../../../components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';

const PostContentContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt },
}) => {
    return (
        <div className={className}>
            <img
                className="post-image"
                src={imageUrl || undefined}
                alt={title}
            />
            <H2>{title}</H2>
            <div className="special-panel">
                <div className="published-at">
                    <Icon
                        size="1em"
                        margin="0 8px 0 0"
                        id="fa-floppy-o"
                        onClick={() => {}}
                    ></Icon>
                    {publishedAt}
                    <div className="buttons">
                        <Icon
                            size="1em"
                            margin="0 8px 0 0"
                            id="fa-pencil-square-o"
                            onClick={() => {}}
                        ></Icon>
                        <Icon
                            size="1em"
                            margin="0 8px 0 0"
                            id="fa-trash-o"
                            onClick={() => {}}
                        ></Icon>
                    </div>
                </div>
            </div>
            <div className="post-text">{content}</div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    & .post-image {
        float: left;
        margin: 0 27px 0px 0;
    }

    & .special-panel {
        color: #999;
        font-size: 0.9em;
        margin-bottom: 10px;
    }

    & .published-at {
        display: flex;
        align-items: center;
    }

    & .buttons {
        display: flex;
        margin-left: auto;
    }
`;
