import { yf2Calls } from '../services/yf2';

const fetchAndCompareEBITDA = async (
    mainTicker: string,
    comparable1: string,
    comparable2: string,
    comparable3: string
  ): Promise<void> => {
    try {
      const tickers = [mainTicker, comparable1, comparable2, comparable3];
  
      // Fetch both EBITDA and market cap for each ticker
      const results = await Promise.all(
        tickers.map(async (ticker) => {
          try {
            const ebitda = await yf2Calls.companyEBITDA(ticker);
            const marketCap = await yf2Calls.companyMarketCap(ticker);
            if (!ebitda || !marketCap) {
              throw new Error(`EBITDA or Market Cap not available for ${ticker}`);
            }
            const ratio = ebitda / marketCap;
            return { ticker, ebitda, marketCap, ratio };
          } catch (error) {
            console.error(`Error fetching data for ${ticker}:`, error);
            return { ticker, ebitda: null, marketCap: null, ratio: null };
          }
        })
      );
  
      // Filter out invalid results
      const validResults = results.filter(({ ebitda, marketCap }) => ebitda !== null && marketCap !== null);
  
      // Display the results
      console.log('EBITDA-to-Market Cap Ratios:');
      validResults.forEach(({ ticker, ebitda, marketCap, ratio }) => {
        console.log(`- ${ticker}: EBITDA = ${ebitda}, Market Cap = ${marketCap}`);
      });
  
      // Compare the mainTicker's ratio to others
      const mainResult = validResults.find((result) => result.ticker === mainTicker);
      if (!mainResult) {
        console.log(`Main ticker ${mainTicker} has no valid data.`);
        return;
      }
  
      console.log(`\nComparison with ${mainTicker}:`);
      validResults.forEach(({ ticker, ratio }) => {
        if (ticker !== mainTicker) {
          const comparison = ratio! > mainResult.ratio! ? 'greater' : 'less than';
          const signal = ratio! > mainResult.ratio! ? `${mainTicker} is overvalued` : `${mainTicker} is undervalued`;
          const relativeRatio = ratio! / mainResult.ratio!;
          console.log(`- ${ticker} has a ratio ${comparison} than ${mainTicker}. The relative ratio is ${relativeRatio.toFixed(2)}x which indicates ${signal}`);
        }
      });
    } catch (error) {
      console.error('Error comparing EBITDA values:', error);
    }
  };

export default fetchAndCompareEBITDA;