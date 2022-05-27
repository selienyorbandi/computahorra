export const filterSearch = (keywords, items) => {
  const splitKeywords = keywords.split(" ");

  const isInSearch = ({ title }, keywords) => {
    let isInSearch = false;
    keywords.every((keyword) => {
      if (title.toLowerCase().includes(keyword)) {
        isInSearch = true;
        return false;
      }
      return true;
    });
    
    return isInSearch;
  };

  return items.filter((item) => isInSearch(item, splitKeywords));
};
