import stopword from 'stopword';

export const tokenizeText = (text) => {
  if (!text) return [];
  const tokens = text.toLowerCase().split(/\W+/).filter(t => t.length > 2);
  return stopword.removeStopwords(tokens);
};

export const calculateSimilarity = (keywords1, keywords2) => {
  if (keywords1.length === 0 || keywords2.length === 0) return 0;
  
  const set1 = new Set(keywords1);
  const set2 = new Set(keywords2);
  
  let matches = 0;
  for (const keyword of set1) {
    if (set2.has(keyword)) matches++;
  }
  
  return (matches / set1.size) * 100;
};