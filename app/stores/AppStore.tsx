declare var _
declare var Reflux
declare var Immutable
declare var uuid
declare var Firebase

const firebaseRoot = new Firebase("https://bleat.firebaseio.com/")

const defaultFirebaseValue = {
	messages : [],
	agents   : []
}

var AppStore = Reflux.createStore({

	init: function(){
		const url         = window.location.pathname.substring(1)
		const firebaseRef = firebaseRoot.child(url)

		firebaseRef.on("value", this.onValue)

		this.data_ = {
			url           : url,
			firebaseRef   : firebaseRef,
			firebaseValue : defaultFirebaseValue,
			composerValue : "",
		}
	},


	getInitialState: function(){
		return this.data_
	},


	getData: function() {
		return this.data_
	},


	updateData: function(update) {
		this.data_ = _.assign({}, this.data_, update)
		this.trigger(this.data_)
	},

	/*
		Events.
	*/

	onValue: function(snapshot) {
		this.updateData({
			firebaseValue: snapshot.val() || defaultFirebaseValue
		})
	},

})


export default AppStore
