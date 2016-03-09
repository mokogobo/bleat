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
				{_.map(this.props.messages, this.renderMessage)}
			</div>
		)
	},

	renderMessage: function(message, key) {
		return (
			<div key={key} >
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
