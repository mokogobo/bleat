import AppStore from "../stores/AppStore"

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
	AppStore.getData().firebaseRef.child("messages").push({
		text: args.message
	})
	updateValue({message: ""})
}
