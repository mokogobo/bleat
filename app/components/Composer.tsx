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
			<div>
				<textarea
					value     = {this.props.value}
					onKeyDown = {this.handleKeyDown}
					onChange  = {this.handleInputChange}
				/>
				<div onClick={this.handleClick}>Submit</div>
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

	handleClick: function(e) {
		e.preventDefault()
		composerActions.submit({
			message: this.props.value
		})
	},

	/*
		Styles
	*/

	styles: {
	},



})

export default Composer
