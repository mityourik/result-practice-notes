export const getLastPageFromLinks = (links) => {
    if (!links) return 1;

    const resultWithLimit = links.match(
        /_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/
    );
    const resultWithPerPage = links.match(
        /_page=(\d{1,4})&_per_page=\d{1,3}>; rel="last"/
    );

    const result = resultWithLimit || resultWithPerPage;
    return result ? Number(result[1]) : 1;
};
