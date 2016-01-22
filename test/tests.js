/**
 * Instance of the RetinaApiClient to test.
 * @type {RetinaApiClient}
 */
var cortical = new Cortical.CoreClient(apiKey);

/**
 * Retina name to use for tests.
 * @type {string}
 */
var defaultRetina = "en_associative";

/**
 * Simple expression used for testing expression endpoints.
 * @type {{sub: *[]}}
 */
var exampleExpression1 = {
    "sub": [{
        "term": "jaguar"
    }, {
        "positions": [2, 3, 4, 5, 6]
    }]
};

/**
 * Simple expression used for testing expression endpoints.
 */
var exampleExpression2 = {"term": "Pablo Picasso"};

/**
 * Example texts to use during tests.
 */
var texts = {};

texts["Vienna"] = "Vienna is the capital and largest city of Austria, and one of the nine states of Austria. Vienna" +
    " is Austria's primary city, with a population of about 1.8 million (2.6 million within the metropolitan area," +
    " nearly one third of Austria's population), and its cultural, economic, and political centre. It is the" +
    " 7th-largest city by population within city limits in the European Union.";

texts["Tokyo"] = "Tokyo, officially Tokyo Metropolis, is one of the 47 prefectures of Japan, and is both the capital" +
    " and largest city of Japan. The Greater Tokyo Area is the most populous metropolitan area in the world. It is" +
    " the seat of the Emperor of Japan and the Japanese government. Tokyo is in the Kantō region on the southeastern" +
    " side of the main island Honshu and includes the Izu Islands and Ogasawara Islands. Formerly known as Edo, it" +
    " has been the de facto seat of government since 1603 when Shogun Tokugawa Ieyasu made the city his" +
    " headquarters. It officially became the capital after Emperor Meiji moved his seat to the city from the old" +
    " capital of Kyoto in 1868; at that time Edo was renamed Tokyo.";

texts["SanFrancisco"] = "San Francisco, officially the City and County of San Francisco, is the cultural," +
    " commercial, and financial center of Northern California and the only consolidated city-county in California." +
    " San Francisco is the fourth-most populous city in California, after Los Angeles, San Diego and San Jose, and" +
    " the 13th-most populous city in the United States — with a Census-estimated 2014 population of 852,469. The" +
    " city and its surrounding areas are known as the San Francisco Bay Area, and are a part of the larger OMB" +
    " designated San Jose-San Francisco-Oakland combined statistical area, the fifth most populous in the nation" +
    " with an estimated population of 8.6 million.";

texts["Neuron"] = "A neuron is an electrically excitable cell that processes and transmits information through" +
    " electrical and chemical signals. These signals between neurons occur via synapses, specialized connections" +
    " with other cells. Neurons can connect to each other to form neural networks. Neurons are the core components" +
    " of the brain and spinal cord of the central nervous system (CNS), and of the ganglia of the peripheral nervous" +
    " system (PNS). Specialized types of neurons include: sensory neurons which respond to touch, sound, light and" +
    " all other stimuli affecting the cells of the sensory organs that then send signals to the spinal cord and" +
    " brain, motor neurons that receive signals from the brain and spinal cord to cause muscle contractions and" +
    " affect glandular outputs, and interneurons which connect neurons to other neurons within the same region of" +
    " the brain, or spinal cord in neural networks.";

texts["Synapse"] = "Chemical synapses are biological junctions through which neurons signal to each other and to" +
    " non-neuronal cells such as those in muscles or glands. Chemical synapses allow neurons to form circuits within" +
    " the central nervous system. They are crucial to the biological computations that underlie perception and" +
    " thought. They allow the nervous system to connect to and control other systems of the body.";

texts["Neocortex"] = "The neocortex (Latin for \"new bark\" or \"new rind\"), also called the neopallium (\"new" +
    " mantle\") and isocortex (\"equal rind\"), is a part of the mammalian brain. In the human brain, it is the" +
    " largest part of the cerebral cortex which covers the two cerebral hemispheres, with the allocortex making up" +
    " the rest. The neocortex is made up of six layers, labelled from the outer in, I to VI. In humans, the" +
    " neocortex is involved in higher functions such as sensory perception, generation of motor commands, spatial" +
    " reasoning, conscious thought and language.";

texts["ISS"] = "The International Space Station (ISS) is a space station, or a habitable artificial satellite, in" +
    " low Earth orbit. Its first component launched into orbit in 1998, and the ISS is now the largest artificial" +
    " body in orbit and can often be seen with the naked eye from Earth. The ISS consists of pressurised modules," +
    " external trusses, solar arrays, and other components. ISS components have been launched by Russian Proton and" +
    " Soyuz rockets as well as American Space Shuttles.";

texts["Mir"] = "Mir was a space station that operated in low Earth orbit from 1986 to 2001, owned by the Soviet" +
    " Union and later by Russia. Mir was the first modular space station and was assembled in orbit from 1986 to" +
    " 1996. It had a greater mass than any previous spacecraft. Until 21 March 2001 it was the largest artificial" +
    " satellite in orbit, succeeded by the International Space Station after Mir's orbit decayed. The station served" +
    " as a microgravity research laboratory in which crews conducted experiments in biology, human biology, physics," +
    " astronomy, meteorology and spacecraft systems with a goal of developing technologies required for permanent" +
    " occupation of space.";

texts["Skylab"] = "Skylab was a space station launched and operated by NASA and was the United States' first space" +
    " station. Skylab orbited Earth from 1973 to 1979, and included a workshop, a solar observatory, and other" +
    " systems. It was launched unmanned by a modified Saturn V rocket, with a weight of 169,950 pounds (77 t). Three" +
    " manned missions to the station, conducted between 1973 and 1974 using the Apollo Command/Service Module (CSM)" +
    " atop the smaller Saturn IB, each delivered a three-astronaut crew. On the last two manned missions, an" +
    " additional Apollo / Saturn IB stood by ready to rescue the crew in orbit if it was needed.";

/**
 * Tests retrieving Retinas.
 */
QUnit.asyncTest("testGetRetinas", function (assert) {
    assert.expect(1);

    var callback = function (retinas) {
        assert.ok(retinas.length > 1, "Return multiple Retinas.");
        QUnit.start();
    };

    cortical.getRetinas(callback);
});

/**
 * Tests retrieving a specific Retina.
 */
QUnit.asyncTest("testGetSpecificRetina", function (assert) {
    assert.expect(1);

    var callback = function (retinas) {
        assert.equal(retinas[0].retinaName, defaultRetina, "Return specific Retina.");
        QUnit.start();
    };

    cortical.getRetinas({retina_name: defaultRetina}, callback);
});

QUnit.asyncTest("testGetTerms", function (assert) {
    assert.expect(1);

    var callback = function (terms) {
        assert.ok(terms.length > 1, "Return multiple terms.");
        QUnit.start();
    };

    cortical.getTerms(callback);
});

QUnit.asyncTest("testGetTermInfo", function (assert) {
    assert.expect(1);

    var termString = "test";

    var callback = function (term) {
        assert.equal(term[0].term, termString, "Return specific term.");
        QUnit.start();
    };

    cortical.getTerms(termString, callback);
});

QUnit.asyncTest("testGetTermsWithParams", function (assert) {
    assert.expect(1);

    var termString = "abc*";
    var length = 20;

    var callback = function (terms) {
        assert.ok(terms.length == length, "Return fixed number of terms.");
        QUnit.start();
    };

    cortical.getTerms({term: termString, start_index: 0, max_results: length}, callback);
});

QUnit.asyncTest("testGetContextsForTerm", function (assert) {
    assert.expect(2);

    var termString = "test";

    var callback = function (contexts) {
        assert.ok(contexts.length > 1, "Return multiple contexts.");
        assert.ok(typeof contexts[0].context_id != 'undefined', "Contexts has an ID.");
        QUnit.start();
    };

    cortical.getContextsForTerm(termString, callback);
});

QUnit.asyncTest("testGetContextsForTermWithFingerprints", function (assert) {
    assert.expect(1);

    var termString = "test";

    var callback = function (contexts) {
        assert.ok(contexts[0].fingerprint.positions.length > 1, "Contexts contain fingerprints.");
        QUnit.start();
    };

    cortical.getContextsForTerm({term: termString, get_fingerprint: true}, callback);
});

QUnit.asyncTest("testGetSimilarTermsForTerm", function (assert) {
    assert.expect(2);

    var termString = "test";

    var callback = function (similarTerms) {
        assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
        assert.equal(similarTerms[0].term, termString, "Most similar term is query term.");
        QUnit.start();
    };

    cortical.getSimilarTermsForTerm({term: termString, get_fingerprint: true}, callback);
});

QUnit.asyncTest("testGetFingerprintForText", function (assert) {
    assert.expect(1);

    var callback = function (fingerprint) {
        assert.ok(fingerprint[0].positions.length > 1, "Return fingerprint.");
        QUnit.start();
    };

    cortical.getFingerprintForText(texts["Vienna"], callback);
});

QUnit.asyncTest("testGetTokensForText", function (assert) {
    assert.expect(1);

    var callback = function (tokens) {
        assert.ok(tokens.length > 1, "Return tokens.");
        QUnit.start();
    };

    cortical.getTokensForText(texts["Vienna"], callback);
});

QUnit.asyncTest("testGetTokensForTextWithPOSFilter", function (assert) {
    assert.expect(1);

    var callback = function (tokens) {
        assert.ok(tokens[0].length < 20, "Return reduced tokens.");
        QUnit.start();
    };

    cortical.getTokensForText({body: texts["Vienna"], POStags: "NN"}, callback);
});

QUnit.asyncTest("testGetSlicesForText", function (assert) {
    assert.expect(3);

    var callback = function (slices) {
        assert.ok(slices.length > 1, "Return multiple slices.");
        assert.ok(slices[0].text.indexOf("synapse") > -1, "First slice contains synapse text");
        assert.ok(slices[1].text.indexOf("Skylab") > -1, "Second slice contains Skylab text");
        QUnit.start();
    };

    cortical.getSlicesForText(texts["Synapse"] + texts["Skylab"], callback);
});

QUnit.asyncTest("testGetFingerprintsForTexts", function (assert) {
    assert.expect(3);

    var callback = function (fingerprints) {
        assert.ok(fingerprints.length > 1, "Return multiple fingerprints.");
        assert.ok(fingerprints[0].positions.length > 1, "Fingerprint 1 contains positions.");
        assert.ok(fingerprints[1].positions.length > 1, "Fingerprint 2 contains positions.");
        QUnit.start();
    };

    cortical.getFingerprintsForTexts([texts["Synapse"], texts["Skylab"]], callback);
});

QUnit.asyncTest("testGetLanguageForTexts", function (assert) {
    assert.expect(1);

    var callback = function (language) {
        assert.ok(language.iso_tag == "en", "Return correct language.");
        QUnit.start();
    };

    cortical.getLanguageForText(texts["Synapse"], callback);
});

QUnit.asyncTest("testGetFingerprintForExpression", function (assert) {
    assert.expect(1);

    var callback = function (fingerprint) {
        assert.ok(fingerprint.positions.length > 1, "Fingerprint contains positions.");
        QUnit.start();
    };

    cortical.getFingerprintForExpression(exampleExpression1, callback);
});

QUnit.asyncTest("testGetContextsForExpression", function (assert) {
    assert.expect(2);

    var callback = function (contexts) {
        assert.ok(contexts.length > 1, "Return multiple contexts.");
        assert.ok(typeof contexts[0].context_id != 'undefined', "Contexts has an ID.");
        QUnit.start();
    };

    cortical.getContextsForExpression(exampleExpression1, callback);
});

QUnit.asyncTest("testGetSimilarTermsForExpression", function (assert) {
    assert.expect(2);

    var callback = function (similarTerms) {
        assert.ok(similarTerms.length > 1, "Return multiple similar terms.");
        assert.ok(typeof similarTerms[0].term == 'string', "Similar term contains a term field.");
        QUnit.start();
    };

    cortical.getSimilarTermsForExpression(exampleExpression1, callback);
});

QUnit.asyncTest("testGetFingerprintsForExpressions", function (assert) {
    assert.expect(3);

    var callback = function (fingerprints) {
        assert.ok(fingerprints.length > 1, "Return multiple fingerprints.");
        assert.ok(fingerprints[0].positions.length > 1, "Fingerprint 1 contains positions.");
        assert.ok(fingerprints[1].positions.length > 1, "Fingerprint 2 contains positions.");
        QUnit.start();
    };

    cortical.getFingerprintsForExpressions([exampleExpression1, exampleExpression1], callback);
});

QUnit.asyncTest("testGetContextsForExpressions", function (assert) {
    assert.expect(2);

    var callback = function (contextLists) {
        assert.ok(contextLists.length > 1, "Return multiple contexts.");
        assert.ok(typeof contextLists[0][0].context_id != 'undefined', "Contexts has an ID.");
        QUnit.start();
    };

    cortical.getContextsForExpressions([exampleExpression1, exampleExpression1], callback);
});

QUnit.asyncTest("testGetSimilarTermsForExpressions", function (assert) {
    assert.expect(2);

    var callback = function (similarTermsLists) {
        assert.ok(similarTermsLists.length > 1, "Return multiple similar terms.");
        assert.ok(typeof similarTermsLists[0][0].term == 'string', "Similar term contains a term field.");
        QUnit.start();
    };

    cortical.getSimilarTermsForExpressions([exampleExpression1, exampleExpression1], callback);
});

QUnit.asyncTest("testCompare", function (assert) {
    assert.expect(1);

    var callback = function (comparisonMetric) {
        assert.ok(comparisonMetric.cosineSimilarity > 0.1, "Return valid cosine similarity");
        QUnit.start();
    };

    cortical.compare([{text: texts["Synapse"]}, {text: texts["Skylab"]}], callback);
});

QUnit.asyncTest("testCompareBulk", function (assert) {
    assert.expect(1);

    var callback = function (comparisonMetrics) {
        var cosine1 = comparisonMetrics[0].cosineSimilarity;
        var cosine2 = comparisonMetrics[1].cosineSimilarity;
        assert.ok(cosine1 > cosine2, "Return valid cosine similarities");
        QUnit.start();
    };

    var comparison1 = [{text: texts["Synapse"]}, {text: texts["Skylab"]}];
    var comparison2 = [{text: texts["Mir"]}, {text: texts["Skylab"]}];

    cortical.compareBulk([comparison1, comparison2], callback);
});

QUnit.asyncTest("testImage", function (assert) {
    assert.expect(1);

    var callback = function (image) {
        debugger;
        QUnit.start();
    };

    cortical.getImage({body: {text: "test"}, retina_name: "en_associative", "image_scalar": "2", plot_shape: "circle", image_encoding: "base64/png", sparsity: "1.0"}, callback);
});

// TODO api.core.getImage

// TODO api.core.getImages

// TODO api.core.compareImage

// TODO api.core.createCategoryFilter

// TODO api.basic.getSimilarTerms

// TODO api.basic.getKeywords

// TODO api.basic.getFingerprint

// TODO api.basic.compare