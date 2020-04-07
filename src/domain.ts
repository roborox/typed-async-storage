export interface IStorage<T extends Record<string, any>> {
	getItem: <K extends keyof T>(key: K) => Promise<T[K] | null>
	getItemWithDefault: <K extends keyof T>(key: K, initial: T[K]) => Promise<T[K]>
	removeItem: (key: keyof T) => Promise<void>
	setItem: <K extends keyof T>(key: K, value: T[K]) => Promise<void>
}