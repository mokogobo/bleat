declare var React
declare var Reflux
var PureRenderMixin = React.addons.PureRenderMixin

import * as composerActions from "../actions/composerActions"

var Composer = React.createClass({

	mixins: [
		PureRenderMixin,
	],


	render: function() {
		return (
			<div style={this.styles.root}>
				<textarea
					style     = {this.styles.textarea}
					value     = {this.props.value}
					onKeyDown = {this.handleKeyDown}
					onChange  = {this.handleInputChange}
				/>
			</div>
		)
	},

	/*
		Submit
	*/

	handleInputChange: function(e) {
		composerActions.updateValue({
			message: e.target.value
		})
	},

	handleKeyDown: function(e) {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault()
			composerActions.submit({
				message: this.props.value
			})
		}
	},

	/*
		Styles
	*/

	styles: {
		root: {
			position     : "absolute",
			left         : 12,
			right        : 12,
			bottom       : 0,
			boxShadow    : "0px 0px 12px rgba(0,0,0,0.15)",
			borderRadius : 4,
			padding      : 8,
			display      : "flex"
		},

		textarea: {
			flexGrow : "1",
			outline  : "none",
			border   : "none",
			resize   : "none",
			fontSize : "1.5em",
			height   : 32,
		}
	},



})

export default Composer
