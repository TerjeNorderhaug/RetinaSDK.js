/**
 * Main Cortical.io Retina API Client module.
 */
var Cortical = {};

/**
 * Cortical.io Core Retina API client.
 */
Cortical.CoreClient = (function (apiKey, apiServer, retina) {

    if (typeof apiKey === 'undefined') {
        throw new Error('Required apiKey argument was missing.')
    }

    if (typeof apiServer === 'undefined') {
        apiServer = "http://api.cortical.io/rest/"
    }

    if (typeof retina === 'undefined') {
        retina = "en_associative"
    }

    /**
     * Sends an HTTP request.
     *
     * @param url the URL to send the request to.
     * @param type the type of URL request to perform.
     * @param params request parameters.
     * @param callback optional callback function to process the response.
     * @returns {*}
     */
    function sendRequest(url, type, params, callback) {

        // Prepend API server to request URL
        url = apiServer + url;

        if (params == null || typeof params === 'undefined') {
            params = {};
        }

        var httpRequest = new XMLHttpRequest();
        var isAsync = (typeof callback != "undefined");
        httpRequest.open(type, url, isAsync);

        if (url.indexOf("/image") >= 0) {
            httpRequest.setRequestHeader("Accept", "image/png");
        } else {
            httpRequest.setRequestHeader("Accept", "application/json");
        }
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.setRequestHeader("api-key", apiKey);
        httpRequest.setRequestHeader("api-client", "js_1.0");

        if (isAsync) {

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    if (httpRequest.responseURL.indexOf("/rest/image") == -1) {
                        callback(JSON.parse(httpRequest.responseText));
                    } else {
                        callback(httpRequest.responseText);
                    }
                }
            };

            httpRequest.send(params);

        } else {
            httpRequest.send(params);
            if (httpRequest.responseURL.indexOf("/rest/image") == -1) {
                return JSON.parse(httpRequest.responseText);
            } else {
                return callback(httpRequest.responseText);
            }

        }

    }

    /**
     * Sends an HTTP GET request.
     *
     * @param url the URL to send the request to.
     * @param params request parameters.
     * @param callback optional callback function to process the response.
     * @returns {*}
     */
    function get(url, params, callback) {

        // Add default retina_name parameter if needed
        if (params && typeof params.retina_name === 'undefined' && url.indexOf("/retinas") == -1) {
            params.retina_name = retina;
        }

        // Append params to URL
        var first = true;
        for (var key in params) {

            if (first) {
                url = url + "?";
                first = false;
            } else {
                url = url + "&";
            }

            if (params.hasOwnProperty(key)) {
                var name = key;
                var value = params[key];
                url = url + name + "=" + value
            }
        }
        return sendRequest(url, "GET", null, callback);
    }

    /**
     * Sends an HTTP POST request.
     *
     * @param url the URL to send the request to.
     * @param params request parameters.
     * @param callback optional callback function to process the response.
     */
    function post(url, params, callback) {


        // Add default retina_name parameter if needed
        if (params && typeof params.retina_name === 'undefined') {
            params.retina_name = retina;
        }

        // Append params to URL
        var first = true;
        for (var key in params) {

            if (key == "body") {
                continue;
            }

            if (first) {
                url = url + "?";
                first = false;
            } else {
                url = url + "&";
            }

            if (params.hasOwnProperty(key)) {
                var name = key;
                var value = params[key];
                url = url + name + "=" + value
            }
        }
        return sendRequest(url, "POST", JSON.stringify(params.body), callback);
    }

    // Public methods.
    var api = {};

    /**
     * Returns available Retinas.
     *
     * Required parameters: none
     *
     * Response format: TODO
     *
     * If no value is specified for the retina_name parameter, this method returns an overview of all available
     * retinas.
     *
     * If a specific retina is chosen, then only information about that retina is returned.
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getRetinas = function (params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = null;
        }
        return get("retinas", params, callback);
    };

    /**
     * Returns information about terms.
     *
     * Required parameters: retina_name
     *
     * Response format: [Object {description: String, numberOfColumns: Numeric, numberOfRows: Numeric,
     * numberOfTermsInRetina: Numeric, retinaName: String}]
     *
     * When the term parameter is not specified, a listing of all terms in the retina will be returned. Otherwise
     * this method returns a term object with meta-data for an exact match, or a list of potential retina terms if
     * the string contains one or more of the wildcard characters, '*' and '?'. The wildcard characters must be
     * initially preceded by at least 3 characters.
     *
     * The asterisk wildcard, '*', represents zero or more characters.
     *
     * The question mark wildcard, '?', represents exactly one character.
     *
     * If the start_index parameter for this method is not specified, the default of 0 will be assumed.
     *
     * If the max_results parameter for this method is not specified, the default of 10 will be assumed.
     *
     * For this method the maximum number of results per page is limited to 1000.
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getTerms = function (params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = null;
        } else if (typeof params === 'string') {
            params = {term: params}
        }
        return get("terms", params, callback);
    };

    /**
     * Returns a listing of all the contexts for a given term.
     *
     * Required parameters: retina_name, term
     *
     * Response format: TODO
     *
     * If the start_index parameter for this method is not specified, the default of 0 will be assumed.
     *
     * If the max_results parameter for this method is not specified, then the default value of 5 will be assumed.
     * Each term can have as many different contexts as semantic meanings.
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getContextsForTerm = function (params, callback) {
        if (typeof params === 'string') {
            params = {term: params}
        }
        return get("terms/contexts", params, callback);
    };

    /**
     * Returns a listing of similar terms for the specified input term.
     *
     * Required parameters: retina_name, term
     *
     * Response format: TODO
     *
     * If any valid context_id is specified the method returns similar terms for the term in this specific context.
     *
     * If the start_index parameter for this method is not specified, the default of 0 will be assumed.
     *
     * If the max_results parameter for this method is not specified, then the default value of 10 will be assumed.
     * For this method the maximum number of results per page is limited to 1000.
     *
     * If the context_id parameter is not specified, this method returns a list of similar terms over all contexts.
     *
     * The pos_type parameter enables filtering of the results by parts of speech (one of: NOUN, VERB, ADJECTIVE).
     * If this parameter is unspecified, (null), no filtering will occur.
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getSimilarTermsForTerm = function (params, callback) {
        return get("terms/similar_terms", params, callback);
    };

    /**
     * Returns a retina representation (a Fingerprint) of the input text.
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getFingerprintForText = function (params, callback) {
        if (typeof params === 'string') {
            params = {body: params}
        }
        return post("text", params, callback);
    };

    /**
     * Returns a list of keywords from the input text.
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getKeywordsForText = function (params, callback) {
        return post("text/keywords", params, callback);
    };

    /**
     * Required parameters: TODO
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getTokensForText = function (params, callback) {
        if (typeof params === 'string') {
            params = {body: params}
        }
        return post("text/tokenize", params, callback);
    };

    /**
     * Required parameters: TODO
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getSlicesForText = function (params, callback) {
        if (typeof params === 'string') {
            params = {body: params}
        }
        return post("text/slices", params, callback);
    };

    /**
     * Required parameters: TODO
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getFingerprintsForTexts = function (params, callback) {
        var length = params.length;
        for (var i = 0; i < length; i++) {
            params[i] = {"text": params[i]};
        }
        params = {body: params};
        return post("text/bulk", params, callback);
    };

    /**
     * Returns an object containing information about the language of the specified text. It is capable of
     * identifying more than 50 languages. For best results it is recommended that input texts consist of a minimum
     * of 10 words (approximately 40 to 50 characters).
     *
     * Required parameters: body
     *
     * Response format: Object {language: String, iso_tag: String, wiki_url: String}
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getLanguageForText = function (params, callback) {
        if (typeof params === 'string') {
            params = {body: params}
        }
        return post("text/detect_language", params, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getFingerprintForExpression = function (params, callback) {
        return post("expressions", {body: params}, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getContextsForExpression = function (params, callback) {
        return post("expressions/contexts", {body: params}, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getSimilarTermsForExpression = function (params, callback) {
        return post("expressions/similar_terms", {body: params}, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getFingerprintsForExpressions = function (params, callback) {
        return post("expressions/bulk", {body: params}, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getContextsForExpressions = function (params, callback) {
        return post("expressions/contexts/bulk", {body: params}, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getSimilarTermsForExpressions = function (params, callback) {
        return post("expressions/similar_terms/bulk", {body: params}, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.compare = function (params, callback) {
        return post("compare", {body: params}, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.compareBulk = function (params, callback) {
        return post("compare/bulk", {body: params}, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.getImage = function (params, callback) {
        return post("image", params, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.compareImage = function (params, callback) {
        return post("image/compare", params, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.compareImages = function (params, callback) {
        return post("image/compare/bulk", params, callback);
    };

    /**
     * TODO
     *
     * Required parameters: retina_name, filter_name, body
     *
     * Response format: TODO
     *
     * @param params
     * @param callback
     * @returns {*}
     */
    api.createCategoryFilter = function (params, callback) {
        // TODO two lists
        return post("classify/create_category_filter", params, callback);
    };

    return api;

});

/**
 * Cortical.io Basic Retina API client.
 */
Cortical.BasicClient = (function (apiKey, apiServer, retina) {

    var core = new Cortical.CoreClient(apiKey, apiServer, retina);

    // Lightweight API module.
    var basic = {};

    /**
     * Returns an array of similar terms for a given text.
     *
     * @param text the text to retrieve similar terms for.
     * @param callback an optional callback function to apply to the returned similar terms.
     * @returns {*}
     */
    basic.getSimilarTerms = function (text, callback) {
        callback = wrapCallback(callback, extractSimilarTerms);
        var response = core.getSimilarTermsForExpression({body: {text: text}}, callback);
        return extractSimilarTerms(response);
    };

    /**
     * Returns an array of keywords for a given text.
     *
     * @param text the text to retrieve keywords from.
     * @param callback an optional callback function to apply to the returned keywords.
     * @returns {*}
     */
    basic.getKeywords = function (text, callback) {
        return core.getKeywordsForText({body: text}, callback)
    };

    /**
     * Returns a Fingerprint representation for a given text.
     *
     * @param text the text to compute a Fingerprint for.
     * @param callback an optional callback function to apply to the returned Fingerprint.
     * @returns {*}
     */
    basic.getFingerprint = function (text, callback) {
        callback = wrapCallback(callback, extractPositions);
        var response = core.getFingerprintForText({body: text}, callback);
        return extractPositions(response);
    };

    /**
     * Returns the cosine similarity of two comparable objects (either Strings or Fingerprint positions).
     *
     * @param object1 A comparable object (String or Fingerprint)
     * @param object2 A comparable object (String or Fingerprint)
     * @param callback
     * @returns {*}
     */
    basic.compare = function (object1, object2, callback) {

        callback = wrapCallback(callback, extractCosineSimilarity);
        var response;

        if (typeof object1 === "string" && typeof object2 === "string") {
            response = core.compare([{text: object1}, {text: object2}], callback);
        } else if (typeof object1 === "object" && typeof object2 === "object") {
            response = core.compare([{positions: object1}, {positions: object2}], callback);
        } else if (typeof object1 === "string" && typeof object2 === "object") {
            response = core.compare([{text: object1}, {positions: object2}], callback);
        } else if (typeof object1 === "object" && typeof object2 === "string") {
            response = core.compare([{positions: object1}, {text: object2}], callback);
        } else {
            throw new Error("Unable to compute cosine similarity between '" + object1 + "' and '" + object2 + "'");
        }

        return extractCosineSimilarity(response);
    };

    /**
     * Extracts the cosine similarity from a response containing distance and similarity measures.
     *
     * @param response
     * @returns {*}
     */
    function extractCosineSimilarity(response) {
        if (typeof response != "undefined") {
            return response.cosineSimilarity;
        }
    }

    /**
     * Extracts the string representations from a response object containing a collecting of terms.
     *
     * @param response the response object to extract terms from.
     * @returns {Array}
     */
    function extractSimilarTerms(response) {
        if (typeof response != "undefined") {
            var terms = [];
            for (var i = 0; i < response.length; i++) {
                terms.push(response[i].term);
            }
            return terms;
        }
    }

    /**
     * Returns the positions attribute from a response object.
     *
     * @param response the response object to extract positions from.
     * @returns {Array}
     */
    function extractPositions(response) {
        if (typeof response != "undefined") {
            return response[0].positions;
        }
    }

    /**
     * Wraps a callback function with a preprocessing function that transforms data before passing it to the callback.
     *
     * @param callback the callback function to wrap.
     * @param wrapper the wrapping function.
     * @returns {*}
     */
    function wrapCallback(callback, wrapper) {
        if (typeof callback != "undefined") {
            var originalCallback = callback;
            callback = function (data) {
                var response = wrapper(data);
                originalCallback(response);
            }
        }
        return callback;
    }

    return basic;

});