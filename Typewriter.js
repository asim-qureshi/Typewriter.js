(function ($, window, document, undefined) {

	'use strict';

	var Typed = {

		init: function (config, element) {
			config = typeof (config) !== 'object' ? {} : config;
			this.elem = $(element).css({'white-space': 'pre', 'word-wrap': 'normal'}); //preserve whitespace
			this.sentences = config.sentences || [this.elem.text()];
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
			var typeLine,
			    typeWord,
			    space = '<span class="type_letter">&nbsp;</span>';
			
			for (var i = 0; i < this.sentences.length; i++) {
				typeLine = '';
				this.sentences[i] = this.sentences[i].split(' ');
				for (var j = 0; j < this.sentences[i].length; j++) {
					typeWord = '<span class="type_word" style="display:inline-block">';
					for (var k = 0; k < this.sentences[i][j].length; k++) {
						typeWord += "<span class='type_letter'>" + this.sentences[i][j][k] + "</span>";
					}
					typeWord += j < this.sentences[i].length - 1 ? space + '</span>' : '</span>';
					typeLine += typeWord;
					
				}
				this.lines[i] = typeLine + '<span class="cursor" style="postion:absolute">|</span>';
			}
		},
						 				 
		typing: function (index) {
			index = !index ? 0 : index;
			this.elem.css('white-space', 'normal').empty()
				.append(this.lines[index])
				.find('span.type_letter').hide()
				.end()
				.show()
				.find('span.cursor').show();
			this.reveal(index);
		},

		reveal: function (index) {
			var letterCount = this.lines[index].length,
			    pause = this.typeSpeed,
			    queue = 0,
			    word;
			
			for (var i = 0; i < this.sentences[index].length; i++) {
				word = this.elem.find('span.type_word:nth-child(' + (i + 1) + ' )');
				for (var j = 0; j < this.sentences[index][i].length + 1; j++) {
					word.find('span.type_letter:nth-child(' + (j + 1) + ')')
							.delay(((j + 1) * pause) + queue).show(10);
				}
				queue += this.sentences[index][i].length * pause;
			}
			this.deleteText(index, queue + this.lineSpeed);
		},

		deleteText: function (index, delay) {
			var self = this;
			setTimeout(function () {
			index + 1 < self.limit ? self.backspace(index) : self.endType();
			}, delay);
		},
		
		backspace: function (index) {
			
			var self = this,
			    slot = index === 'loop' ? this.sentences.length - 1 : index,
			    reverse = this.sentences[slot].length,
			    pause = this.backSpeed,
			    relayDelay = (reverse * this.backSpeed) + this.lineSpeed,
			    word,
			    queue = 0;
			
			for (var i = reverse; i > 0; i--) {
				word = this.elem.find('span.type_word:nth-child(' + i + ')');
				for (var j = this.sentences[slot][i - 1].length + 1, k = 1; j > 0; j--, k++) {
					word.find('span.type_letter:nth-child(' + j + ')')
						.delay((k * pause) + queue).fadeOut(10);
				}
				queue += this.sentences[slot][i - 1].length * pause;
				word.delay(queue).fadeOut(10);
			}
			
			setTimeout(function () {
				index === 'loop' ? self.typing() : self.typing(index + 1);
			}, relayDelay + queue);
		},

		endType: function () {
			if (this.loop) {
				this.backspace('loop');
			} else if (this.removeCursor) {
				this.elem.find('span.cursor').hide();
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
