import {Sidebar} from "@/components/Layout/Sidebar/Sidebar";
import {Header} from "@/components/Layout/Header/Header";
import {FC, PropsWithChildren} from "react";
import {Toast} from "@/components/Toast/Toast.tsx";

export const Layout: FC<PropsWithChildren> = ({ children }) => {

	return (
		<div className="app-wrapper">
			<Header />
			<Sidebar />
			<main className='content'>
				{children}
			</main>
			<Toast />
		</div>
	);
}