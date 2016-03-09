import AppStore from "../stores/AppStore"

export const updateValue = function(args: {
	message: string
}) {
	console.log(args)
	AppStore.updateData({
		composerValue: args.message
	})
}

export const submit = function(args: {
	message: string
}) {
	console.log(args)

	AppStore.getData().firebaseRef.child("messages").push({
		text: args.message
	})
	updateValue({message: ""})
}
