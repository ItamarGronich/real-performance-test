import { useState, useEffect } from "react";
import { createMockSocketStream } from "../../utils/MockCoinStream";
import { queueFrame } from "../../utils/frame";
import { createList, token } from "../../utils/list";

type Coin = {
  id: number;
  name: string;
};

const coinDB: Map<number, Coin> = new Map(createList().map((item) => [item.id, item]));

let coinStream: ReturnType<typeof createMockSocketStream<Coin>> | null = null;

function createRadomCoin() {
  return { id: Math.ceil(Math.random() * 500), name: token() };
}

function subscribeToCoinStream(cb: () => void) {
  coinStream = coinStream || createMockSocketStream(createRadomCoin);
  return coinStream.on((coin) => {
    coinDB.set(coin.id, coin);
    queueFrame(cb);
  });
}

export function useCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  useEffect(() => subscribeToCoinStream(() => setCoins(() => [...coinDB.values()])), []);
  return { coins };
}
