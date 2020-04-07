import { AsyncStorage } from "react-native"
import { IStorage } from "./domain"

export class TypedAsyncStorage<T extends Record<string, any>> implements IStorage<T> {
	public async getItem<K extends keyof T>(key: K): Promise<T[K] | null> {
		const result = await AsyncStorage.getItem(key as string)
		if (result !== null) {
			return JSON.parse(result) as T[K]
		}
		return null
	}

	public async getItemWithDefault<K extends keyof T>(key: K, initial: T[K]): Promise<T[K]> {
		const stored = await this.getItem(key)
		if (stored === null) {
			await this.setItem(key, initial)
			return initial
		}
		return stored
	}

	public removeItem<K extends keyof T>(key: K): Promise<void> {
		return AsyncStorage.removeItem(key as string)
	}

	public setItem<K extends keyof T>(key: K, value: T[K]): Promise<void> {
		return AsyncStorage.setItem(key as string, JSON.stringify(value))
	}
}