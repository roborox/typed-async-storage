import { AsyncStorage } from "react-native"

export class TypedAsyncStorage<T> {
	public async getItem<K extends keyof T>(key: K): Promise<T[K] | null> {
		const result = await AsyncStorage.getItem(key as string)
		if (result !== null) {
			return JSON.parse(result) as T[K]
		}
		return null
	}

	public async removeItem<K extends keyof T>(key: K): Promise<void> {
		await AsyncStorage.removeItem(key as string)
	}

	public async setItem<K extends keyof T>(key: K, value: T[K]): Promise<void> {
		await AsyncStorage.setItem(key as string, JSON.stringify(value))
	}
}
