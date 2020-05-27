export interface IStorage<T extends Record<string, any>> {
	get: <K extends keyof T>(key: K) => Promise<T[K] | undefined>
	remove: (key: keyof T) => Promise<void>
	set: <K extends keyof T>(key: K, value: T[K]) => Promise<void>,
	modify<K extends keyof T>(key: K, updater: (value: T[K] | undefined) => T[K]): Promise<T[K]>
}
