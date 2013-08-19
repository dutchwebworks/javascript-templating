# Javascript templating system using jQuery and Handlebars.js

Loading in a `.handlebar` file and matching it with a `.json` data source using HTML5 data-attributes.

By changing the json data source file (add more or less data in json file) you can (stress) test your HTML modules in the (responsive) web browser.

* Separate `.handlebar` file
* Separate `.json` data source

## HTML

`<div data-handlebar data-handlebar-template="handlebars/staff-list.handlebar" data-handlebar-json="json/staff-list.json"></div>`

## Javascript

	<script>
		// Match the data sources with the handlebar templates
		$(document).ready(function(){
			$("[data-handlebar]").matchHandlebars();
		});
	</script>

## Mime-types

Be aware of the proper mime-types for the following file extensions:

* `.json` must be set to `application/json`
* `.handlebar` must be set to `text/x-handlebars-template`