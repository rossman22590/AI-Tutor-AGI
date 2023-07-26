import axios from 'axios';

export const webSearch = async (query: string) => {
  try {
    if (process.env.SEARP_API_KEY) {
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          api_key: process.env.SEARP_API_KEY,
          engine: 'google',
          q: query,
        },
      });
      return response.data.organic_results;
    } else if (process.env.GOOGLE_SEARCH_API_KEY && process.env.GOOGLE_CUSTOM_INDEX_ID) {
      const response = await axios.get(
        'https://www.googleapis.com/customsearch/v1',
        {
          params: {
            key: process.env.GOOGLE_SEARCH_API_KEY,
            cx: process.env.GOOGLE_CUSTOM_INDEX_ID,
            q: query,
          },
        },
      );
      return response.data.items;
    }
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

type SearchResult = {
  position: number;
  title: string;
  link: string;
  snippet: string;
};

export const simplifySearchResults = (searchResults: any[]): SearchResult[] => {
  if (!Array.isArray(searchResults)) {
    return [];
  }

  const simplifiedResults: SearchResult[] = [];
  searchResults.forEach((item, index) => {
    simplifiedResults.push({
      position: index,
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    });
  });

  return simplifiedResults;
};
