const getMetaData = require("metadata-scrapper");

function getMetaTags(url) {
  async function run() {
    const data = await getMetaData(url);
    return data;
  }
}
export default getMetaTags;
