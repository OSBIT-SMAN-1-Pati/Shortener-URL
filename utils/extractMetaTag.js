const getMetaData = require("metadata-scraper");

async function getMetaTags(url) {
  try {
    const data = await getMetaData(url);
    return data;
  } catch (error) {
    console.error("Error while fetching metadata:", error.message);
    return { error: "Failed to fetch metadata" };
  }
}
export default getMetaTags;
