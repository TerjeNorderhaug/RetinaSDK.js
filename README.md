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
control over various parameter settings and full access to all API endpoints.
 
### Lite Client

The Lite client module is sufficient for the majority of applications and offers the ability to quickly and easily 
compute keywords for a text, semantically compare two texts, retrieve similar terms, create category filters for 
semantic filtering and generate semantic fingerprints for a text. To get started, create an instance of the 
lightweight client by passing your API key as follows:  

```javascript
/* Create lightweight client instance */
var lite = retinaSDK.LiteClient(your_api_key)
```

```javascript
/* Retrieve similar terms */
lite.getSimilarTerms("javascript");
["javascript", "browser", "html", "browsers", "api", "xml", "functionality", "microsoft", "runtime", "perl", "implementations", "css", "software", "unix", "files", "gui", "server", "plugin", "internet explorer", "linux"]
```

#### Callbacks

Since each call to the LiteClient results in an HTTP request being made to the Cortical.io API, it is highly 
recommended to pass a callback function as part of each method call to handle the resulting response. While the 
callback parameter is technically optional, if it is missing, the HTTP requests made will block code execution until 
a response is received, which can result in poor application performance.

Callbacks can either be a single function or an object with two named functions, success and error, which will 
process normal responses or deal with failed requests. If only a single function is passed, it will be assumed to be 
the success function and failed requests will result in an exception.

#### Available Functions and Parameters

### Full Client

TODO instantiate full client

```javascript
var full = retinaSDK.FullClient(your_api_key)
```
