export function saveConversation({ newMessage, assistantResponse }) {
	const openRequest = indexedDB.open("conversationHistories", 1)
	const fullDate = new Date()
	const YYYYMMDD = fullDate.getFullYear().toString() + (fullDate.getMonth() + 1).toString().padStart(2, "0") + fullDate.getDate().toString().padStart(2, "0")

	openRequest.onupgradeneeded = function () {
		let db = openRequest.result
		db.createObjectStore("conversationHistories", { keyPath: "id" })
	}

	openRequest.onerror = () => {
		console.error("Error", openRequest.error)
	}

	openRequest.onsuccess = (event) => {
		const db = event.target.result
		
		const addData = () => {
			const transaction = db.transaction("conversationHistories", "readwrite")
			const store = transaction.objectStore("conversationHistories")
			store.add({
				id: YYYYMMDD,
				conversationHistory: [newMessage, {
					role: "assistant",
					optimistic: false,
					content: assistantResponse,
				}]
			})
		}

		const updateData = (existConversations) => {
			const transaction = db.transaction("conversationHistories", "readwrite")
			const store = transaction.objectStore("conversationHistories")
			store.put({
				id: YYYYMMDD,
				conversationHistory: [...existConversations, newMessage, {
					role: "assistant",
					optimistic: false,
					content: assistantResponse,
				}]
			})
		}

		const getData = () => {
			const transaction = db.transaction("conversationHistories", "readonly")
			const store = transaction.objectStore("conversationHistories")
			const request = store.get(YYYYMMDD)
			request.onsuccess = (event) => {
				const data = event.target.result
				console.log(data.conversationHistory)
				if (data) {
					updateData(data.conversationHistory)
				} else {
					addData()
				}
			}
		}

		getData()
	}
}
