declare var _
declare var React
declare var Reflux
declare var marked
declare var Codemirror
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
		let text = message.text || ""
		let value
		if (text[0] === "/") {
			value = (
				<div style={this.styles.codeWrap}>
					<Codemirror
						value   = {text}
						options = {{
							readOnly : true
						}}
					/>
				</div>
			)
		}
		else {
			value = (
				<span dangerouslySetInnerHTML={{__html: marked(text)}}></span>
			)
		}
		return (
			<div
				key   = {key}
				style = {this.styles.message}
			>
				{value}
			</div>
		)
	},

	/*
		Helpers
	*/

	scrollToBottom: function() {
		this.root.scrollTop = this.root.scrollHeight
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

		codeWrap: {
			padding         : 4,
			backgroundColor : "rgb(245,245,245)",
			borderRadius    : 2,
		}
	},

})

export default Messages
