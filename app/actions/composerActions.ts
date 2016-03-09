declare var _

import AppStore from "../stores/AppStore"

// base agent.
const baseAgent = function(api) {
	const currentText = api.getCurrentMessage().text
	const words       = currentText.split(" ")

	if (words[0] === "/agent") {
		const name = words[1]
		const code = _.slice(words, 2).join(" ")
		api.createAgent({name, code})
	}
}

export const updateValue = function(args: {
	message: string
}) {
	AppStore.updateData({
		composerValue: args.message
	})
}

export const submit = function(args: {
	message: string
}) {
	const message = {
		text: args.message
	}

	const messagesRef = AppStore.getData().firebaseRef.child("messages")
	const agentsRef   = AppStore.getData().firebaseRef.child("agents")

	messagesRef.push(message)
	updateValue({message: ""})

	const api = {
		getCurrentMessage: function() {
			return message
		},
		createMessage: function(newMessage) {
			messagesRef.push(newMessage)
		},
		createAgent: function(newAgent) {
			agentsRef.once("value", (snapshot) => {
				const agents = snapshot.val()

				const foundAgentKey = _.findKey(agents, (value, key) => {
					return value.name === newAgent.name
				})

				if (foundAgentKey) {
					agentsRef.child(foundAgentKey).set(newAgent)
				}
				else {
					agentsRef.push(newAgent)
				}
			})
		}
	}

	baseAgent(api)

	const agents = AppStore.getData().firebaseValue.agents || []
	_.each(agents, ({code, name}) => {
		const wrapped = `
			[function(api) {
				${code}
			}]
		`
		try {
			const fn = eval(wrapped)
			fn[0](api)
		}
		catch(err) {
			messagesRef.push({
				text: `/error in agent ${name}: ${err}`
			})
		}
	})

}
