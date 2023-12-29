const getMetaData = require("metadata-scraper");

function getMetaTags(url) {
  async function run() {
    const data = await getMetaData(url);
    return data;
  }
}
export default getMetaTags;
