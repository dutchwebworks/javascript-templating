/*
	@author: Dennis Burger
	@email: dennis@dutchwebworks.nl
	@prerequisite: jquery.min.js, handlebars-1.0.rc.1.min.js
*/

$.fn.matchHandlebars = function() {
	return this.each(function() {
		// Get URL's of handlebar template and json data
		var handleResultTemplate = $(this).data('handlebar-template');
		var handleResultSource = $(this).data('handlebar-json');

		// create basic vars
		var thisObject = $(this);
		var thisTemplate, thisSource;

		// Ajax load the handlebar template
		$.ajax({ 
			async:false, 
			url: handleResultTemplate,
			success : function(data){ 
				thisTemplate = data;
			}
		});

		// Ajax load the json data
		$.ajax({
			async:false,
			url: handleResultSource,
			success : function(data){
				thisSource = data;
			}				
		});

		// Complile the handlebar template with the json data
		var handleTemplate = Handlebars.compile(thisTemplate);
		$(thisObject).html(handleTemplate(thisSource));
	 });
}