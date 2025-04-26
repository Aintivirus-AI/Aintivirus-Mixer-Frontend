export const getFormattedDatetime = () => {
    const now = new Date();

    const formatted = now.getFullYear().toString()
        + '-' + String(now.getMonth() + 1).padStart(2, '0')
        + '-' + String(now.getDate()).padStart(2, '0')
        + '-' + String(now.getHours()).padStart(2, '0')
        + '-' + String(now.getMinutes()).padStart(2, '0');

    return formatted;
}