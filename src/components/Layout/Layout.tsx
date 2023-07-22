import HeaderContainer from "@/components/Layout/Header/HeaderContainer";
import {Sidebar} from "@/components/Layout/Sidebar/Sidebar";
import {FC, PropsWithChildren} from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {

	return (
		<div className="app-wrapper">
			<HeaderContainer />
			<Sidebar />
			<main className='content'>
				{children}
			</main>
		</div>
	);
}