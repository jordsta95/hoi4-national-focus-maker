$(document).ready(function(){

	/**
	===
		Open/Close Function
	==
	**/
	//Pass
	// args: 'name', '#'/'.'/''
	function openClose(elem, selector){
		elem_string = elem;
		if(elem_string.indexOf("-close") > -1){
			elem_string = elem_string.replace('-close', '');
			elem = $(selector+elem_string);
			elem.slideUp();
		}else{
			if(elem_string.indexOf("-open") > -1){
				elem_string = elem_string.replace('-open', '');
				elem = $(selector+elem_string);
				elem.slideDown();
			}
		}
	}
	//Classes

	//IDs
	$('.open-closeable').on('click', function(){
		var id = $(this).attr('id');
		openClose(id,'#');
	})

	//Edit GFX
	$("#open-gfx").click(function(){
		$("#choosegfx").toggle();	
	});

	//Close stuff
	$("#close-selector").click(function(){
		$("#selectfocusarea").hide();
	});
	
	$(document).on('click', "#close-pw", function() {
		$( "#display-password" ).hide();
	});

	$("#available").click(function(){
		if($("#predictive_available").prop("checked") == false){
			$("#builder").show();
			$("#submit-build").attr("build","available");
		}
	});
	$("#bypass").click(function(){
		if($("#predictive_bypass").prop("checked") == false){
			$("#builder").show();
			$("#submit-build").attr("build","bypass");
		}
	});
	$("#reward").click(function(){
		if($("#predictive_reward").prop("checked") == false){
			$("#builder").show();
			$("#submit-build").attr("build","reward");
		}
	});
	
	//JSON
	$('#searchjson').keyup(function(){
		var searchField = $('#searchjson').val();
		var regex = new RegExp(searchField, "i");
		var count = 1;
		var output = "";
		$.getJSON("output.json", function(data) {
			$.each(data, function(key, val){
				if ((val.description.search(regex) != -1)) {
			 		output += '<p class="build-description" id="'+val.id+'" tag="'+val.uses_tag+'" state="'+val.uses_state+'" >'+val.description+'</p>';
					output += '<div class="default-outcome" id="'+val.id+'_defaultoutcome">'+val.default_outcome+'</div>';
					output += '<div class="build-hover" id="'+val.id+'_hover">'+val.example+'</div>';
				}
			});
			$('#searchoutput').html(output);
		}); 
	});
	
	$(document).on('click', ".build-description", function() {
		var buildid = $(this).attr("id");
		$("#"+buildid+"_hover").toggle();
	});
	
	$(document).on('click', ".build-hover", function() {
		var id = $(this).attr("id").replace("_hover","");
		if($("#"+id).attr("tag") == "yes"){
				$("#tag-box").show();
		}
		if($("#"+id).attr("state") == "yes"){
				$("#state-box").show();
		}
		if($("#"+id+"_defaultoutcome").attr("iscustom") !== "yes"){
			if($("#"+id+"_defaultoutcome").text() == "new-level"){
				$(".current-build-add-location").removeClass("current-build-add-location").append(id+' = {<br><div class="current-build-add-location"></div><br>}');
			}else{
				$(".current-build-add-location").append(id+'<textarea id="add-build">'+$("#"+id+"_defaultoutcome").text()+'</textarea>');
			}
		}else{
			$(".current-build-add-location").append('<textarea id="add-build">'+$("#"+id+"_defaultoutcome").text()+'</textarea>');
		}
		$("#submit-build").show();
	});
	
	//TAG search
	$('#searchtags').keyup(function(){
		var searchField = $('#searchtags').val();
		var regex = new RegExp(searchField, "i");
		var count = 1;
		var output = "";
		$.getJSON("tags.json", function(data) {
			$.each(data, function(key, val){
				if ((val.country.search(regex) != -1) || (val.tag.search(regex) != -1)) {
			 		output += '<p id="'+val.tag+'" class="searched_tags">'+val.country+'</p>';
				}
			});
			$('#tagsearchoutput').html(output);
		}); 
	});
	
	$(document).on('click', ".searched_tags", function() {
		var tagid = $(this).attr("id");
		$("#build-preview").html($("#build-preview").html().replace("TAG",tagid));
		if ( $( "#add-build" ).length ) {
			$("#add-build").val($("#add-build").val().replace("TAG",tagid));
		}
		$("#tag-box").hide();
	});
	
	//State search
	$('#searchstates').keyup(function(){
		var searchField = $('#searchstates').val();
		var regex = new RegExp(searchField, "i");
		var count = 1;
		var output = "";
		$.getJSON("states.json", function(data) {
			$.each(data, function(key, val){
				if ((val.id.search(regex) != -1) || (val.name.search(regex) != -1)) {
			 		output += '<p id="state_'+val.id+'" class="searched_states">'+val.name+'</p>';
				}
			});
			$('#statesearchoutput').html(output);
		}); 
	});
	
	$(document).on('click', ".searched_states", function() {
		var tagid = $(this).attr("id").replace("state_","");
		$("#build-preview").html($("#build-preview").html().replace("STATEID",tagid));
		$("#build-preview").html($("#build-preview").html().replace("state_id",tagid));
		if ( $( "#add-build" ).length ) {
			$("#add-build").val($("#add-build").val().replace("STATEID",tagid));
			$("#add-build").val($("#add-build").val().replace("state_id",tagid));
		}
		$("#state-box").hide();
	});
	
	
	//Submit
	$("#submit-build").click(function(){
		//#build-preview
		var buildvalue = $("#add-build").val();
		$("#add-build").after(buildvalue);
		$("#add-build").remove();
		$("#"+$(this).attr("build")).val($("#"+$(this).attr("build")).val()+$("#build-preview").text());
		$("#build-preview").empty();
		$("#build-preview").addClass("current-build-add-location");
		$(this).attr("build","null");
		$("#builder").hide();
		$(this).hide();
	});

	/**
	===
		For textarea sync:
	===
	**/
	$('textarea').scroll(function() {
		var id = "#"+$(this).attr('id');
		if($(id+'_underlay').length > -1){
	        $($(id+'_underlay').scrollTop($(id).scrollTop()));
		}
    });
	var textareaResize = function(source, dest) {
    var resizeInt = null;
    
    var resizeEvent = function() {
        dest.outerWidth( source.outerWidth() );
        dest.outerHeight(source.outerHeight());
        $("."+source.attr("id")+'_wrapper').outerHeight(source.outerHeight() + 16);
    };

    source.on("mousedown", function(e) {
        resizeInt = setInterval(resizeEvent, 1000/30);
    });

    $(window).on("mouseup", function(e) {
	        if (resizeInt !== null) {
	            clearInterval(resizeInt);
	        }
	        resizeEvent();
	    });
	};
	    
	textareaResize($("#reward"), $("#reward_underlay"));

	$("#edit-focus-open").on('click', function(){
		$("#reward_underlay").outerWidth( $("#reward").outerWidth() );
	    $("#reward_underlay").outerHeight($("#reward").outerHeight());
	    $("."+$("#reward").attr("id")+'_wrapper').outerHeight($("#reward").outerHeight() + 16);
	});
	var pressedkeys = {};
	$("textarea").on('keydown', function(e){
		var id = $(this).attr("id");
		if($("#"+id+'_underlay').length && $("#predictive_"+id).prop("checked") == true){
			textareaSync(id, id+'_underlay');
		}
	});

	function textareaSync(source, dest){
		if($("#predictive_"+source).prop("checked") == true){
			source = $("#"+source);
			dest = $("#"+dest);

			source.one("keyup",function(e){
				if(source.val().indexOf('	') > -1){
			    	doSearch(e,'split');
				}else{
					doSearch(e,'nosplit');
				}
				if(source.val()[source.val().length - 1] == '	'){
					source.val(source.val()+'\n');
				}
				
			});
			source.keyup(function(e){
				pressedkeys[e.which] = '0';
			});

			function doSearch(e,split){
				if(split == 'nosplit'){
					var searchField = source.val();
				}else{
					var split = source.val().split('	');
					var searchField = split[split.length - 1];
					var allFinishedFoci = source.val().replace(searchField,'');
				}
				var regex = new RegExp(searchField, "i");
			    var count = 1;
			    var output = "";
			    var keys = [16,8];
			    if(keys.indexOf(e.which) == -1){
				    $.getJSON("/national-focus/search_outputs.php?search="+searchField, function(data) {
				    	if(split == 'nosplit'){
				       		dest.val(data[0].list_id);
				       	}else{
				       		dest.val(allFinishedFoci+data[0].list_id);
				       	}
				        var autocomplete = [13,9,39];
				        if(autocomplete.indexOf(e.which) != -1){

				        	var specialOutcomes = ['new-level', 'TAG', 'STATEID'];
				        	var outcome = data[0].list_default_outcome;

				        	if(specialOutcomes.indexOf(outcome) != - 1){
				        		
				        	}else{
				        		var newUnderlay = dest.val();
				        		newUnderlay += outcome;
				        		dest.val(newUnderlay+'	');
				        	}
				        }
				    });
				}
			}

			function syncCartSearch(){
			    source.val(dest.val().replace(/	/g,'	\n'));
			}
			$(source,dest).one("keydown",function(e) {
			    //Keys they should press to auto-complete form
			        //Enter, Tab, Right Arrow
			    pressedkeys[e.which] = e.which;
			    var keys = [13,9,39];
			    if(keys.indexOf(e.which) != -1 && source.val().length < dest.val().length) {
			        e.preventDefault();
			        if(pressedkeys[16] > 1){
			        	if(pressedkeys[9] > 1){
			        		var $txt = source;
					        var caretPos = $txt[0].selectionStart;
					        var textAreaTxt = $txt.val();
					        var txtToAdd = "	";
					        $txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
			        	}
			        	if(pressedkeys[13]){
				        	source.val(source.val()+'	'+'\n');
				        }
			        }else{
			        	syncCartSearch();
			    	}
			    }else{
			    	if(e.which == 13){
			    		e.preventDefault();
			    		source.val(source.val()+'	'+'\n');
			    	}
			    }
			});
		}
	}

	/**
	===
		For connectors:
	===
	**/

	//Move focus right 
	$(document).on('click', ".right", function() {
		$(this).parent().parent().animate({left: '+=150px'}, 0);
		$(this).parent().parent().attr("x-pos",parseInt($(this).parent().parent().attr("x-pos"))+1);
		moveConnections($(this).parent().parent().attr("id"));
	});
	//Move focus left
	$(document).on('click', ".left", function() {
		if(parseInt($(this).parent().parent().css("left").replace("px","")) > 99){
			$(this).parent().parent().animate({left: '+=-150px'}, 0);
			$(this).parent().parent().attr("x-pos",parseInt($(this).parent().parent().attr("x-pos"))-1);
			moveConnections($(this).parent().parent().attr("id"));
		}
	});
	//Move focus down
	$(document).on('click', ".down", function() {
		$(this).parent().parent().animate({top: '+=180px'}, 0);
		$(this).parent().parent().attr("y-pos",parseInt($(this).parent().parent().attr("y-pos"))+1);
		moveConnections($(this).parent().parent().attr("id"));
	});
	//Move focus up
	$(document).on('click', ".up", function() {
		if(parseInt($(this).parent().parent().css("top").replace("px","")) > 149){
			$(this).parent().parent().animate({top: '+=-180px'}, 0);
			$(this).parent().parent().attr("y-pos",parseInt($(this).parent().parent().attr("y-pos"))-1);
			moveConnections($(this).parent().parent().attr("id"));
		}
	});

	function moveConnections(focusid){
		var xpos = parseInt($("#"+focusid).attr("x-pos"))*150;
		var ypos = parseInt($("#"+focusid).attr("y-pos"))*180;
		//Connector 
		$.each($('.connection[id*="'+$("#"+focusid).attr("id")+'"]'),function(index, value){
			var connectorid = $(value).attr("id");
			var connectorclass = $("#"+connectorid).attr("class").replace("-vert","");
			var focuses = connectorid.split("-");
			var top = parseInt($("#"+focuses[1]).css("top").replace("px",""))+parseInt($("#"+focuses[1]).css("height").replace("px",""));
			if(top.toString().charAt(0) == "-"){
			  var topcalc = top.toString().replace("-","");
			}else{
				var topcalc = top;
			}
			var verttop = topcalc;
			var vertical = topcalc-ypos;
			if(vertical.toString().charAt(0) == "-"){
			  var verticalcalc = vertical.toString().replace("-","");
			}else{
				var verticalcalc = vertical;
			}
			var width = parseInt($("#"+focuses[1]).css("left").replace("px",""))-parseInt($("#"+focuses[0]).css("left").replace("px",""));
			if(width.toString().charAt(0) == "-"){
			  var widthcalc = width.toString().replace("-","");
			}else{
				var widthcalc = width;
			}
			if(parseInt($("#"+focuses[1]).css("left").replace("px","")) < parseInt($("#"+focuses[0]).css("left").replace("px",""))){
				var left = parseInt($("#"+focuses[1]).css("left").replace("px",""))+59;
				var leftvert = parseInt(left)+parseInt(widthcalc);
			}else{
				var left = parseInt($("#"+focuses[0]).css("left").replace("px",""))+59;
				var leftvert = left;  
			}
			$("#"+focuses[0]+'-'+focuses[1]+'-h').remove();
			$("#"+focuses[0]+'-'+focuses[1]+'-v').remove();
			$("#display").append('<div class="'+connectorclass+'" id="'+focuses[0]+'-'+focuses[1]+'-h" style="top:'+topcalc+'px;width:'+widthcalc+'px;left:'+left+'px;"></div>');
			$("#display").append('<div class="'+connectorclass+'-vert" id="'+focuses[0]+'-'+focuses[1]+'-v" style="top:'+verttop+'px;height:'+verticalcalc+'px;left:'+leftvert+'px;"></div>');
		});	
	}

});