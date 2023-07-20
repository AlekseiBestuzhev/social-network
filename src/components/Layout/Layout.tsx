import HeaderContainer from "@/components/Layout/Header/HeaderContainer";
import {Sidebar} from "@/components/Layout/Sidebar/Sidebar";
import { FC, ReactNode } from "react";


type LayoutType = {
	children: ReactNode
}

export const Layout: FC<LayoutType> = ({ children }) => {

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