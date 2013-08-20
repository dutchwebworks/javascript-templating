/*
	@author: Dennis Burger
	@email: dennis@dutchwebworks.nl
	@prerequisite: jquery.min.js, handlebars-1.0.rc.1.min.js
*/

$.fn.matchHandlebars = function(options) {
	// Set default settings
	var settings = {
		handlebarAttribute: 'handlebar-template',
		jsonAttribute: 'handlebar-json',
		errorLoading: 'Could not load:',
		errorParsing: 'Could not parse Handlebars'
	};	
	if(options) $.extend(settings, options);

	// Ajax loader
	loadAjaxFile = function(fileUrl) {
		var result = false;
		$.ajax({ 
			async: false, 
			url: fileUrl,
			success: function(data){
				result = data;
			},
			error: function() {
				result = settings.errorLoading + ' ' + fileUrl;
			}
		});
		return result;
	}

	return this.each(function() {
		var handlebarTemplate = loadAjaxFile($(this).data(settings.handlebarAttribute));
		var jsonDataSource = loadAjaxFile($(this).data(settings.jsonAttribute));

		// Complile the handlebar template with the json data
		if(handlebarTemplate != null && jsonDataSource != null) {
			var handleTemplate = Handlebars.compile(handlebarTemplate);
			$(this).html(handleTemplate(jsonDataSource));
		} else {
			$(this).html(settings.errorParsing);
		}
	});
}