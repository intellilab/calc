<script lang="ts">
  import { getFees } from './util';

  const markets = [
    {
      label: '上证A股',
      value: 'SH',
    },
    {
      label: '深证A股',
      value: 'SZ',
    },
  ];
  const input = {
    market: markets[0].value,
    isBuying: true,
    price: '0.00',
    amount: 0,
    commissionRate: 0.02,
    minFee: 5,
    isETF: false,
  };
  $: fees = getFees({
    price: +input.price,
    amount: +input.amount,
    commissionRate: +input.commissionRate / 100,
    minFee: +input.minFee,
    side: input.isBuying ? 'buy' : 'sell',
    market: input.market,
    isETF: input.isETF,
  });
</script>

<div class="max-w-screen-sm mx-auto px-4 flex flex-col items-stretch">
  <header class="flex mt-3 mb-6 items-center">
    <h1 class="text-3xl">股票交易手续费</h1>

    <a class="ml-4" href="https://github.com/intellilab/calc">
      <img
        src="https://img.shields.io/github/stars/intellilab/calc?style=social"
      />
    </a>
  </header>

  <section>
    <div class="row">
      <div class="label">交易对象：</div>
      <div class="flex">
        <select bind:value={input.target}>
          {#each markets as target}
            <option value={target.value}>{target.label}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="row">
      <div class="label">交易类型：</div>
      <div class="flex items-center">
        <label class="mr-2">
          <input type="checkbox" bind:checked={input.isBuying} /> 买入
        </label>
        <label><input type="checkbox" bind:checked={input.isETF} /> ETF</label>
      </div>
    </div>
    <div class="row">
      <div class="label">成交价：</div>
      <div class="flex">
        <input type="number" bind:value={input.price} step="0.01" />元
      </div>
    </div>
    <div class="row">
      <div class="label">成交量：</div>
      <div class="flex">
        <input type="number" bind:value={input.amount} />手
      </div>
    </div>
    <div class="row">
      <div class="label">佣金：</div>
      <div class="flex">
        <input type="number" bind:value={input.commissionRate} step="0.01" />%
      </div>
    </div>
    <div class="row">
      <div class="label">最低佣金：</div>
      <div class="flex">
        <input type="number" bind:value={input.minFee} />元
      </div>
    </div>
  </section>

  <section>
    <div class="row">
      <div class="label">总费用：</div>
      <div>{fees.totalFee.toFixed(2)}</div>
      元
    </div>
    <div class="row">
      <div class="label">佣金：</div>
      <div>
        <span>{fees.commission.toFixed(2)}</span>元
      </div>
    </div>
    <div class="row">
      <div class="label">交易所规费：</div>
      <div>
        <span>{fees.exchangeFee.toFixed(2)}</span>元
        <div class="hint">（0.00687%）</div>
      </div>
    </div>
    <div class="row">
      <div class="label">印花税：</div>
      <div>
        <span>{fees.stampDuty.toFixed(2)}</span>元
        {#if !input.isBuying && !input.isETF}
          <div class="hint">（卖出股票时征收印花税 0.1%）</div>
        {/if}
      </div>
    </div>
    <div class="row">
      <div class="label">过户费：</div>
      <div>
        <span>{fees.transferFee.toFixed(2)}</span>元
        {#if input.target === 'SH' && !input.isETF}
          <div class="hint">（上证股票交易收过户费 0.001%）</div>
        {/if}
      </div>
    </div>
  </section>

  <footer>
    Designed by <a href="https://gera2ld.space/" target="_blank" rel="noopener"
      >Gerald</a
    > with ❤️
  </footer>
</div>
