/*
	@author: Dennis Burger
	@email: dennis@dutchwebworks.nl
	@prerequisite: handlebars-1.0.rc.1.min.js

	Using handlebar.js and matching the data-handlebar ID to the script tag ID
	and compiling Handlebar data
*/

$.fn.matchHandlebars = function(dataSource) {
	var handleResultTemplate = this.data('handlebar-template');
	var handleResultSource = $('#' + handleResultTemplate).html();

	var handleTemplate = Handlebars.compile(handleResultSource);
	this.html(handleTemplate(dataSource));
	
    return this;
}