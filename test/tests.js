var cortical = new RetinaApiClient(apiKey);

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

QUnit.asyncTest("testGetRetinas", function (assert) {
    assert.expect(1);

    var callback = function (data) {
        // assert.equal(counter, 1);
        QUnit.start();
    };

    cortical.core.getRetinas(null, callback);
});