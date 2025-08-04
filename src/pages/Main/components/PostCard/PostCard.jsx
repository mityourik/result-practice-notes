import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import styled from 'styled-components';
const PostCardContainer = ({
    id,
    imageUrl,
    className,
    title,
    publishedAt,
    commentsCount,
}) => {
    return (
        <div className={className}>
            <Link to={`/post/${id}`} className="post-card-link">
                <img
                    className="post-image"
                    src={imageUrl || undefined}
                    alt={title}
                />
                <div className="post-card-footer">
                    <h3>{title}</h3>
                    <div className="post-card-info">
                        <div className="published-at">
                            <Icon
                                isButton={false}
                                id="fa-calendar-o"
                                size="0.8em"
                                margin="0 5px 0 0"
                            />
                            {publishedAt}
                        </div>
                        <div className="comments-count">
                            <Icon
                                isButton={false}
                                id="fa-comments-o"
                                size="0.98em"
                                margin="0 5px 0 0"
                            />
                            {commentsCount}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const PostCard = styled(PostCardContainer)`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    max-width: 250px;
    border: 1px solid #000;
    border-radius: 3px;

    & .post-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        display: flex;
    }

    & .post-card-link {
        text-decoration: none;
        color: inherit;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        height: 100%;
    }

    & .post-card-footer {
        padding: 10px;
    }

    & .post-card-info {
        display: flex;
        justify-content: space-between;
        font-size: 0.9em;
        color: #666;
        margin-top: 5px;
    }

    & .published-at,
    & .comments-count {
        display: flex;
        align-items: center;
        font-size: 0.8em;
    }

    & h3 {
        margin: 0;
        font-size: 1em;
        line-height: 1.2;
        color: #333;
        min-height: 40px;
    }
`;

PostCard.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
};
