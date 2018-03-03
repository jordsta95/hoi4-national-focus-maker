$(document).ready(function(){

	//Choose NF icon
	$(".nficon").click(function(){
		var gfxid = $(this).attr("id");
		var gfxsrc = $(this).attr("src");
		$("#display-gfx").attr("src",gfxsrc);
		$("#choosegfx").hide();
		$("#chosen-gfx").val(gfxid);
	});
	var focuscount = 0;
	//Add focus to view area, and clear form when done
	$("#submit-focus").click(function(){
		$("#edit").hide();
		$("#builder").hide();
		
		if($("#editing").text().length !== 0){
			var previousedited = $("#editing").text();
			$("#"+previousedited).remove();
			$("#"+previousedited+"-all-info").remove();
			//Remove connectors too
			$("*[id*="+previousedited+"-]").each(function() {
				$(this).remove();
			});
			$("*[id*=-"+previousedited+"]").each(function() {
				$(this).remove();
			});
			$("#editing").text("");
		}
		if($("#name").val() !== ""){
			var	name = $("#name").val();
		}else{
			var name = "generic_name_"+focuscount;
		}
		var desc = $("#desc").val();
		var available = $("#available").val();
		var reward = $("#reward").val();
		var time = $("#time").val();
		if($("#prefocus").val().substr($("#prefocus").val().length - 2)  == "&&" || $("#prefocus").val().substr($("#prefocus").val().length - 2) == "||"){
			var prefocus = $("#prefocus").val().slice(0,-2);
		}else{
			var prefocus = $("#prefocus").val();
		}
		if($("#mutual").val().substr($("#mutual").val().length - 2) == "&&" || $("#mutual").val().substr($("#mutual").val().length - 2) == "||"){
			var mutual = $("#mutual").val().slice(0,-2);
			}else{
			var mutual = $("#mutual").val();
		}
		var bypass = $("#bypass").val();
		var tooltip = $("#tooltip").val();
		var ai = $("#ai").val();
		var x = parseInt($("#x").val());
		var y = parseInt($("#y").val());
		if($("#chosen-gfx").val().substring(0,15) == "data:image/png;"){
			var getgfx = $("#chosen-gfx").val();
		}else{
			var gfx = $("#chosen-gfx").val();
			var getgfx = $("#"+gfx).attr("src");
		}
		var id = name.replace(/\s+/g, '').replace(/[^a-zA-Z_0-9]/g, '').toLowerCase();
		var xpos = x*150;
		var ypos = y*180;
		var allinfo = '<div class="all-info" id="'+id+'-all-info"><div id="'+id+'_name">'+name+'</div><div id="'+id+'_desc">'+desc+'</div><div id="'+id+'_available">'+available+'</div><div id="'+id+'_reward">'+reward+'</div><div id="'+id+'_time">'+time+'</div><div id="'+id+'_bypass">'+bypass+'</div><div id="'+id+'_tooltip">'+tooltip+'</div><div id="'+id+'_prefocus">'+prefocus+'</div><div id="'+id+'_mutual">'+mutual+'</div><div id="'+id+'_ai">'+ai+'</div><div id="'+id+'_gfx">'+getgfx+'</div></div>		';
		$("#display").append('<div id="'+id+'" class="focus" style="top:'+ypos+'px;left:'+xpos+'px;" x-pos="'+x+'" y-pos="'+y+'"><div style="position:relative"><div class="mover up">^&nbsp;&nbsp;</div><div class="mover down">&nbsp;&nbsp;v</div><img src="'+getgfx+'" id="'+id+'_gfx" class="gfx"><div class="name">'+'<p id="'+id+'-name">'+name+'</p></div><div class="mover left">&lt;&nbsp;&nbsp;</div><div class="mover right">&nbsp;&nbsp;&gt;</div><div class="tail"></div></div></div>'+allinfo);
		
		//Connector - &&
			//Multiple
		if(prefocus.length > 1){
		if(prefocus.indexOf("&&") != -1){
			var prefocusarray = prefocus.split("&&");
			$.each(prefocusarray, function( index, value ) {
			  var top = parseInt($("#"+value).css("top").replace("px",""))+parseInt($("#"+value).css("height").replace("px",""));
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
			  var width = parseInt($("#"+value).css("left").replace("px",""))-xpos;
			  if(width.toString().charAt(0) == "-"){
				  var widthcalc = width.toString().replace("-","");
			  }else{
			  	var widthcalc = width;
			  }
			  if(parseInt($("#"+value).css("left").replace("px","")) < xpos){
			  	var left = parseInt($("#"+value).css("left").replace("px",""))+59;
				var leftvert = parseInt(left)+parseInt(widthcalc);
			  }else{
				var left = xpos+59;
				var leftvert = left;  
			  }
			  $("#display").append('<div class="connection connector-norm" id="'+id+'-'+value+'-h" style="top:'+topcalc+'px;width:'+widthcalc+'px;left:'+left+'px;"></div>');
			  $("#display").append('<div class="connection connector-norm-vert" id="'+id+'-'+value+'-v" style="top:'+verttop+'px;height:'+verticalcalc+'px;left:'+leftvert+'px;"></div>');
			});	
		}
			//Single
		if(prefocus.indexOf("&&") == -1 && prefocus.indexOf("||") == -1){
			  var top = parseInt($("#"+prefocus).css("top").replace("px",""))+parseInt($("#"+prefocus).css("height").replace("px",""));
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
			  var width = parseInt($("#"+prefocus).css("left").replace("px",""))-xpos;
			  if(width.toString().charAt(0) == "-"){
				  var widthcalc = width.toString().replace("-","");
			  }else{
			  	var widthcalc = width;
			  }
			  if(parseInt($("#"+prefocus).css("left").replace("px","")) < xpos){
			  	var left = parseInt($("#"+prefocus).css("left").replace("px",""))+59;
				var leftvert = parseInt(left)+parseInt(widthcalc);
			  }else{
				var left = xpos+59;
				var leftvert = left;  
			  }
			  $("#display").append('<div class="connection connector-norm" id="'+id+'-'+prefocus+'-h" style="top:'+topcalc+'px;width:'+widthcalc+'px;left:'+left+'px;"></div>');
			  $("#display").append('<div class="connection connector-norm-vert" id="'+id+'-'+prefocus+'-v" style="top:'+verttop+'px;height:'+verticalcalc+'px;left:'+leftvert+'px;"></div>');
		}
		//Connector - ||
		if(prefocus.indexOf("||") != -1){
			var prefocusarray = prefocus.split("||");
			$.each(prefocusarray, function( index, value ) {
			  var top = parseInt($("#"+value).css("top").replace("px",""))+parseInt($("#"+value).css("height").replace("px",""));
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
			  var width = parseInt($("#"+value).css("left").replace("px",""))-xpos;
			  if(width.toString().charAt(0) == "-"){
				  var widthcalc = width.toString().replace("-","");
			  }else{
			  	var widthcalc = width;
			  }
			  if(parseInt($("#"+value).css("left").replace("px","")) < xpos){
			  	var left = parseInt($("#"+value).css("left").replace("px",""))+59;
				var leftvert = parseInt(left)+parseInt(widthcalc);
			  }else{
				var left = xpos+59;
				var leftvert = left;  
			  }
			  $("#display").append('<div class="connection connector-or" id="'+id+'-'+value+'-h" style="top:'+topcalc+'px;width:'+widthcalc+'px;left:'+left+'px;"></div>');
			  $("#display").append('<div class="connection connector-or-vert" id="'+id+'-'+value+'-v" style="top:'+verttop+'px;height:'+verticalcalc+'px;left:'+leftvert+'px;"></div>');
			});	
		}
		}
		moveConnections(id);	
		
		if(parseInt($("#max-x").text()) < x){
			$("#max-x").text(x);
		}
		if(parseInt($("#max-y").text()) < y){
			$("#max-y").text(y);
		}
		
		$("#name").val("");
		$("#desc").val("");
		$("#available").val("");
		$("#reward").val("");
		$("#prefocus").val("");
		$("#mutual").val("");
		$("#bypass").val("");
		$("#tooltip").val("");
		$("#x").val("0");
		$("#y").val("0");
		$("#chosen-gfx").val("goal_unknown");
		$("#display-gfx").attr("src","images/goal_unknown.png");
		focuscount++;
	});
	
	//Edit/delete focus
	$(document).on('click', ".name,.gfx", function() {
		var nf = $(this).parent().parent().attr("id");
		if($("#delete").prop('checked') !== true){
			var getname = "#"+nf+"_name";
			var getdesc = "#"+nf+"_desc";
			var getprefocus = "#"+nf+"_prefocus";
			var getavailable = "#"+nf+"_available";
			var getaifactor = "#"+nf+"_ai";
			var getmutual = "#"+nf+"_mutual";
			var img = "#"+nf+"_gfx";
			var getttc = "#"+nf+"_time";
			var getreward = "#"+nf+"_reward";
			var gettooltip = "#"+nf+"_tooltip";
			var getx = $(this).parent().parent().attr("x-pos");
			var gety = $(this).parent().parent().attr("y-pos");
			var getgfx = $(img).attr("src");
			$("#name").val($(getname).text());
			$("#desc").val($(getdesc).text());
			$("#time").val($(getttc).text());
			$("#prefocus").val($(getprefocus).text());
			$("#available").val($(getavailable).text());
			$("#reward").val($(getreward).text());
			$("#mutual").val($(getmutual).text());
			$("#tooltip").val($(gettooltip).text());
			$("#ai").val($(getaifactor).text());
			$("#x").val(getx);
			$("#y").val(gety);
			$("#chosen-gfx").val(getgfx.replace("images\/","").replace(".png",""));
			$("#display-gfx").attr("src", getgfx);
			$("#edit-focus").show();
			$("#editing").text(nf);
		}else{
			$(this).parent().parent().remove();
			$("#"+nf+"-all-info").remove();
			//Remove connectors too
			$("*[id*="+nf+"-]").each(function() {
				$(this).remove();
			});
			$("*[id*=-"+nf+"]").each(function() {
				$(this).remove();
			});
		}
	});
	$("#delete-all").click(function(){
		$('.all-info').each(function (index, element) {
				var id = $(this).attr("id").replace("-all-info","");
				$("*[id*="+id+"-]").each(function() {
					$(this).remove();
				});
				$("*[id*=-"+id+"]").each(function() {
					$(this).remove();
				});
				$("#"+id).each(function() {
					$(this).remove();
				});
				$(this).remove();
		});
	});
	
	
	$(".left, .right, .up, .down, #submit-focus").click(function(){
		
	});
	
	
	
	//No AND OR issues
	$("#select-and").click(function(){
		$("#select-or").prop('checked',false);
		$("#select-and").prop('checked',true);
	});
	$("#select-or").click(function(){
		$("#select-and").prop('checked',false);
		$("#select-or").prop('checked',true);
	});
	$("#select-reset").click(function(){
		$("#select-and").prop('checked',false);
		$("#select-or").prop('checked',false);
		$("#select-reset").prop('checked',false);
	});
	//Mutually Exclusive focuses
	$("#mutual").click(function(){
		$("#selectfocus").html("");
		$('.focus').each(function () {
			var focusid = (this.id);
			var focusname = "#"+focusid+"_name";
			var focusimg = "#"+focusid+"_gfx";
			$("#selectfocus").append('<p class="mutualselect" id="'+focusid+'_sel"><img src="'+$(focusimg).attr("src")+'" align="left" width="25px;">'+$(focusname).text()+'</p>');
		});
		$("#selectfocusarea").show();
	});
	//Prerequisite focuses
	$("#prefocus").click(function(){
		$("#selectfocus").html("");
		$('.focus').each(function () {
			var focusid = (this.id);
			var focusname = "#"+focusid+"_name";
			var focusimg = "#"+focusid+"_gfx";
			$("#selectfocus").append('<p class="preselect" id="'+focusid+'_sel"><img src="'+$(focusimg).attr("src")+'" align="left" width="25px;">'+$(focusname).text()+'</p>');
		});
		$("#selectfocusarea").show();
	});
	//On select of mutual
	$(document).on('click', ".mutualselect", function() {
		if($("#select-and").prop('checked') == true || $("#select-or").prop('checked') == true){
			if($("#select-and").prop('checked') == true){
				var connection = "&&";
			}
			if($("#select-or").prop('checked') == true){
				var connection = "||";
			}
			var msid = (this.id).replace("_sel","");
			$("#mutual").val($("#mutual").val() + msid + connection);
			$(this).remove();
		}else{
			var msid = (this.id).replace("_sel","");
			$("#mutual").val($("#mutual").val() + msid);
			$("#selectfocus").html("");
			$("#selectfocusarea").hide();
		}
	});
	//On select of prerequisite
	$(document).on('click', ".preselect", function() {
		if($("#select-and").prop('checked') == true || $("#select-or").prop('checked') == true){
			if($("#select-and").prop('checked') == true){
				var connection = "&&";
			}
			if($("#select-or").prop('checked') == true){
				var connection = "||";
			}
			var psid = (this.id).replace("_sel","");
			$("#prefocus").val($("#prefocus").val() + psid + connection);
			$(this).remove();
		}else{
			var psid = (this.id).replace("_sel","");
			$("#prefocus").val($("#prefocus").val() + psid);
			$("#selectfocus").html("");
			$("#selectfocusarea").hide();
		}
	});
	
	
	/* local storage */
	if(localStorage.getItem('nationalfocus')) {
	  var nationalfocusitems = localStorage.getItem('nationalfocus');
	  $('#display').html(nationalfocusitems);
	}
	$("#savetostorage").click(function(){
		localStorage.setItem('nationalfocus', $('#display').html());
	});
	


	$("#export-help, #close-export-help").click(function(){
		$("#export-help-box").toggle();	
	});
	
	$("#export, #close-export").click(function(){
		$("#export-box").toggle();	
	});

	$("#export-box-open").on('click', function(){
		var errors = 0;
		var errorMessages = '';
		$('.focus').each(function(){
			var id = '#'+$(this).attr('id');
			var name = $(id+'-name').text();
			if( ($(id+'_available').text().match(/{/g) || []).length !== ($(id+'_available').text().match(/}/g) || []).length ){
				errors++;
				errorMessages += 'Uneven amount of braces for '+name+'\'s available<br>';
			}
			if( ($(id+'_reward').text().match(/{/g) || []).length !== ($(id+'_reward').text().match(/}/g) || []).length ){
				errors++;
				errorMessages += 'Uneven amount of braces for '+name+'\' reward<br>';
			}
			if( ($(id+'_bypass').text().match(/{/g) || []).length !== ($(id+'_bypass').text().match(/}/g) || []).length ){
				errors++;
				errorMessages += 'Uneven amount of braces for '+name+'\' bypass<br>';
			}
			if($(id+'_prefocus').text() != ''){
				var prefoci = [];
				var prefocus = $(id+'_prefocus').text();
				if(prefocus.indexOf('&&') > 0){
					var prefocus = prefocus.split('&&');

					$.each(prefocus, function(){
						if(this.indexOf('||') > 0){
							var split = this.split('||');
							$.each(split, function(){
								prefoci.push(this);
							});
						}else{
							prefoci.push(this);
						}
					});
				}else{
					if(prefocus.indexOf('||') > 0){
						var prefocus = prefocus.split('||');

						$.each(prefocus, function(){
							prefoci.push(this);
						});
					}
				}
				
				$.each(prefoci, function(){
					if(!$('#'+this).length){
						errors++;
						errorMessages += 'Focus with ID "'+this+'" is referenced in '+name+' but does not exist<br>';
					}
				});
			}
			if($(id+'_mutual').text() != ''){
				var mutuals = [];
				var mutual = $(id+'_mutual').text();
				var mutual = mutual.split('&&');

				$.each(mutual, function(){
					var split = this.split('||');
					$.each(split, function(){
						prefoci.push(this);
					});
				});
				$.each(mutuals, function(){
					if(!$('#'+this).length){
						errors++;
						errorMessages += 'Focus with ID "'+this+'" is referenced in '+name+' but does not exist<br>';
					}
				});
			}

			if(errors > 0){
				$('.errors .numbers').text(errors);
				$('.errors .message').html(errorMessages);
				$('.errors .message').append('<hr>Click box to close');
				$('.errors').show();
			}
		});
	});
	$('.errors').on('click', function(){
		if($(this).hasClass('inactive')){
			$(this).removeClass('inactive');
			$(this).addClass('active');
		}else{
			$(this).addClass('inactive');
			$(this).removeClass('active');
			$(this).hide();
		}
	});
	//TAG search
	$("#export-country").keyup(function(){
		var searchField = $("#export-country").val();
		var regex = new RegExp(searchField, "i");
		var count = 1;
		var output = "";
		$.getJSON("tags.json", function(data) {
			$.each(data, function(key, val){
				if ((val.country.search(regex) != -1) || (val.tag.search(regex) != -1)) {
			 		output += '<p id="'+val.tag+'" class="focus_tree_tags">'+val.country+'</p>';
				}
			});
			$("#export-country-result").html(output);
		}); 
	});
	$(document).on('click', ".focus_tree_tags", function() {
		var tagid = $(this).attr("id");
		$("#export-country").val($("#export-country").val()+tagid);
	});
	
	/* Export text files*/
	$("#export-focus").click(function(){
		currentx = 0;
		currenty = 0;
		working = 0;
		checked = 0;
		var maxx = parseInt($("#max-x").text());
		var maxy = parseInt($("#max-y").text());
		var focustreeid =$("#focus-tree-id").val().replace(/\s+/g, '').replace(/[^a-zA-Z]/g, '').toLowerCase();
		$("#workplace-focus").val('{"treeid":"'+focustreeid+'","start":"focus_tree = {<br>id = \''+focustreeid+'\'<br>country = {<br>factor=0<br>modifier = {<br>add = 10<br>tag = '+$("#export-country").val()+'<br>}<br>}<br>default = no<br>#Custom focuses start here<br>","focuses":[');
		$("#workplace-lang").val("l_"+$("#tree-language").val()+":\n");
		//$('.all-info').each(function (index, element) {
		while(currentx <= maxx && currenty <= maxy){
			checked++;
			var exportid = $("[x-pos*="+currentx+"][y-pos*="+currenty+"]").attr("id");
			var exportname = "#"+exportid+"_name";
			var exportdesc = "#"+exportid+"_desc";
			var exportprefocus = "#"+exportid+"_prefocus";
			var exportavailable = "#"+exportid+"_available";
			var exportmutual = "#"+exportid+"_mutual";
			var exporttooltip = "#"+exportid+"_tooltip";
			var exportimg = "#"+exportid+"_gfx";
			var exportreward = "#"+exportid+"_reward";
			var exportttc = "#"+exportid+"_time";
			var exportbypass = "#"+exportid+"_bypass";
			var exportai = "#"+exportid+"_ai";
			var exportx = $("#"+exportid).attr("x-pos");
			var exporty = $("#"+exportid).attr("y-pos");
			var exportgfx = $(exportimg).attr("src");
			if(exportid !== "" > 0 && exportid !== "undefined"){
				if($(exportprefocus).text().length !== 0){
					var fixprefocus = $(exportprefocus).text().replace(/\&\&/g,"}\n prerequisite = { focus =").replace(/\|\|/g,"  focus = ");
				}
				if($(exportmutual).text().length !== 0){
					var fixmutual = $(exportmutual).text().replace(/\&\&/g,"}\n mutually_exclusive = { focus =").replace(/\|\|/g,"  focus = ");
				}
				
				$("#workplace-lang").val($("#workplace-lang").val() + exportid + ':0 "' + $(exportname).text() + '"<br>');
				$("#workplace-lang").val($("#workplace-lang").val() + exportid + '_desc:0 "' + $(exportdesc).text() + '"<br>');


				$("#workplace-focus").val($("#workplace-focus").val()+"{");
				$("#workplace-focus").val($("#workplace-focus").val() + '"name":"'+ $(exportname).text() +'",');
				$("#workplace-focus").val($("#workplace-focus").val() + '"id":"'+ exportid +'",');
				$("#workplace-focus").val($("#workplace-focus").val() + '"icon":"'+ exportgfx + '",');
				$("#workplace-focus").val($("#workplace-focus").val() + '"everythingelse":"');
				if($(exportbypass).text().length > 0){
					$("#workplace-focus").val($("#workplace-focus").val() + 'bypass = {'+ $(exportbypass).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["']/g, "'") + '}<br>');
				}
				if($(exportai).text().length > 0){
					$("#workplace-focus").val($("#workplace-focus").val() + 'ai_will_do = { factor = '+ $(exportai).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t") + '}<br>');
				}else{
					$("#workplace-focus").val($("#workplace-focus").val() + 'ai_will_do = { factor = 0 }<br>');
				}
				$("#workplace-focus").val($("#workplace-focus").val() + 'x ='+ exportx + '<br>');
				$("#workplace-focus").val($("#workplace-focus").val() + 'y ='+ exporty + '<br>');

				

				if($(exportmutual).text().length == 0){
					$("#workplace-focus").val($("#workplace-focus").val() + 'mutually_exclusive = { }<br>');
				}else{
					$("#workplace-focus").val($("#workplace-focus").val() + 'mutually_exclusive = { focus = '+ fixmutual.replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + '}<br>');
				}
				if($(exportprefocus).text().length == 0){
					$("#workplace-focus").val($("#workplace-focus").val() + 'prerequisite = { }<br>');
				}else{
					$("#workplace-focus").val($("#workplace-focus").val() + 'prerequisite = { focus = '+fixprefocus.replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + '}<br>');
				}
				if($(exportavailable).text().length > 0){
					$("#workplace-focus").val($("#workplace-focus").val() + 'available = { '+ $(exportavailable).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + ' }<br>');
				}
				if($(exportttc).text() == "" || $(exportttc).text() == "0"){
					$("#workplace-focus").val($("#workplace-focus").val() + 'cost = 10 <br> available_if_capitulated = yes <br>');
				}else{
					$("#workplace-focus").val($("#workplace-focus").val() + 'cost = '+ $(exportttc).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + ' <br> available_if_capitulated = yes <br>');	
				}
				if($(exportreward).text().length > 0){
					$("#workplace-focus").val($("#workplace-focus").val() + 'completion_reward = {<br>'+ $(exportreward).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + '<br>}<br>');
				}
				$("#workplace-focus").val($("#workplace-focus").val()+'"},');
				if(currentx == maxx){
					currentx = 0;
					currenty++;
					working = 0;
				}else{
					currentx++;	
				}
			}
		}
		console.log(checked);
		if(checked == 0 || checked == 1){
			alert('There was a problem creating your focus tree. Please report the following on Github: "x-'+maxx+'|y-'+maxy+'" along with your browser and the location of your final focus (the one at the bottom of your tree)');
		}
		//});
		$("#workplace-focus").val($("#workplace-focus").val().slice(0, -1)+"]}").delay(100);
		
		$('#export-focus-hidden').trigger('click');
	});
	
	$("#savetoserver").click(function(){
		var ids = [];
		var names = [];
		var descs = [];
		var prefocuses = [];
		var availables = [];
		var mutuals = [];
		var imgs = [];
		var rewards = [];
		var ttcs = [];
		var bypasses = [];
		var xs = [];
		var ys = [];
		var ai = [];
		var tooltips = [];
		ids = [];
		names = [];
		descs = [];
		prefocuses = [];
		availables = [];
		mutuals = [];
		imgs = [];
		rewards = [];
		ttcs = [];
		bypasses = [];
		xs = [];
		ys = [];
		ai = [];
		tooltips = [];
		if($("#public_focuses").prop('checked') == false){
			var private = "1";
		}else{
			var private = "0";
		}
		var tags = $("#country_tags").val();
		$('.all-info').each(function () {
			var exportid = $(this).attr("id").replace("-all-info","");
			var exportname = "#"+exportid+"_name";
			var exportdesc = "#"+exportid+"_desc";
			var exportprefocus = "#"+exportid+"_prefocus";
			var exportavailable = "#"+exportid+"_available";
			var exportmutual = "#"+exportid+"_mutual";
			var exportimg = "#"+exportid+"_gfx";
			var exportreward = "#"+exportid+"_reward";
			var exportttc = "#"+exportid+"_time";
			var exportbypass = "#"+exportid+"_bypass";
			var exportx = $("#"+exportid).attr("x-pos");
			var exporty = $("#"+exportid).attr("y-pos");
			var exportgfx = $(exportimg).attr("src");
			var exportai = "#"+exportid+"_ai";
			var exporttooltip = "#"+exportid+"_tooltip";
		
			ids.push(exportid);
			names.push($(exportname).text());
			descs.push($(exportdesc).text());
			imgs.push(exportgfx);
			bypasses.push($(exportbypass).text());
			xs.push(exportx);
			ys.push(exporty);
			mutuals.push($(exportmutual).text());
			prefocuses.push($(exportprefocus).text());
			availables.push($(exportavailable).text());
			ttcs.push($(exportttc).text());	
			rewards.push($(exportreward).text());
			ai.push($(exportai).text());
			tooltips.push($(exporttooltip).text());
		});
		$.post( "upload.php",{ 
			ids: ids, 
			names: names,
			descs: descs,
			prefocuses: prefocuses,
			availables:availables,
			mutuals: mutuals,
			imgs: imgs,
			rewards: rewards,
			ttcs: ttcs,
			bypasses: bypasses,
			xs: xs,
			ys: ys,
			ai: ai,
			tooltips: tooltips,
			private: private,
			tags: tags
		},
		function(data,status){
			
            if(status !== "success"){
				alert("There was an issue uploading your focus(es), please try again later or report an issue on Github.");
			}else{
				var content = $( data ).find( "#pw" );
				$( "#display-password" ).empty().append( content );
				$( "#display-password" ).append('<br><span id="close-pw" style="font-size:0.75rem;">The above is your password, to access your focus(es) from anywhere, make sure to copy it. Click this text to close this box</span>')
				$( "#display-password" ).show();
				$( "#server-box" ).hide();
			}
        });
	});
	
	
	$("#sub-pass").click(function(){
		$.post( 'import.php', { import_password: $("#import_password").val() },
		function(data,status){
           // alert("Data: " + data + "\nStatus: " + status);
			var content = $( data ).filter( "#table" );
			$( "#show-output" ).empty().append( content );
			
        });
	});
	
	$(document).on('click', ".import-row", function() {
		var addid = $(this).attr("id");
		$("#display").append($("#"+addid+"-import-row").html());
		$(this).remove();
		if($('.import-row').length == "0" || $('.import-row').length == "-1"){
			$("#table").remove();	
		}
	});
	$(document).on('click', "#clear-table", function() {
		$("#table").remove();	
	});
	
	//Custom GFX
	File.prototype.convertToBase64 = function(callback){
            var reader = new FileReader();
            reader.onload = function(e) {
                 callback(e.target.result)
            };
            reader.onerror = function(e) {
                 callback(null, e);
            };        
            reader.readAsDataURL(this);
    };

	$("#customgfx").on("change",function(){
		var gfxid = $(this).attr("id");
		var selectedFile = this.files[0];
		selectedFile.convertToBase64(function(base64){
			var b64 = gfxid.replace("image","base64");
			var display = gfxid.replace("image","display");
			if(base64.substring(0,15) == "data:image/png;"){
				$("#display-gfx").attr('src',base64);
				$("#chosen-gfx").val(base64);
			}else{
				alert("The image you have uploaded is not a PNG");	
			}
		  }); 
	});

	//Refresh max x/y
	$(".focus").each(function(){
		var x = parseInt($(this).attr("x-pos"));
		var y = parseInt($(this).attr("y-pos"));
		if(parseInt($("#max-x").text()) < x){
			$("#max-x").text(x);
		}
		if(parseInt($("#max-y").text()) < y){
			$("#max-y").text(y);
		}
	});


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