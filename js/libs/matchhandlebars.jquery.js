/*
	@author: Dennis Burger
	@email: dennis@dutchwebworks.nl
	@prerequisite: jquery.min.js, handlebars-1.0.rc.1.min.js
*/

$.fn.matchHandlebars = function(options) {
	var settings = {
		templateDataName: 'handlebar-template',
		templateJsonName: 'handlebar-json',
		errorTitle: 'Could not load: '
	};		
	if(options) $.extend(settings, options);

	return this.each(function() {
		// Get URL's of handlebar template and json data
		var handleResultTemplate = $(this).data(settings.templateDataName);
		var handleResultSource = $(this).data(settings.templateJsonName);

		// Create basic vars
		var thisTemplate, thisSource;
		
		// Ajax load the handlebar template
		$.ajax({ 
			async:false, 
			url: handleResultTemplate,
			success: function(data){ 
				thisTemplate = data;
			},
			error: function() {
				$(this).append(settings.errorTitle + handleResultTemplate + '<br>');
			}
		});

		// Ajax load the json data
		$.ajax({
			async:false,
			url: handleResultSource,
			success: function(data){
				thisSource = data;
			},
			error: function() {
				$(this).append(settings.errorTitle + handleResultSource + '<br>');
			}			
		});

		// Complile the handlebar template with the json data
		if(thisTemplate != null && thisSource != null) {
			var handleTemplate = Handlebars.compile(thisTemplate);
			$(this).html(handleTemplate(thisSource));
		}
	 });
}