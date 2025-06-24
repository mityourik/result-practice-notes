import { useEffect, useState } from 'react';
import { getLastGithubCommit } from '../services/github-service';

export const useGithubLastCommit = (username) => {
    const [commit, setCommit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!username) return;
        setIsLoading(true);
        getLastGithubCommit(username).then((data) => {
            setCommit(data);
            setIsLoading(false);
        });
    }, [username]);

    return { commit, isLoading };
};
