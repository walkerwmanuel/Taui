import yahooFinance from 'yahoo-finance2'; // Modern import syntax

export const yf2Logic = {
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
};

