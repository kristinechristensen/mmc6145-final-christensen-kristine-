
export async function search(url) {
  const response = await fetch(url);
  const data = await response.json();
  const docs = data.response.docs ?? [];
  const results = docs.map((doc) => {
    //return relevant parameters from results
    return {
      title: doc?.headline?.main,
      pubdate: doc.pub_date,
      url: doc.web_url,
      uri: doc.uri,
      abstract: doc.snippet,
      source: doc.source,
      image: "https://static01.nyt.com/" + doc?.multimedia[0]?.url,
    };
  });
  return results;
}
