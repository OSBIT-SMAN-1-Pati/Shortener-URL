const getMetaData = require("metadata-scraper");

async function getMetaTags(url) {
    const data = await getMetaData(url);
    return data;
}
export default getMetaTags;
