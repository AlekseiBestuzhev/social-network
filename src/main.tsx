import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { store } from "@/app/store.ts";
import { Provider } from "react-redux";
import { App } from "@/app/App.tsx";
import "@/index.scss";

createRoot(document.getElementById('root')!).render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
window.store = store;