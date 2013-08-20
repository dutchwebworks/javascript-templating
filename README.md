# jQuery plugin for Javascript templating using Handlebars.js & HTML5 data-attributes

Ajax load in a `.handlebars` template file and a `.json` data-source using **HTML5 data-attributes**.  By changing the json data-source file, adding more example text and or nodes, one can (stress) **test** the (responsive) HTML module(s) in a **working prototype**. This is meant for local development, not production ready HTML.

This can be usefull to test the limits of certain HTML module blocs and see when things 'break' when suddenly there's a lot of or lack of content. Also handy for creating **style-guides**.

## Prerequisites

* [jQuery](http://jquery.com/)
* [Handlebars 1.0+](http://handlebarsjs.com/)
* Proper **mime-types** configured for `.handlebars` and `.json` files on the web server (see below)

## Usage

### intro.json data-source file

	{
		"title": "Basic example with text and repeating paragraphs",
		"paragraphs":
		[
			"With repeating paragraphs. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, fugit dolore voluptas aliquid vitae rerum illum accusamus consequuntur numquam debitis!",
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, iusto, excepturi maiores quae ipsum commodi.",
			"Consectetur adipisicing elit. Maxime quam asperiores accusamus necessitatibus alias delectus accusantium tenetur iure earum numquam!"
		],
		"btn-label": "Github page",
		"btn-href": "http://www.github.com/dutchwebworks/javascript-templating"
	}
	
### intro.handlebars template file

	<h3>{{title}}</h3>

	{{#each paragraphs}}
		<p>
			{{this}}
		</p>
	{{/each}}

	<p>
		<a href="{{btn-href}}">{{btn-label}}</a>
	</p>

### HTML

Load jQuery into the HTML file. Then insert an empty `div` -tag with required **HTML5 data-attributes** for the URL of a `.handlebars` file and the URL of 
a `.json` data source file.

`<div data-handlebar data-handlebar-template="handlebars/intro.handlebars" data-handlebar-json="json/intro.json"></div>`

### Javascript

At the bottom of the HTML file call the `matchHandlebars();` function on the required `div` -tag which contain the appropriate HTML5 data-attributes. On document load the `.handlebars` template is compiled with the `.json` data-source and inserted back into the `div` -tag.

	<script>
		// Match the data sources with the handlebar templates
		$(document).ready(function(){
			$("[data-handlebar]").matchHandlebars();
		});
	</script>

#### Options

The standard used **HTML5 data-attributes**, in this plugin, can be re-configured to have different attribute names.

	<script>
		// Match the data sources with the handlebar templates
		$(document).ready(function(){
			$("[data-handlebar]").matchHandlebars({
				handlebarAttribute: 'handlebar-url',
				jsonAttribute: 'json-url',
				errorLoading: 'Could not load the file:'
			});
		});
	</script>

## Mime-types

Be aware that the web server must send the proper mime-types for the following file extensions.

* `.json` must be set to `application/json`
* `.handlebars` must be set to `text/x-handlebars-template`

There are example web server configuration files for both Apache (`.htaccess`) and Microsoft IIS (`web.config`) in this project repository.