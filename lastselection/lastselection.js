steal.plugins('jquery/controller',
	'jquery/dom/selection',
	'funcit/rowheight').then(function($){

/**
 * Keeps the last selected text for a textarea.
 */
$.Controller("Lastselection",{
	init : function(){
		var pre = $("<pre><span>W</span></pre>").appendTo(this.element.parent());
		console.log(this.element.rowheight())
		this.dims = {
			height: this.element.rowheight(),
			width : pre.find('span').width()
		}
		this.cursor = 
		$('<div class="selection-cursor"/>')
			.css({position: 'absolute'})
			
			.appendTo(this.element.parent())
			.width( this.dims.width )
			.click(this.callback('cursorClick'))
			.height( this.dims.height ).hide();
			
		this.highlightBox = 
		$('<div class="selection-highlight"/>')
			.css({position: 'absolute'})
			
			.appendTo(this.element.parent())
			.height( this.dims.height ).hide();
			
		pre.remove();
		this.padding = {
			top: parseInt(this.element.css('padding-top'), 10),
			left: parseInt(this.element.css('padding-left'), 10)
		}
	},
	cursorClick: function(ev){
		this.element[0].focus();
	},
	update : function(options){
		if(!this.focused){
			this.last = options;
			var loc = $.fn.rowheight.lineLoc(this.element.val(), this.last.start);
			this.updateCursor(loc);
		}
	},
	/**
	 * Update the cursor with the given location
	 * @param {Object} loc some object like {line: 3, from: 4}
	 */
	updateCursor: function(loc){
		var off = this.element.offset();

		this.cursor.show().offset({
			top : off.top+this.padding.top+(loc.line - 1)*this.dims.height,
			left : off.left+this.padding.left+(loc.from - 1)*this.dims.width
		})
	},
	/**
	 * 
	 * @param {Object} start some object like {line: 3, from: 4}
	 * @param {Object} end some object like {line: 3, from: 4}
	 */
	highlight : function(start, end){
		var off = this.element.offset();
		
		// single line highlight
		if(start.line == end.line){
			var width = (end.from - start.from)*this.dims.width,
				line = start.line;
		}

		this.highlightBox.show()
			.width(width)
			.offset({
				top : off.top+this.padding.top+(line- 1)*this.dims.height,
				left : off.left+this.padding.left+(start.from - 1)*this.dims.width
			})
	},
	"mouseenter": function(){
		this.hideHighlight();
	},
	
	hideHighlight: function(){
		this.highlightBox.hide();
	},
	
	"focusin" : function(){
		this.focused = true;
		this.last = null;
		this.cursor.hide();
		this.hideHighlight();
	},
	"focusout" : function(){
		this.focused = false;
		this.update(this.element.selection());
	},
	val : function(){
		return this.last || this.element.selection();
	}
})

});