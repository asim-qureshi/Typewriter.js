(function ($, window, document, undefined) {

	'use strict';

	var Typed = {

		init: function (config, element) {
			var i;
			config = typeof (config) !== 'object' ? {} : config;
			this.elem = $(element).css('white-space', 'pre'); //preserve whitespace
			this.sentences = [];
			if (config.sentences) {
				for (i = 0; i < config.sentences.length; i++) {
					this.sentences[i] = config.sentences[i].split('');
				}
			} else {
				this.sentences.push(this.elem.text());
			}
			this.lineSpeed = config.lineSpeed || 1000;
			this.typeSpeed = config.typeSpeed || 100;
			this.backSpeed = config.backSpeed || 50;
			this.removeCursor = config.removeCursor || false;
			this.loop = config.loop || false;
			this.lines = {};
			this.limit = this.sentences.length;
			this.setLines();
			this.typing();
		},

		setLines: function () {
			var i,
			    x,
			    typeLine;
			this.elem.empty().hide();
			for (i = 0; i < this.sentences.length; i++) {
				typeLine = '';
				for (x = 0; x < this.sentences[i].length; x++) {
					this.sentences[i][x] = this.sentences[i][x].replace(/\s/g, '&nbsp;');
					typeLine += '<span class="type_letter">' + this.sentences[i][x] + '</span>';
				}
				this.lines[i] = typeLine + '<span class="cursor">|</span>';
			}
		},

		typing: function (index) {
			index = !index ? 0 : index;
			this.elem.empty()
				.append(this.lines[index])
				.find('.type_letter').hide()
				.end()
				.show()
				.find('.cursor').show();
			this.reveal(index);
		},

		reveal: function (index) {
			var self = this,
				sentenceLength = this.sentences[index].length,
				pause = this.typeSpeed,
				i;
			
			for (i = 0; i < this.sentences[index].length; i++) {
				this.elem.find('.type_letter:nth-child(' + (i + 1) + ')').delay((i + 1) * pause).show(10);
			}
			
			setTimeout(function () {
				self.deleteText(index);
			}, sentenceLength * pause + self.lineSpeed);
		},

		deleteText: function (index) {
			if (index + 1 < this.limit) {
				this.backspace(index);
			} else {
				this.endType();
			}
		},
		
		backspace: function (index) {
			var self = this,
			    slot = index === 'loop' ? this.sentences.length - 1 : index,
			    reverse = this.sentences[slot].length,
			    pause = this.backSpeed,
			    relayDelay = (reverse * this.backSpeed) + this.lineSpeed,
			    i;
			for (i = 0; i < this.sentences[slot].length; i++) {
				this.elem.find('.type_letter:nth-child(' + reverse + ')').delay((i + 1) * pause).fadeOut(10);
				reverse -= 1;
			}
			setTimeout(function () {
				if (index === 'loop') {
					self.typing();
				} else {
					self.typing(index + 1);
				}
			}, relayDelay);
		},

		endType: function () {
			if (this.loop) {
				this.backspace('loop');
			} else if (this.removeCursor) {
				this.elem.find('.cursor').hide();
			}
		}

	};

	$.fn.Typewrite = function (config) {
		return this.each(function () {
			var typed = Object.create(Typed);
			typed.init(config, this);
		});
	};

}($, window, document));
