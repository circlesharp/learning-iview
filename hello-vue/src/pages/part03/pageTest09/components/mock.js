const mock = [
  { title: '日期', key: 'Date', width: 160 },
  { title: '微信支付交易额与成交额', key: 'Wx', width: 160 },
  { title: '微信支付（代收）交易额与成交额', key: 'YPWx', width: 160 },
  { title: '支付宝支付交易额与成交额', key: 'Alipay', width: 160 },
  { title: '支付宝支付(代收)交易额与成交额', key: 'YPAlipay', width: 160 },
  { title: '会员余额支付交易额与成交额', key: 'MC', width: 160 },
  { title: '现金支付交易额与成交额', key: 'Cash', width: 160 },
  {
    title: '银联云闪付交易额与成交额',
    key: 'UnionPay',
    display: false,
    width: 160,
  },
  { title: '京东支付交易额与成交额', key: 'JD', display: false, width: 160 },
  {
    title: '读卡器支付交易额与成交额',
    key: 'CardReader',
    display: false,
    width: 160,
  },
  { title: '品牌商微信支付交易额与成交额', key: 'BrandWx', width: 160 },
  { title: '品牌商支付宝支付交易额与成交额', key: 'BrandAlipay', width: 160 },
  {
    title: '指纹支付交易额与成交额',
    key: 'FingerPrint',
    display: false,
    width: 160,
  },
  {
    title: '刷卡支付交易额与成交额',
    key: 'CreditCard',
    display: false,
    width: 160,
  },
  {
    title: '第三方支付交易额与成交额',
    key: 'ThirdPay',
    display: false,
    width: 160,
  },
  {
    title: '品牌商第三方支付交易额与成交额',
    key: 'BrandThird',
    display: false,
    width: 160,
  },
  { title: '运营商兑换码', key: 'Voucher', display: false, width: 160 },
  { title: '合计(交易额/交易笔数)', key: 'Total', width: 160 },
  { title: '毛利', key: 'GrossPrice', width: 160 },
  { title: '毛利率', key: 'GrossProfitRate', width: 160 },
];

export default mock;
