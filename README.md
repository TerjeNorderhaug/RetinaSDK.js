# RetinaSDK.js - A JavaScript Client for the Cortical.io Retina API

Pure JavaScript wrapper library for the [Cortical.io API](http://api.cortical.io/). Register for a [free Cortical.io 
API key](http://www.cortical.io/resources_apikey.html) and include RetinaSDK.js to add language intelligence to any 
browser-based application.

## Introduction

Cortical.io's Retina API allows the user to perform semantic operations on text. One can for example:

* measure the semantic similarity between two written entities
* create a semantic classifier based on positive and negative example texts
* extract keywords from a text
* divide a text into sub-sections corresponding to semantic changes
* extract terms from a text based on part of speech tags

The meaning of terms and texts is stored in a sparse binary representation that allows the user to apply logical 
operators to refine the semantic representation of a concept.

You can read more about the technology at the [documentation page](http://documentation.cortical.io/intro.html).

To access the API, you will need to register for an [API key](http://www.cortical.io/resources_apikey.html).

## Installation

Download and include `retina-sdk-1.0.js` (development version) or `retina-sdk-1.0.min.js` (production version) in an 
HTML document.

    <script src="/path/to/retina-sdk-1.0.js"></script>

Once the script has loaded, the global object retinaSDK will be created from which you can instantiate the client 
with a valid API Key.

## Usage

RetinaSDK.js offers two abstractions of the Cortical.io Retina API, a lightweight module that offers simplified 
access to the most common and useful API functions available and a full version module that gives the user complete 
control over various parameter settings and complete access to all API endpoints.
 
### LiteClient Module

The LiteClient module is sufficient for most applications and offers the ability to quickly and easily 
compute keywords for a text, semantically compare two texts, retrieve similar terms, create category filters for 
semantic filtering and generate semantic fingerprints of a given text. To get started, create an instance of the 
lightweight client by passing your API key as follows:  

```javascript
/* Create "lightweight" LiteClient instance */
var lite = retinaSDK.LiteClient(your_api_key)
```

Once you've created a client instance, you can start using it to make calls to the Retina API:

```javascript
/* Retrieve similar terms */
lite.getSimilarTerms("javascript");
> ["javascript", "browser", "html", "browsers", "api", "xml", "functionality", "microsoft", "runtime", "perl", "implementations", "css", "software", "unix", "files", "gui", "server", "plugin", "internet explorer", "linux"]

/* Return keywords of a text */
lite.getKeywords("Vienna is the capital and largest city of Austria, and one of the nine states of Austria");
> ["austria", "vienna"]

/* Compute a semantic fingerprint for an input text */
lite.getFingerprint("apple")
> Array[328]

/* Compute the similarity between two texts */
lite.compare("apple", "microsoft")
> 0.4024390243902438

/* Compute the similarity between two fingerprints */
var appleFP = lite.getFingerprint("apple")
var microsoftFP = lite.getFingerprint("microsoft")
lite.compare(appleFP, microsoftFP)
> 0.4024390243902438

/* Compute the similarity between a fingerprint and a text */
var appleFP = lite.getFingerprint("apple")
lite.compare(appleFP, "microsoft")
> 0.4024390243902438

/* Construct a composite Fingerprint from an array of texts to use for semantic filtering */
var neurologyFilter = lite.createCategoryFilter(["neuron", "synapse", "neocortex"])
console.log(neurologyFilter)
> Array[677]

/* Use the neurologyFilter computed above to compare and classify new texts. */ 
lite.compare(neurologyFilter, "skylab")
> 0.056544622895956895 // low semantic similarity -> negative classification
lite.compare(neurologyFilter, "cortical column")
> 0.35455851788907006 // high semantic similarity -> positive classification
```

#### Callbacks

The above examples show basic use of the LiteClient without callback functions to process the responses. But since 
each call to the LiteClient results in an HTTP request being made to the Cortical.io API, it is highly recommended 
to pass a callback function as part of each method call to handle the resulting response. While the callback 
parameter is technically optional, if it is missing, the HTTP requests made will block code execution until 
a response is received, which can result in poor application performance.

Callbacks can either be a single function or an object with two named functions, success and error, which will 
process normal responses or deal with failed requests. If only a single function is passed, it will be assumed to be 
the success function and failed requests will result in an exception.

```javascript
/* Asynchronously retrieve similar terms with a callback function */
lite.getSimilarTerms("javascript", function(similarTerms) {
    console.log(similarTerms)
});

/* Asynchronously retrieve similar terms with an object containing success and error callbacks */
lite.getSimilarTerms("javascript", {success: function(similarTerms) {
    console.log(similarTerms)
}, error: function(response){
    // handle error
}});
```

### FullClient Module

As with the LiteClient, the FullClient must be instantiated with a valid Cortical.io API key:

```javascript
/* Create FullClient instance */
var full = retinaSDK.FullClient(your_api_key)
```

Additional parameters can also be passed when creating a FullClient instance to specify the host address (in case you
 have access to your own Retina API service, for example by running your own [AWS](https://aws.amazon.com/marketplace/seller-profile?id=c88ca878-a648-464c-b29b-38ba057bd2f5) or [Azure instance](https://azure.microsoft.com/en-us/marketplace/partners/cortical-io/cortical-io-retinaservice-eng-gen/)) and Retina name.
 
 ```javascript
 /* Create FullClient instance with explicit server address and Retina name */
 var full = retinaSDK.FullClient(your_api_key, "http://api.cortical.io/rest/", "en_associative")
 ```

#### Callbacks

As with the LiteClient, all calls to the FullClient accept an optional callback parameter that can either be a single
 function or an object with two named functions, success and error, which will process normal responses or deal with 
 failed requests. If only a single function is passed, it will be assumed to be the success function and failed 
 requests will result in an exception.


#### Available Functions and Parameters

<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th style="">Method</th>
			<th style="">Description</th>
			<th style="">Required Parameters</th>
			<th style="">Optional Parameters</th>
		</tr>
	</thead>
	<tbody>
		<tr>
    		<td>getRetinas</td>
    		<td>Returns information about Retinas as an array of Retina objects.</td>
    		<td>none</td>
    		<td>retina_name</td>
    	</tr>
	</tbody<
</table>

### Change Log

<B>v 1.0.0</B>

* Initial release.