import { createRoot} from 'react-dom/client'
import {store} from "@/redux/redux-store"
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {App} from '@/App'
import '@/index.scss'

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
)
window["store"] = store;