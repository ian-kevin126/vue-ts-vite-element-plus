import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import userMock from '../mock/user'

export const setupProdMockServer = () => {
  console.log('fsda')
  createProdMockServer([...userMock])
}
