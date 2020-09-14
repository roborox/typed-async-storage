import { RecordStorage } from "./record-storage"
import { TypedAsyncStorage } from "./index"

interface Test {
	value1: string
	value2: {
		sub1: number
		sub2: string
	}
}

describe("TypedAsyncStorage", () => {
	it("should get undefined if value not set", async () => {
		const storage = new RecordStorage()
		const typed = new TypedAsyncStorage<Test>(storage)
		expect(await typed.get("value1")).toBe(undefined)
	})

	it("should get default value if value not set", async () => {
		const storage = new RecordStorage()
		const typed = new TypedAsyncStorage<Test>(storage)
		expect(await typed.get("value1")).toBe(undefined)
	})

	it("should set value", async () => {
		const storage = new RecordStorage()
		const typed = new TypedAsyncStorage<Test>(storage)
		await typed.set("value1", "some new value")
		expect(await typed.get("value1")).toBe("some new value")
	})

	it("should remove value", async () => {
		const storage = new RecordStorage()
		const typed = new TypedAsyncStorage<Test>(storage)
		await typed.set("value1", "some new value")
		expect(await typed.get("value1")).toBe("some new value")

		await typed.remove("value1")
		expect(await typed.get("value1")).toBe(undefined)
	})

	it("should modify value", async () => {
		const storage = new RecordStorage()
		const typed = new TypedAsyncStorage<Test>(storage)
		await typed.set("value1", "some new value")
		expect(await typed.get("value1")).toBe("some new value")

		expect(await typed.modify("value1", v => `${v} added`)).toBe("some new value added")
		expect(await typed.get("value1")).toBe("some new value added")
	})
})
