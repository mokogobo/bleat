declare var React
declare var Reflux
declare var Codemirror
var PureRenderMixin = React.addons.PureRenderMixin

import * as composerActions from "../actions/composerActions"

var Composer = React.createClass({

	mixins: [
		PureRenderMixin,
	],


	render: function() {
		return (
			<div
				style     = {this.styles.root}
				onKeyDown = {this.handleKeyDown}
			>
				<Codemirror
					value     = {this.props.value}
					onChange  = {this.handleChange}
					options   = {{
						lineNumbers : false,
					}}
				/>
			</div>
		)
	},

	/*
		Submit
	*/

	handleChange: function(newValue) {
		composerActions.updateValue({
			message: newValue
		})
	},

	handleKeyDown: function(e) {
		if (e.keyCode === 13 && e.metaKey) {
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
			position        : "absolute",
			zIndex          : 99999,
			left            : 16,
			right           : 16,
			bottom          : 16,
			boxShadow       : "0px 0px 12px rgba(0,0,0,0.15)",
			borderRadius    : 4,
			padding         : 8,
			backgroundColor : "white",
			fontSize        : "1.5em",
			overflow        : "scroll",
		},

	},



})

export default Composer
