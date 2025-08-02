import styled from 'styled-components';

const PostCardContainer = ({
    className,
    title,
    publishedAt,
    commentsCount,
}) => {
    return (
        <div className={className}>
            <h2>{title}</h2>
            <p>Published at: {publishedAt}</p>
            <p>Comments: {commentsCount}</p>
        </div>
    );
};

export const PostCard = styled(PostCardContainer)``;
