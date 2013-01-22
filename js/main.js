require(["simplex", "canvas"], function(Simplex, Canvas) {
	Canvas.size(800, 600);
	
	function makeMap(w, h, res, lvl) {
        var map = [];            
        Simplex.reseed();
        for(var x = 0; x < w; x++) {
            map[x] = [];
            for(var y = 0; y < h; y++) {
                map[x][y] = parseInt((((Simplex.noise(x / res, y / res) + 1 )/ 2)  * lvl), 10);
            }
        }
        return map;		
	}

	
	function generateLayers(size, map, count) {
		var layers = [];
		for(var i = 0; i < count; i++) {
			layers.push(Canvas.clone(true));
		}

		var scale = { X: size.width / map.length, Y: size.height / map[0].length };
		var imageData = layers[0].imageData();
		for(var x = 0; x < map.length; x++) {
			for(var y = 0; y < map[0].length; y++) {
				var red = x * 4 + (size.width * 4) * y,
					green = red + 1,
					blue = green + 1,
					alpha = blue + 1;
				imageData.data[red] = map[x][y] * (255 / lvl);
				imageData.data[green] = map[x][y] * (255 / lvl);
				imageData.data[blue] = map[x][y] * (255 / lvl);
				imageData.data[alpha] = 255;
			}
		}
		layers[0].imageData(imageData);
		return layers[0].element;
	}

	var lvl = 6;
	var map = makeMap(800, 600, 400, lvl);
	var image = generateLayers(Canvas.size(), map, lvl);
	Canvas.context.drawImage(image, 0, 0);
});