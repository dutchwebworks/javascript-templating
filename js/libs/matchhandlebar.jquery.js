/*
	@author: Dennis Burger
	@email: dennis@dutchwebworks.nl
	@prerequisite: handlebars-1.0.rc.1.min.js

	Using handlebar.js and matching the data-handlebar ID to the script tag ID
	and compiling Handlebar data
*/

$.fn.matchHandlebar = function(dataSource) {
	var handleResultTemplate = this.data('handlebar');
	var handleResultSource = $('#' + handleResultTemplate).html();
	var handleTemplate = Handlebars.compile(handleResultSource);
	this.html(handleTemplate(dataSource));
    return this;
}