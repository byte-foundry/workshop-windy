(function(p) {

plumin.paper.setup();

window.fetch('Infini-Bold.otf')
	.then(function( response ) {
		return response.arrayBuffer();
	}).then(function( buffer ) {

		window.fetch('http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent( document.querySelector('#location').value ) + '&APPID=985f2c49c5b4903e8a69c91786eb51be')
			.then(function(response) {
				return response.json();
			}).then(function(data) {

				var otFont = plumin.opentype.parse( buffer ),
					font = new plumin.paper.Font(),
					step = 30;

				// save default encoding
				var encoding = font.ot.encoding;
				font.importOT( otFont );
				font.ot.familyName = 'Infini-wind';
				font.ot.encoding = encoding;

				font.glyphs.forEach(function( glyph ) {
					glyph.contours.forEach(function( contour, i ) {
						contour.curves.slice(0).forEach(function( curve, j ) {
							var length = curve.length,
								rest = curve,
								first,
								curr;

							if ( curve.length < step ) {
								return true;
							}

							while ( rest ) {
								rest = rest.divide( step );
							}
						});

						contour.segments.forEach(function( segment, i ) {
							segment.handleIn.x = 0;
							segment.handleIn.y = 0;
							segment.handleOut.x = 0;
							segment.handleOut.y = 0;

							if ( i % 2 !== 0 ) {
								return;
							}

							segment.transform(
								new p.Matrix(1, 0, 0, 1, Math.random() * 50, 0)
							);
						});
					});

				});

				// initial font
				font.updateOTCommands();
				font.addToFonts();
					// .download();
			});
	});

})(plumin);
