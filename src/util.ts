export function getFees(input: {
  price: number;
  amount: number;
  commissionRate: number;
  minFee: number;
  side: 'buy' | 'sell';
  market: 'SH' | 'SZ';
  isETF: boolean;
}) {
  const total = input.price * input.amount * 100;
  const commission = total * input.commissionRate;
  const exchangeFee = total * 0.0000687;
  const baseFee = Math.max(input.minFee, commission);
  const stampDuty = input.side === 'buy' || input.isETF ? 0 : total * 0.001;
  const transferFee =
    input.market === 'SH' && !input.isETF ? total * 0.00001 : 0;
  const totalFee = baseFee + stampDuty + transferFee;
  return {
    commission,
    exchangeFee,
    stampDuty,
    transferFee,
    totalFee,
  };
}
