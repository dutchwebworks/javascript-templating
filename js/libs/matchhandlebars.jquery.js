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
		errorLoading: 'Could not load:'
	};	
	if(options) $.extend(settings, options);

	// Vars
	var errors = new Array();

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
				errors.push(settings.errorLoading + ' ' + fileUrl);
				result = false;
			}
		});
		return result;
	}

	// Return the compiled handlebar template with the json data-source
	return this.each(function() {
		var handlebarTemplate = loadAjaxFile($(this).data(settings.handlebarAttribute));
		var jsonDataSource = loadAjaxFile($(this).data(settings.jsonAttribute));

		// Report Ajax loading erros
		if(errors.length > 0) {
			for(i = 0; i < errors.length; i++) {
				$(this).append(errors[i] + '<br>');
			}
			// Clear the errors
			errors = false;
		} else if(handlebarTemplate != null && jsonDataSource != null) {
			// Complile the handlebar template with the json data
			var handleTemplate = Handlebars.compile(handlebarTemplate);
			$(this).html(handleTemplate(jsonDataSource));
		}
	});
}