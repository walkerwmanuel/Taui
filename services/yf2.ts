import yahooFinance from 'yahoo-finance2'; // Modern import syntax
yahooFinance.suppressNotices(['yahooSurvey'])

export const yf2Calls = {
  test2: async function (): Promise<void> {
    try {
      const results = await yahooFinance.search('AAPL');
      console.log(results);

      // Exit the process when the function completes
      process.exit(0); // Use 0 to indicate successful completion
    } catch (error) {
      console.error('Error in yf2Logic.test2:', error);

      // Exit the process with a failure code
      process.exit(1); // Use 1 to indicate an error occurred
    }
  },

  expectedPrice: async function (symbol: string, projectedEarnings: number): Promise<number> {
    try {
      // Fetch the stock's summary data (this is hypothetical; replace with actual API data if needed)
      const quoteSummary = await yahooFinance.quoteSummary(symbol, { modules: ['summaryDetail'] });

      // Extract P/E ratio
      const peRatio = quoteSummary?.summaryDetail?.trailingPE;

      if (!peRatio) {
        throw new Error('P/E ratio not available for the given stock symbol');
      }

      // Calculate the expected price
      const expectedPrice = peRatio * projectedEarnings;

      console.log(`Expected price for ${symbol}: $${expectedPrice.toFixed(2)}`);
      return expectedPrice;
    } catch (error) {
      console.error(`Error calculating expected price for ${symbol}:`, error);
      throw error;
    }
  },

  // fetch an EBITDA by stock ticker
  companyEBITDA: async function (symbol: string): Promise<number> {
    try {
      // Fetch the stock's financial data
      const result = await yahooFinance.quoteSummary(symbol, { modules: ['financialData'] });
  
      // Extract the EBITDA value
      const ebitda = result?.financialData?.ebitda;
  
      if (!ebitda) {
        throw new Error(`EBITDA not available for the given stock symbol: ${symbol}`);
      }
  
      return ebitda;
    } catch (error) {
      console.error(`Error fetching EBITDA for ${symbol}:`, error);
      throw error;
    }
  },

  companyMarketCap: async function (symbol: string): Promise<number> {
    try {
      // Fetch the stock's summary data
      const result = await yahooFinance.quoteSummary(symbol, { modules: ['summaryDetail'] });
  
      // Extract the market cap value
      const marketCap = result?.summaryDetail?.marketCap;
  
      if (!marketCap) {
        throw new Error(`Market cap not available for the given stock symbol: ${symbol}`);
      }
  
      return marketCap;
    } catch (error) {
      console.error(`Error fetching market cap for ${symbol}:`, error);
      throw error;
    }
  },

};

