import { StringAsyncStorage } from "."

export class RecordStorage implements StringAsyncStorage {
	private readonly storage: Record<string, string> = {}

	async getItem(key: string): Promise<string | null> {
		return this.storage[key] || null
	}

	async removeItem(key: string): Promise<void> {
		delete this.storage[key]
	}

	async setItem(key: string, value: string): Promise<void> {
		this.storage[key] = value
	}
}
