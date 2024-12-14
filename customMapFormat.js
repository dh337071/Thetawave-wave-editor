var customMapFormat = {
    name: "Thetawave wave file",
    extension: "ron",

    write: function(map, fileName) {
        var m = {
            width: map.width,
            height: map.height,
            objects: ""
        };

        for (var i = 0; i < map.layerCount; ++i) {
            var layer = map.layerAt(i);
            if (layer.isObjectLayer) {
                var mapString = "";
                mapString = mapString.concat("(\n\tformation_spawnables: [ \n")
                for (y = 0; y < layer.objectCount; ++y) {
                    mapObject = layer.objectAt(y);
                    mapString = mapString.concat("\t\t( \n ")
                    mapString = mapString.concat("\t\t\tspawnable_type: ")
                    mapString = mapString.concat(mapObject.resolvedProperty("enemy_type"));
                    mapString = mapString.concat(",\n\t\t\tposition: (");
                    mapString = mapString.concat(mapObject.x - 640);
                    mapString = mapString.concat(", ");
                    mapString = mapString.concat(mapObject.y - 400);
                    mapString = mapString.concat("), \n\t\t),\n");
                }
                mapString = mapString.concat("\n\t],\n");
                m.objects = m.objects.concat(mapString);
            }
        }

        var file = new TextFile(fileName, TextFile.WriteOnly);
        file.write(m.objects);
        file.commit();
    },
}

tiled.registerMapFormat("ron", customMapFormat)
