/*!
 * Author: Dennis Burger
 * Matchhandlebars jQuery plugin
 * https://github.com/dutchwebworks/javascript-templating
 *
 * Date: Tue Aug 20 2013 12:19:33 GMT+0200 (Eastern Standard Time)
 */

$.fn.matchHandlebars = function(options) {
	// Set default extendable settings
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
		var result = null;

		$.ajax({ 
			async: false, 
			url: fileUrl,
			success: function(data){
				result = data;
			},
			error: function() {
				errors.push(settings.errorLoading + ' ' + fileUrl);
				result = null;
			}
		});

		return result;
	}

	// Return the compiled handlebar template with the json data-source
	return this.each(function() {
		var handlebarTemplate = loadAjaxFile($(this).data(settings.handlebarAttribute));
		var jsonDataSource = loadAjaxFile($(this).data(settings.jsonAttribute));

		// Report Ajax loading errors
		if(errors.length > 0) {
			for(i = 0; i < errors.length; i++) {
				$(this).append(errors[i] + '<br>');
			}

			// Clear the errors for the next iterating element
			errors.length = 0;
		} else if(handlebarTemplate && jsonDataSource) {
			// Complile the handlebar template with the json data
			var handleTemplate = Handlebars.compile(handlebarTemplate);
			// Stick it back into the HTML element
			$(this).html(handleTemplate(jsonDataSource));
		}
	});
}