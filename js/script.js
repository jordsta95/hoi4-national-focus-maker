$(document).ready(function(){
	
	//Edit focus view - show from menu button
	$("#add-focus").click(function(){
		$("#edit").show();
	});
	//Close menu using close button
	$("#edit-close").click(function(){
		$("#edit").hide();
	});
	//Edit GFX
	$("#open-gfx").click(function(){
		$("#choosegfx").toggle();	
	});
	
	//Choose NF icon
	$(".nficon").click(function(){
		var gfxid = $(this).attr("id");
		var gfxsrc = $(this).attr("src");
		$("#display-gfx").attr("src",gfxsrc);
		$("#choosegfx").hide();
		$("#chosen-gfx").val(gfxid);
	});
	
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
		
		var	name = $("#name").val();
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
			
		
		$("#name").val("");
		$("#desc").val("");
		$("#available").val("");
		$("#reward").val("");
		$("#prefocus").val("");
		$("#mutual").val("");
		$("#bypass").val("");
		$("#tooltip").val("");
		$("#x").val("");
		$("#y").val("");
		$("#chosen-gfx").val("");
		$("#display-gfx").attr("src","images/goal_unknown.png");
	});
	
	//Edit/delete focus
	$(document).on('click', ".name,.gfx", function() {
		var nf = $(this).parent().parent().attr("id");
		if($("#delete").prop('checked') !== true){
			var getname = "#"+nf+"_name";
			var getdesc = "#"+nf+"_desc";
			var getprefocus = "#"+nf+"_prefocus";
			var getavailable = "#"+nf+"_available";
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
			$("#x").val(getx);
			$("#y").val(gety);
			$("#chosen-gfx").val(getgfx.replace("images\/","").replace(".png",""));
			$("#display-gfx").attr("src", getgfx);
			$("#edit").show();
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
	
	
	$(".left, .right, .up, .down, #submit-focus").click(function(){
		
	});
	
	$("#help, #close-help").click(function(){
		$( "#help-box" ).slideToggle( "slow", function() {});
	});
	
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
	$("#close-selector").click(function(){
		$("#selectfocusarea").hide();
	});
	
	$("#serverpanel,#close-server").click(function(){
		$("#server-box").toggle();	
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
		var focustreeid =$("#focus-tree-id").val().replace(/\s+/g, '').replace(/[^a-zA-Z]/g, '').toLowerCase();
		$("#workplace-focus").val('{"treeid":"'+focustreeid+'","start":"focus_tree = {<br>id = \''+focustreeid+'\'<br>country = {<br>factor=0<br>modifier = {<br>add = 10<br>tag = '+$("#export-country").val()+'<br>}<br>}<br>default = no<br>#Custom focuses start here<br>","focuses":[');
		$("#workplace-lang").val("l_"+$("#tree-language").val()+":\n");
		$('.all-info').each(function (index, element) {
			var exportid = $(this).attr("id").replace("-all-info","");
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
			var fixprefocus = $(exportprefocus).text().replace(/\&\&/g,"}\n prerequisite = { focus =").replace(/\|\|/g,"  focus = ");
			var fixmutual = $(exportmutual).text().replace(/\&\&/g,"}\n mutually_exclusive = { focus =").replace(/\|\|/g,"  focus = ");
			
			$("#workplace-lang").val($("#workplace-lang").val() + exportid + ':0 "' + $(exportname).text() + '"<br>');
			$("#workplace-lang").val($("#workplace-lang").val() + exportid + '_desc:0 "' + $(exportdesc).text() + '"<br>');
			
			$("#workplace-focus").val($("#workplace-focus").val()+"{");
			$("#workplace-focus").val($("#workplace-focus").val() + '"name":"'+ $(exportname).text() +'",');
			$("#workplace-focus").val($("#workplace-focus").val() + '"id":"'+ exportid +'",');
			$("#workplace-focus").val($("#workplace-focus").val() + '"icon":"'+ exportgfx + '",');
			$("#workplace-focus").val($("#workplace-focus").val() + '"everythingelse":"');
			$("#workplace-focus").val($("#workplace-focus").val() + 'bypass = {'+ $(exportbypass).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["']/g, "'") + '}<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'ai_will_do = { factor = '+ $(exportai).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t") + '}<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'x ='+ exportx + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'y ='+ exporty + '<br>');
			if(fixmutual == ""){
				$("#workplace-focus").val($("#workplace-focus").val() + 'mutually_exclusive = { }<br>');
			}else{
				$("#workplace-focus").val($("#workplace-focus").val() + 'mutually_exclusive = { focus = '+ fixmutual.replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + '}<br>');
			}
			if(fixprefocus == ""){
				$("#workplace-focus").val($("#workplace-focus").val() + 'prerequisite = { }<br>');
			}else{
				$("#workplace-focus").val($("#workplace-focus").val() + 'prerequisite = { focus = '+fixprefocus.replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + '}<br>');
			}
			$("#workplace-focus").val($("#workplace-focus").val() + 'available = { '+ $(exportavailable).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + ' }<br>');
			if($(exportttc).text() == "" || $(exportttc).text() == "0"){
				$("#workplace-focus").val($("#workplace-focus").val() + 'cost = 10 <br> available_if_capitulated = yes <br>');
			}else{
				$("#workplace-focus").val($("#workplace-focus").val() + 'cost = '+ $(exportttc).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + ' <br> available_if_capitulated = yes <br>');	
			}
			$("#workplace-focus").val($("#workplace-focus").val() + 'completion_reward = {<br>'+ $(exportreward).text().replace(/\r?\n/g,"<br>").replace(/\t/g,"\\t").replace(/["]/g, "'") + '<br>}<br>');
			$("#workplace-focus").val($("#workplace-focus").val()+'"},');	
		});
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
	
	$("#import, #close-import").click(function(){
		$("#import-box").toggle();	
	});
	
	$("#help-out, #close-help-out").click(function(){
		$("#help-out-box").toggle();	
	});
	
	$("#sub-pass").click(function(){
		$.post( 'import.php', { import_password: $("#import_password").val() },
		function(data,status){
           // alert("Data: " + data + "\nStatus: " + status);
			var content = $( data ).filter( "#table" );
			$( "#show-output" ).empty().append( content );
			
        });
	});
	$(document).on('click', "#close-pw", function() {
		$( "#display-password" ).hide();
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
	
	
	
	//Available/Bypass/Reward builder
	$("#close-builder").click(function(){
			$("#builder").hide();
	});
	$("#available").click(function(){
		$("#builder").show();
		$("#submit-build").attr("build","available");
	});
	$("#bypass").click(function(){
		$("#builder").show();
		$("#submit-build").attr("build","bypass");
	});
	$("#reward").click(function(){
		$("#builder").show();
		$("#submit-build").attr("build","reward");
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
	
	
	// === NF to JSON
	$("#treetojson").click(function(){
		$("#show-output").append('<div id="table"><p>Click the focuses below to add them to your focus tree</p><button id="clear-table">Clear Focuses</button></div>');
		toJSON($("#existing-focus-tree").val().replace(/\t/g,""),0); 
	});
	//Just trims lines to remove #comments.
	//Doesn't handle cases where # characters appear inside strings
	function preprocess(s) {
		lines = s.split(/\r?\n/);
		result = "";
		for(var i = 0; i < lines.length; ++i) {
			var line = lines[i];
			var index = line.indexOf("#");
			if(index != -1) {
				line = line.substring(0, index);
			}
			result += line + "\n";
		}
		return result;
	}
	
	//Probably doesn't handle strings that contain {} or # characters
	function toJSON(s, level) {
		let maxLevel = 2;
		s = preprocess(s);
		var key = "";
		var value = "";
		var buildingKey = true;
		var braceCount = 0; 
		var hadBraces = false;
		var json = {};
		for(var i = 0; i < s.length; ++i) {
			let c = s.charAt(i);
			
			//If the parser is currently expecting a key
			if(buildingKey) {
				//Ignore these characters because they won't be part of a key
				if(c === "{" || c === "}") {
					continue;
				}
				
				//As long as we don't hit the = character, we are still building a key.
				//The assumption here is that keys can contain space characters
				if(c !== '=') {
					key += c;
				}
				else {
					buildingKey = false;
					key = key.trim();
				}
			}
			//The parser is expecting a value
			else {
				value += c;
				//if only whitespace
				//  continue
				if(c === "{") {
					++braceCount;
					hadBraces = true;
				}
				else if(c === "}") {
					--braceCount;
				}
				
				//If the braces are evenly matched,
				//and our value string is not just whitespace characters
				//and the next character to add is whitespace,
				//then we are done building the value string
				if(braceCount === 0 && /\S/.test(value) && /\s/.test(c)) {
					value = value.trim();
					
					//In the stupid format, the same key can appear multiple times.
					//If this happens, then what we really want is to treat that key
					//as an array
					if(key in json) {
						
						//Convert value stored at that key to
						//an array if it isn't already one
						if(!Array.isArray(json[key])) {
							var obj = json[key];
							json[key] = [obj];
						}
	
						//If the value had {} characters, then
						//it will consist of other key/value pairs.
						if(hadBraces && level < maxLevel) {                    
							json[key] = json[key].concat(toJSON(value, level+1));
							hadBraces = false;
						}
						else {
							json[key] = json[key].concat(value);
						} 
					}
					
					else {
						if(hadBraces && level < maxLevel) {                    
							json[key] = toJSON(value, level+1);
							hadBraces = false;
						}
						else {
							json[key] = value;
						} 
					}
					
					
					buildingKey = true;
					key = "";
					value = "";
				}
			}
		}
		$("#existing-focus-tree-output").val(JSON.stringify(json));
		//console.log(json);
		//$("#show-output").append(JSON.stringify(json));
		var obj = JSON.parse($("#existing-focus-tree-output").val());
	
		var focus = obj.focus;
		for(var i in focus){
			var id = focus[i].id;
			var name = "undefined";
			var desc = "undefined";
			var text = focus[i].id;
			if(focus[i].hasOwnProperty('text')){
				text = focus[i].text;
			}
			var localisation = $("#existing-localisation").val().split(/\n/);
			$.each(localisation,function(u, i) {
				if(i.indexOf(":") !== -1){
					var splitid = i.split(/:(.+)/);
					if(splitid[0].replace(/\s+/g, "") == text){
						name = splitid[1].replace("0 ","").slice(1, -1);
					}
					if(splitid[0].replace(/\s+/g, "") == text+"_desc"){
						desc = splitid[1].replace("0 ","").slice(1, -1);
					}
				}
			});
			if(focus[i].hasOwnProperty('mutually_exclusive')){
				var me = focus[i].mutually_exclusive;
			}else{
				var me = "";	
			}
			if(focus[i].hasOwnProperty('prerequisite')){
				var pr = focus[i].prerequisite;
			}else{
				var pr = "";	
			}
			if(focus[i].hasOwnProperty('ai_will_do')){
				var ai = focus[i].ai_will_do;
			}else{
				var ai = "";	
			}
			if(focus[i].hasOwnProperty('completion_reward')){
				var completion_reward = focus[i].completion_reward;
			}else{
				var completion_reward = "";	
			}
			if(focus[i].hasOwnProperty('available')){
				var available = focus[i].available;
			}else{
				var available = "";	
			}
			if(focus[i].hasOwnProperty('bypass')){
				var bypass = focus[i].bypass;
			}else{
				var bypass = "";	
			}
			if(focus[i].hasOwnProperty('completion_tooltip')){
				var completion_tooltip = focus[i].completion_tooltip;
			}else{
				var completion_tooltip = "";	
			}
			if(focus[i].hasOwnProperty('cost')){
				var cost = focus[i].cost;
			}else{
				var cost = "10";	
			}
			$("#table").append('<tr class="import-row" id="'+focus[i].id+'"><td>'+name+'</td><td><div class="focus-reward">'+focus[i].completion_reward+'<div id="'+id+'-import-row" style="display:none;"><div id="'+id+'" class="focus" style="top:'+(parseInt(focus[i].y)*180)+'px;left:'+(parseInt(focus[i].x)*150)+'px;" x-pos="'+focus[i].x+'" y-pos="'+focus[i].y+'"><div style="position:relative"><div class="mover up">^&nbsp;&nbsp;</div><div class="mover down">&nbsp;&nbsp;v</div><img src="images/'+focus[i].icon.replace("GFX_","")+'.png" id="'+id+'_gfx" class="gfx"><div class="name"><p id="'+id+'-name">'+name+'</p></div><div class="mover left">&lt;&nbsp;&nbsp;</div><div class="mover right">&nbsp;&nbsp;&gt;</div><div class="tail"></div></div></div><div class="all-info" id="'+id+'-all-info"><div id="'+id+'_name">'+name+'</div><div id="'+id+'_desc">'+desc+'_desc</div><div id="'+id+'_tooltip">'+completion_tooltip+'</div><div id="'+id+'_available">'+available+'</div><div id="'+id+'_reward">'+completion_reward+'</div><div id="'+id+'_time">'+cost+'</div><div id="'+id+'_bypass">'+bypass+'</div><div id="'+id+'_prefocus">'+pr+'</div><div id="'+id+'_mutual">'+me+'</div><div id="'+id+'_ai">'+ai+'</div><div id="'+id+'_gfx">'+focus[i].icon.replace("GFX_","")+'</div></div></div></div></td></tr>');
		}
		return json;
		
	}


});
