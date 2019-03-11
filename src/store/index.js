import { init } from '@rematch/core'
import createPersistPlugin from '@rematch/persist'
import createLoadingPlugin from '@rematch/loading'

import auth from './modules/auth'
import apps from './modules/apps'
import payables from './modules/payables'

const persist = createPersistPlugin({
  whitelist: ['auth'],
  version: 1,
})

const loading = createLoadingPlugin({})

const store = init({
  models: { auth, apps, payables },
  plugins: [persist, loading],
})

export default store
