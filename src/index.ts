import { IStorage } from "./domain"

export interface StringAsyncStorage {
	getItem(key: string): Promise<string | null>

	setItem(key: string, value: string): Promise<void>

	removeItem(key: string): Promise<void>
}

export class TypedAsyncStorage<T extends Record<string, any>> implements IStorage<T> {

	constructor(private readonly storage: StringAsyncStorage) {
	}

	public async get<K extends keyof T>(key: K): Promise<T[K] | undefined> {
		const p = this.storage.getItem(key as string)
		const result = await p
		if (result !== null) {
			return JSON.parse(result) as T[K]
		}
		return undefined
	}

	public remove<K extends keyof T>(key: K): Promise<void> {
		return this.storage.removeItem(key as string)
	}

	public set<K extends keyof T>(key: K, value: T[K]): Promise<void> {
		return this.storage.setItem(key as string, JSON.stringify(value))
	}

	public async modify<K extends keyof T>(
		key: K, updater: (value: T[K] | undefined) => T[K],
	): Promise<T[K]> {
		const nextValue = updater((await this.get(key)))
		await this.set(key, nextValue)
		return nextValue
	}
}
