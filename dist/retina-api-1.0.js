/**
 * Cortical.io Retina API client.
 */
var RetinaApiClient = (function (apiKey, apiServer, retina) {

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

        if (typeof params === 'undefined') {
            params = {};
        }

        var httpRequest = new XMLHttpRequest();
        var isAsync = (typeof callback != "undefined");
        httpRequest.open(type, url, isAsync);

        httpRequest.setRequestHeader("Accept", "application/json");
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.setRequestHeader("api-key", apiKey);

        if (isAsync) {

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    callback(JSON.parse(httpRequest.responseText));
                }
            };

            httpRequest.send(params);

        } else {
            httpRequest.send(params);
            return JSON.parse(httpRequest.responseText);
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

    // Public module.
    var api = {};

    // Core API module.
    api.core = {};

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
    api.core.getRetinas = function (params, callback) {
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
    api.core.getTerms = function (params, callback) {
        // TODO checkRequiredParams("retina_name", params);
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
    api.core.getContextsForTerm = function (params, callback) {
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
    api.core.getSimilarTermsForTerm = function (params, callback) {
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
    api.core.getFingerprintForText = function (params, callback) {
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
    api.core.getKeywordsForText = function (params, callback) {
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
    api.core.getTokensForText = function (params, callback) {
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
    api.core.getSlicesForText = function (params, callback) {
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
    api.core.getFingerprintForBulkText = function (params, callback) {
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
    api.core.getLanguageForText = function (params, callback) {
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
    api.core.getFingerprintForExpression = function (params, callback) {
        return post("expressions", params, callback);
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
    api.core.getContextsForExpression = function (params, callback) {
        return post("expressions/contexts", params, callback);
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
    api.core.getSimilarTermsForExpression = function (params, callback) {
        return post("expressions/similar_terms", params, callback);
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
    api.core.getFingerprintsForTexts = function (params, callback) {
        return post("expressions/bulk", params, callback);
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
    api.core.getContextsForExpressions = function (params, callback) {
        return post("expressions/contexts/bulk", params, callback);
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
    api.core.getSimilarTermsForExpressions = function (params, callback) {
        return post("expressions/similar_terms/bulk", params, callback);
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
    api.core.compare = function (params, callback) {
        return post("compare", params, callback);
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
    api.core.compareBulk = function (params, callback) {
        return post("compare/bulk", params, callback);
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
    api.core.getImage = function (params, callback) {
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
    api.core.compareImage = function (params, callback) {
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
    api.core.compareImages = function (params, callback) {
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
    api.core.createCategoryFilter = function (params, callback) {
        return post("classify/create_category_filter", params, callback);
    };

    // Lightweight API module.
    api.basic = {};

    /**
     * Returns an array of similar terms for a given text.
     *
     * @param text the text to retrieve similar terms for.
     * @param callback an optional callback function to apply to the returned similar terms.
     * @returns {*}
     */
    api.basic.getSimilarTerms = function (text, callback) {
        callback = wrapCallback(callback, extractSimilarTerms);
        var response = api.core.getSimilarTermsForExpression({retina_name: retina, body: {text: text}}, callback);
        return extractSimilarTerms(response);
    };

    /**
     * Returns an array of keywords for a given text.
     *
     * @param text the text to retrieve keywords from.
     * @param callback an optional callback function to apply to the returned keywords.
     * @returns {*}
     */
    api.basic.getKeywords = function (text, callback) {
        return api.core.getKeywordsForText({retina_name: retina, body: text}, callback)
    };

    /**
     * Returns a Fingerprint representation for a given text.
     *
     * @param text the text to compute a Fingerprint for.
     * @param callback an optional callback function to apply to the returned Fingerprint.
     * @returns {*}
     */
    api.basic.getFingerprint = function (text, callback) {
        callback = wrapCallback(callback, extractPositions);
        var response = api.core.getFingerprintForText({retina_name: retina, body: text}, callback);
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
    api.basic.compare = function (object1, object2, callback) {

        callback = wrapCallback(callback, extractCosineSimilarity);
        var response;

        if (typeof object1 === "string" && typeof object2 === "string") {
            response = api.core.compare({
                retina_name: "en_associative", body: [{text: object1}, {text: object2}]
            }, callback);
        } else if (typeof object1 === "object" && typeof object2 === "object") {
            response = api.core.compare({
                retina_name: "en_associative", body: [{positions: object1}, {positions: object2}]
            }, callback);
        } else if (typeof object1 === "string" && typeof object2 === "object") {
            response = api.core.compare({
                retina_name: "en_associative", body: [{text: object1}, {positions: object2}]
            }, callback);
        } else if (typeof object1 === "object" && typeof object2 === "string") {
            response = api.core.compare({
                retina_name: "en_associative", body: [{positions: object1}, {text: object2}]
            }, callback);
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

    return api;

});