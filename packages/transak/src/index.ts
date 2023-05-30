/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import transakSDK from '@transak/transak-sdk'
import { ITransakDto, environments } from 'interface'

class TransakSDK {
  apiKey: string
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  transak: any

  constructor(environment: environments, transakData: ITransakDto = {}) {
    if (environment === 'PRODUCTION') {
      this.apiKey = '18919f4b-0593-4abf-9776-8ca2a619f73f'
    } else {
      this.apiKey = '18919f4b-0593-4abf-9776-8ca2a619f73f'
    }
    const transak = new transakSDK({
      apiKey: this.apiKey,
      widgetHeight: '625px',
      widgetWidth: '500px',
      environment: environment,
      ...transakData
    })
    this.transak = transak
  }

  init() {
    try {
      this.transak.init()
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.error(err)
      throw new Error('Error while init transakSDK')
    }
  }

  getTransak() {
    return this.transak
  }
}

export default TransakSDK
