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
		if($("#mutual").val().substr($("#mutual").val().length - 2 == "\&\&") || $("#mutual").val().substr($("#mutual").val().length - 2 == "\|\|")){
			var mutual = $("#mutual").val().slice(0,-2);
			}else{
			var mutual = $("#mutual").val();
		}
		var bypass = $("#bypass").val();
		var tooltip = $("#tooltip").val();
		var ai = $("#ai").val();
		var x = parseInt($("#x").val());
		var y = parseInt($("#y").val());
		var gfx = $("#chosen-gfx").val();
		var getgfx = $("#"+gfx).attr("src");
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
			  	var left = parseInt($("#"+value).css("left").replace("px",""))+69;
				var leftvert = parseInt(left)+parseInt(widthcalc);
			  }else{
				var left = xpos+69;
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
			  	var left = parseInt($("#"+prefocus).css("left").replace("px",""))+69;
				var leftvert = parseInt(left)+parseInt(widthcalc);
			  }else{
				var left = xpos+69;
				var leftvert = left;  
			  }
			  $("#display").append('<div class="connection connector-norm" id="'+id+'-'+prefocus+'-h" style="top:'+topcalc+'px;width:'+widthcalc+'px;left:'+left+'px;"></div>');
			  $("#display").append('<div class="connection connector-norm-vert" id="'+id+'-'+prefocus+'v" style="top:'+verttop+'px;height:'+verticalcalc+'px;left:'+leftvert+'px;"></div>');
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
			  	var left = parseInt($("#"+value).css("left").replace("px",""))+69;
				var leftvert = parseInt(left)+parseInt(widthcalc);
			  }else{
				var left = xpos+69;
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
			$(this).parent().parent().remove();
			$("#"+nf+"-all-info").remove();
		}else{
			$(this).parent().parent().remove();
			$("#"+nf+"-all-info").remove();
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
				var left = parseInt($("#"+focuses[1]).css("left").replace("px",""))+69;
				var leftvert = parseInt(left)+parseInt(widthcalc);
			}else{
				var left = parseInt($("#"+focuses[0]).css("left").replace("px",""))+69;
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
	
	
	
	/* local storage */
	if(localStorage.getItem('nationalfocus')) {
	  var nationalfocusitems = localStorage.getItem('nationalfocus');
	  $('#display').html(nationalfocusitems);
	}
	$("#savetostorage").click(function(){
		localStorage.setItem('nationalfocus', $('#display').html());
	});
	
	$("#export, #close-export").click(function(){
		$("#export-box").toggle();	
	});
	
	/* Export text files*/
	$("#exportcontent").click(function(){
		$("#workplace-focus").val("focus_tree = {<br>id = my_focus_tree<br>country = {<br>factor=0<br>modifier = {<br>add = 10\n#place country tag(s) here<br>}<br>}\ndefault = no<br>#Custom focuses start here<br>");
		$('.all-info').each(function () {
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
			
			$("#workplace-focus").val($("#workplace-focus").val() + '#Focus for - '+ $(exportname).text() + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val()+'focus = {<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'id ='+ exportid + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'icon ='+ exportgfx.replace(".png","").replace("images/","GFX_") + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'bypass = {'+ $(exportbypass).text() + '}<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'ai_will_do = { factor = '+ $(exportai).text() + '}<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'x ='+ exportx + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'y ='+ exporty + '<br>');
			if(fixmutual == ""){
				$("#workplace-focus").val($("#workplace-focus").val() + 'mutually_exclusive = { }<br>');
			}else{
				$("#workplace-focus").val($("#workplace-focus").val() + 'mutually_exclusive = { focus = '+ fixmutual + '}<br>');
			}
			if(fixprefocus == ""){
				$("#workplace-focus").val($("#workplace-focus").val() + 'prerequisite = { }<br>');
			}else{
				$("#workplace-focus").val($("#workplace-focus").val() + 'prerequisite = { focus = '+fixprefocus + '}<br>');
			}
			$("#workplace-focus").val($("#workplace-focus").val() + 'available = { '+ $(exportavailable).text() + ' }<br>');
			if($(exportttc).text() == "" || $(exportttc).text() == "0"){
				$("#workplace-focus").val($("#workplace-focus").val() + 'cost = 10 <br> available_if_capitulated = yes <br>');
			}else{
				$("#workplace-focus").val($("#workplace-focus").val() + 'cost = '+ $(exportttc).text() + ' \n available_if_capitulated = yes <br>');	
			}
			$("#workplace-focus").val($("#workplace-focus").val() + 'completion_reward = {<br>'+ $(exportreward).text() + '<br>}<br>}<br>');
		});
		$("#workplace-focus").val($("#workplace-focus").val()+"#end<br>}");
		
		var a = document.body.appendChild(document.createElement("a"));
		a.download = "national-focus-tree.txt";
		a.href = "data:text/html," + $("#workplace-focus").val().replace(/\<br\>/g,"%0D%0A").replace(/\n/g,"%0D%0A").replace(/	/g,"%09");
		a.click();
		
		var a = document.body.appendChild(document.createElement("a"));
		a.download = "national-focus-tree-lang.yml";
		a.href = "data:text/html," + $("#workplace-lang").val().replace(/\<br\>/g,"%0D%0A").replace(/\n/g,"%0D%0A");
		a.click();
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
				$( "#export-box" ).hide();
			}
        });
	});
	
	$("#import, #close-import").click(function(){
		$("#import-box").toggle();	
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
	
	
	//Show All
	$("#build-show-all").click(function(){
		$("#build-conditions-area").show();
		$("#build-scopes-area").show();	
		$("#build-commands-area").show();	
	});
	
	//Scopes
	$("#build-scopes").click(function(){
		$("#build-scopes-area").toggle();
		$("#build-conditions-area").hide();	
		$("#build-commands-area").hide();
	});
	$(".scope").hover(function() {
		var id = $(this).attr("id");
		$("#"+id+"_info").toggle();
	});
	$(".scope").click(function() {
		var id = $(this).attr("id");
		if($("#"+id+"_info").attr("braces") == "yes"){
			$(".current-build-add-location").removeClass("current-build-add-location").append(id+' = {<br><div class="current-build-add-location"></div><br>}');
		}else{
			$(".current-build-add-location").append(id+'<textarea id="add-build">=</textarea>');
		}
		$("#build-scopes-area").hide();
		$("#submit-build").show();
	});
	
	//Conditions
	$("#build-conditions").click(function(){
		$("#build-conditions-area").toggle();
		$("#build-scopes-area").hide();	
		$("#build-commands-area").hide();
	});
	$(".condition").hover(function() {
		var id = $(this).attr("id");
		$("#"+id+"_info").toggle();
	});
	$(".condition").click(function() {
		var id = $(this).attr("id");
		if($("#"+id+"_info").attr("braces") == "yes"){
			$(".current-build-add-location").removeClass("current-build-add-location").append(id+' = {<br><div class="current-build-add-location"></div><br>}');
		}else{
			$(".current-build-add-location").append(id+'<textarea id="add-build">=</textarea>');
		}
		$("#build-conditions-area").hide();
		$("#submit-build").show();
	});
	
	//Commands
	$("#build-commands").click(function(){
		$("#build-commands-area").toggle();
		$("#build-scopes-area").hide();	
		$("#build-conditions-area").hide();
	});
	$(".command").hover(function() {
		var id = $(this).attr("id");
		$("#"+id+"_info").toggle();
	});
	$(".command").click(function() {
		var id = $(this).attr("id");
		if($("#"+id+"_info").attr("braces") == "yes"){
			$(".current-build-add-location").removeClass("current-build-add-location").append(id+' = {<br><div class="current-build-add-location"></div><br>}');
		}else{
			$(".current-build-add-location").append(id+'<textarea id="add-build">=</textarea>');
		}
		$("#build-commands-area").hide();
		$("#submit-build").show();
	});
	
	
	//Submit
	$("#submit-build").click(function(){
		//#build-preview
		var buildvalue = $("#add-build").val();
		$("#add-build").after(buildvalue);
		$("#add-build").remove();
		$("#"+$(this).attr("build")).val($("#"+$(this).attr("build")).val()+$("#build-preview").text());
		$("#build-preview").empty();
		$(this).attr("build","null");
		$("#builder").hide();
		$(this).hide();
	});
});
