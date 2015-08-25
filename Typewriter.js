(function ($, window, document, undefined) {

	'use strict';

	var Typed = {

		init: function (config, element) {

			config ? config = config : config  = {};

			this.elem = $(element).css('white-space', 'pre'); //preserve whitespace when grabbing DOM element text
			this.sentences = [];

			if (config && config.sentences) {				
				for (var i = 0; i < config.sentences.length; i++) {
					this.sentences[i] = config.sentences[i].split('');
				}
			} else {	
				this.sentences.push(this.elem.text());
			};	

			this.deleteSpeed = config.deleteSpeed || 1000; //delay between sentence writing to deleting
			this.typeSpeed = config.typeSpeed || 100; //speed at which each individual letter is typed in
			this.backSpeed = config.backSpeed || 50; //speed at which each individual letter is deleted
			this.handler = config.handler || this.typing; //trigger function as config.handler, or autotrigger if not passed
			this.removeCursor = config.removeCursor || false; //option to hide the cursor after finishing typing
			this.lines = {};
			this.limit = this.sentences.length;
			this.setLines();
			this.handler();
		},


		setLines: function () {
			this.elem.empty().hide();
			for (var i = 0; i < this.sentences.length; i++) {
				var typeLine = '';
				for (var x = 0; x < this.sentences[i].length; x++) {
					this.sentences[i][x] = this.sentences[i][x].replace(/\s/g, '&nbsp;');
					typeLine += '<span class="type_letter">' + this.sentences[i][x] + '</span>';
				};
				this.lines[i] = typeLine + '<span class="cursor">|</span>';
			};
		},


		typing: function( index ) {
			index ? index = index : index = 0;

			this.elem.empty()
				.append(this.lines[index])
				.find('.type_letter').hide()
				.end()
				.show()
				.find('.cursor').show();
			this.reveal( index );
		},


		reveal: function( index ) {
			var sentenceLength = this.sentences[index].length,
				delay = this.typeSpeed,
				self = this;
			for ( var i = 0; i < this.sentences[index].length; i++ ) {
				var x = i + 1;
				this.elem.find('.type_letter:nth-child(' + (x) +')').delay(x * delay).show(10);
			}; 
			setTimeout(function() {
				self.deleteText( index );
			}, 2000);
		},


		deleteText: function( index ) {
			var self = this;
			if (index + 1 < this.limit) {
				setTimeout(function() {
					self.backspace(index);	
				}, 1000)

			} else {
				this.endType();
			};
		},


		backspace: function( index ) {
			var reverse = this.sentences[index].length,
				pause = this.backSpeed,
				relayDelay = reverse * 150 + 1000,
				self = this;
			for ( var i = 0; i < this.sentences[index].length; i++ ) {
					var coefPause = (i + 1) * pause;
					this.elem.find('.type_letter:nth-child(' + reverse + ')').delay(coefPause).fadeOut(10);
					reverse = reverse - 1;
			};
			setTimeout(function() {
				self.typing( index + 1 );
			}, relayDelay);
		},


		endType: function() {
			if (this.removeCursor) {
				this.elem.find('.cursor').hide();
			};
		}

	};

	$.fn.Typewrite = function(config) {
		return this.each(function() {
			var typed = Object.create( Typed );
			typed.init( config, this );
		});
	};

}($, window, document));
