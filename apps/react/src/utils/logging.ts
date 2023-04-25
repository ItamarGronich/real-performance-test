const calls: Record<string, number> = {};
let intervalId: number | null = null;

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(n);
}

function logAllFunctionCalls() {
  for (const [functionName, numberOfCalls] of Object.entries(calls)) {
    console.log(`${functionName} was called ${formatNumber(numberOfCalls)} times per second`);
    calls[functionName] = 0;
  }
}

function createLoggingInterval() {
  intervalId = intervalId || setInterval(logAllFunctionCalls, 1000);
}

export function measureCallsPerSecond(functionName: string) {
  createLoggingInterval();
  calls[functionName] = typeof calls[functionName] === "number" ? calls[functionName] + 1 : 0;
}
