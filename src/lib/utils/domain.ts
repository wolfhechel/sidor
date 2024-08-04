export default (url: string): string | null => {
    let domain = null;

    try {
        domain = new URL(url).hostname;
    } catch (e) {
        console.error(e);
    }

    return domain;
}