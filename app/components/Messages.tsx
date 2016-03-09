declare var _
declare var React
declare var Reflux
var PureRenderMixin = React.addons.PureRenderMixin

var Messages = React.createClass({

	mixins: [
		PureRenderMixin,
	],


	render: function() {
		return (
			<div>
				Messages
				{_.map(this.props.messages, this.renderMessage)}
			</div>
		)
	},

	renderMessage: function(message) {
		return (
			<div>
				<span>{message.text}</span>
			</div>
		)
	},


	/*
		Styles
	*/

	styles: {
	},



})

export default Messages
