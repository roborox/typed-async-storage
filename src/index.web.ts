import { IStorage } from "./domain"

export class TypedAsyncStorage<T extends Record<string, any>> implements IStorage<T> {
	// @ts-ignore
	private value: T = {}

	public async getItem<K extends keyof T>(key: K): Promise<T[K] | null> {
		return Promise.resolve(this.value[key] || null)
	}

	public async getItemWithDefault<K extends keyof T>(key: K, initial: T[K]): Promise<T[K]> {
		const stored = await this.getItem(key)
		if (!stored) {
			await this.setItem(key, initial)
			return initial
		}
		return stored
	}

	public async removeItem(key: keyof T): Promise<void> {
		delete this.value[key]
	}

	public setItem = async <K extends keyof T>(key: K, value: T[K]): Promise<void> => {
		this.value[key] = value
	}
}
