export interface IStorage<T extends Record<string, any>> {
	get: <K extends keyof T>(key: K) => Promise<T[K] | null>
	getWithDefault: <K extends keyof T>(key: K, initial: T[K]) => Promise<T[K]>
	remove: (key: keyof T) => Promise<void>
	set: <K extends keyof T>(key: K, value: T[K]) => Promise<void>,
	modify<K extends keyof T>(key: K, updater: (value: T[K] | null) => T[K]): Promise<T[K]>
}
