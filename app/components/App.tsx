declare var React
declare var Reflux
var PureRenderMixin = React.addons.PureRenderMixin

import Messages from "./Messages"
import Composer from "./Composer"
import AppStore from "../stores/AppStore"

var App = React.createClass({

	mixins: [
		PureRenderMixin,
		Reflux.connect(AppStore, "app"),
	],


	render: function() {
		return (
			<div style={this.styles.root}>
				<Messages messages={this.state.app.firebaseValue.messages} />
				<Composer value={this.state.app.composerValue} />
			</div>
		)
	},


	/*
		Styles
	*/

	styles: {
		root: {
			position   : "absolute",
			top        : 0,
			left       : 0,
			right      : 0,
			bottom     : 0,
			fontFamily : "Helvetica",
			overflow   : "hidden",
		},
	},



})

export default App
