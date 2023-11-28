import {LoginFormType} from "@/features/auth/components/LoginForm/LoginForm.tsx";
import { API_KEY } from "./API-KEY";
import axios from "axios";

const instance = axios.create({
	baseURL: `https://social-network.samuraijs.com/api/1.0/`,
	headers: {
		'API-KEY': API_KEY,
	},
	withCredentials: true,
})

export const usersAPI = {
	getUsers: async (currentPage: number, pageSize: number) => {
		const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
		return response.data;
	}
}

export const followAPI = {
	getFollowingStatus: async (id: number) => {
		const response = await instance.get(`follow/${id}`);
		return response.data;
	},
	switchFollow: async (id: number, followed: boolean) => {
		const response = followed
			? await instance.delete(`follow/${id}`)
			: await instance.post(`follow/${id}`)
		return response.data.resultCode;
	}
}

export const profileAPI = {
	setProfile: async (id: number) => {
		const response = await instance.get(`profile/${id}`);
		return response.data;
	},
	getUserStatus: async (id: number) => {
		const response = await instance.get(`profile/status/${id}`);
		return response.data;
	},
	updateMyStatus: async (status: string) => {
		const response = await instance.put('profile/status', { status });
		return response.data.resultCode;
	},
	updateMyPhoto: async (data: FormData) => {
		const response = await instance.put('profile/photo', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}})
		return response.data;
	}
}

export const authAPI = {
	authMe: async () => {
		const response = await instance.get(`auth/me`);
		return response.data;
	},
	login: async (data: LoginFormType) => {
		const response = await instance.post(`auth/login`, data);
		return response.data;
	},
	logout: async () => {
		const response = await instance.delete(`auth/login`);
		return response.data;
	}
}