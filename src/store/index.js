import { init } from '@rematch/core'
import createPersistPlugin from '@rematch/persist'

import auth from './modules/auth'
import apps from './modules/apps'

const persist = createPersistPlugin({
  whitelist: ['auth'],
  version: 1,
})

const store = init({
  models: { auth, apps },
  plugins: [persist],
})

export default store
