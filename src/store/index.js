import { init } from '@rematch/core'
import createPersistPlugin from '@rematch/persist'

import auth from './modules/auth'
import apps from './modules/apps'
import payables from './modules/payables'

const persist = createPersistPlugin({
  whitelist: ['auth'],
  version: 1,
})

const store = init({
  models: { auth, apps, payables },
  plugins: [persist],
})

export default store
