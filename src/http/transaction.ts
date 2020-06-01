import HTTP from './request'

interface HttpParams {
  coinName: string;
  txid?: string;
  address?: string;
  xpub?: string;
  contract?: string;
}

/**
 * @no 1
 * @example   Axios.get(`https://api.abckey.com/${this.coin.toLowerCase()}/xpub/${this.xpub}?details=txs&tokens=used&t=${new Date().getTime()}`)
 * @todo Get transaction history by xpub
 */

export const HistoryByXpub = (param: HttpParams) => {
  return HTTP.get<{ data: any }>(`/${param.coinName}/xpub/${param.xpub}`, { params: { t: new Date().getTime(), details: 'txs', tokens: 'used' } }).then(({ data }) => data)
}

/**
 * @no 2
 * @example   Axios.get(`https://api.abckey.com/${this.c_coinInfo.symbol}/tx-specific/${this.d_utxoList[i].txid}`)
 * @todo Get transaction details based on txid
 */
export const TxSpecific = (param: HttpParams) => {
  return HTTP.get<{ data: any }>(`/${param.coinName}/tx-specific/${param.txid}`, { params: { t: new Date().getTime() } }).then(({ data }) => data)
}

/**
 * @no 3
 * @example   Axios.get(`https://api.abckey.com/${this.c_coinInfo.symbol}/address/${this.d_address}?page=1&pageSize=1000&details=txs`)
 * @todo Get transaction history by address
 */

export const HistoryByAddress = (param: HttpParams) => {
  return HTTP.get<{ data: any }>(`/${param.coinName}/address/${param.address}`, { params: { t: new Date().getTime(), details: 'txs', page: 1, pageSize: 1000 } }).then(({ data }) => data)
}

/**
 * @no 4
 * @example  Axios.get(`https://api.abckey.com/trop/address/${this.d_address}?details=txs&contract=${this.c_coinInfo.testContract}&t=${new Date().getTime()}`)
 * @todo Get transaction history by contract
 */

export const HistoryByContract = (param: HttpParams) => {
  return HTTP.get<{ data: any }>(`/${param.coinName}/address/${param.address}`, { params: { t: new Date().getTime(), details: 'txs', contract: param.contract } }).then(({ data }) => data)
}

/**
 * @no 5
 * @example  Axios.get(`https://api.abckey.com/${this.c_coinInfo.symbol}/utxo/${this.c_xpub}?confirme=true`)
 * @todo Get utxo history by xpub
 */
export const GetUtxoByXpub = (param: HttpParams) => {
  return HTTP.get<{ data: any }>(`/${param.coinName}/utxo/${param.xpub}`, { params: { t: new Date().getTime(), confirme: true } }).then(({ data }) => data)
}

/**
 * @no 6
 * @example  await Axios.get(`https://api.abckey.com/${this.c_coinInfo.symbol}/tx/${this.d_utxoList[i].txid}`)
 * @todo Get tx history by txid
 */
export const GetTxDetial = (param: HttpParams) => {
  return HTTP.get<{ data: any }>(`/${param.coinName}/tx/${param.txid}`, { params: { t: new Date().getTime() } }).then(({ data }) => data)
}

/**
 * @no 7
 * @params {coinName} coinName
 * @example  await Axios.get(`https://bitcoinfees.earn.com/api/v1/fees/recommended`)
 * @todo Get fees
 */
export const GetRecommendFee = (coinName = 'btc') => {
  coinName = coinName.toLowerCase()
  if (coinName !== 'btc') {
    return HTTP.get<{ data: any }>(`https://api.abckey.com/fees/${coinName}`, { params: { t: new Date().getTime() } }
    ).then(({ data }) => data)
  }
  return HTTP.get<{ data: any }>('https://bitcoinfees.earn.com/api/v1/fees/recommended', { params: { t: new Date().getTime() } }
  ).then(({ data }) => data)
}

/**
 * @no 8
 * @example  Axios.get(`https://api.abckey.com/${this.c_coinInfo.symbol}/address/${address}?details=basic`)
 * @todo Get fees
 */
export const BalanceByAddress = (param: HttpParams) => {
  return HTTP.get<{ data: any }>(`/${param.coinName}/address/${param.address}`, { params: { t: new Date().getTime(), details: 'basic' } }).then(({ data }) => data)
}
