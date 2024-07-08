import { Provider } from 'react-redux'

import store from './store'
import { OnThisDayPage } from './pages'
import ToastProvider from './components/Toast'

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <OnThisDayPage />
      </ToastProvider>
    </Provider>
  )
}

export default App
