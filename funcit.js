steal
	.plugins('funcunit')
	.then(function(){
		// leave this empty to force funcunit
	})
	.plugins('steal/less')
	.then(function($){
		steal.less('funcit')
	})
	.plugins(
		'mxui/filler',
		'mxui/tabs',
		'funcit/app',
		'funcit/editor',
		'funcit/grow',
		'funcit/commands',
		'funcit/testbuttons',
		'funcit/runner',
		'funcit/list_attributes',
		'jquery/view/ejs')
	.then(function(){
	
	$(document.body).append("//funcit/views/app", {})
	
	var editor,
			first = false;
	
	$('#app').mxui_filler({parent: document.body})
		.funcit_app().bind("addEvent", function(ev, type, data, el){
			
		// run this here so we can include the URL in the module name
		if(!first){
			
			$('#funcit').show();
			editor = $('#editor').funcit_editor();
			$("#test").funcit_testbuttons();
			$("#commands").funcit_commands();
			$('.controls_overlay').funcit_selectel();
			$("#tabs").mxui_tabs();
			$("#results").funcit_results();
			
			editor.funcit_editor('val',"//funcit/views/init.ejs",{
				module : data,
				test : "change me!"
			})
			
			editor.trigger("keyup")
			$(window).trigger("resize");
			first = true;
		}
		
		
		editor.funcit_editor.apply(editor,["addEvent"].concat( $.makeArray(arguments) ))
	});
});