exports.Configuration = {

    models: {
        cat: "model/cat/Creature.json",
        penguin: "model/penguin/penguin.json",
        toilet: "model/toilet/toilet.json"
    },

    templates: {
        html: 'ui/style-comparator.reel/templates/html-template.html',
        sceneHtml: 'ui/style-comparator.reel/templates/html-scene-template.html',
        css: 'ui/style-comparator.reel/templates/css-template.meta',
        javascript: 'ui/style-comparator.reel/templates/javascript-template.meta'
    },

    serializationScript: "text/montage-serialization"

};