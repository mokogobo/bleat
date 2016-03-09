declare var _
declare var React
declare var Reflux
declare var marked
var PureRenderMixin = React.addons.PureRenderMixin

var Messages = React.createClass({

	mixins: [
		PureRenderMixin,
	],

	componentDidMount: function() {
		this.scrollToBottom()
	},

	componentDidUpdate: function() {
		this.scrollToBottom()
	},

	render: function() {
		return (
			<div
				style = {this.styles.root}
				ref   = {(root) => {this.root = root}}
			>
				{_.map(this.props.messages, this.renderMessage)}
			</div>
		)
	},

	renderMessage: function(message, key) {
		return (
			<div
				key   = {key}
				style = {this.styles.message}
			>
				<span dangerouslySetInnerHTML={{__html: marked(message.text)}}></span>
			</div>
		)
	},

	/*
		Helpers
	*/

	scrollToBottom: function() {
		const root = React.findDOMNode(this)
		root.scrollTop = root.scrollHeight
	},

	/*
		Styles
	*/

	styles: {
		root: {
			padding       : 24,
			height        : "100%",
			overflow      : "scroll",
			paddingBottom : 80,
		},

		message: {
			marginTop: 8,
			fontSize: "1.2em"
		},
	},

})

export default Messages
