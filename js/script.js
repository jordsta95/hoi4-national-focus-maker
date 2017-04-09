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
		var	name = $("#name").val();
		var desc = $("#desc").val();
		var available = $("#available").val();
		var reward = $("#reward").val();
		var time = $("#time").val();
		if($("#prefocus").val().substr($("#prefocus").val().length - 2 == "&&") || $("#prefocus").val().substr($("#prefocus").val().length - 2 == "||")){
			var prefocus = $("#prefocus").val().slice(0,-2);
			var prefocusandor = true;
		}else{
			var prefocus = $("#prefocus").val();
		}
		if($("#mutual").val().substr($("#mutual").val().length - 2 == "&&") || $("#mutual").val().substr($("#mutual").val().length - 2 == "||")){
			var mutual = $("#mutual").val().slice(0,-2);
			var mutualandor = true;
		}else{
			var mutual = $("#mutual").val();
		}
		var bypass = $("#bypass").val();
		var ai = $("#ai").val();
		var x = parseInt($("#x").val());
		var y = parseInt($("#y").val());
		var gfx = $("#chosen-gfx").val();
		var getgfx = $("#"+gfx).attr("src");
		var id = name.replace(/\s+/g, '').replace(/[^a-zA-Z_0-9]/g, '').toLowerCase();
		var xpos = x*150;
		var ypos = y*150;
		var allinfo = '<div class="all-info" id="'+id+'-all-info"><div id="'+id+'_name">'+name+'</div><div id="'+id+'_description">'+desc+'</div><div id="'+id+'_available">'+available+'</div><div id="'+id+'_reward">'+reward+'</div><div id="'+id+'_time">'+time+'</div><div id="'+id+'_bypass">'+bypass+'</div><div id="'+id+'_prefocus">'+prefocus+'</div><div id="'+id+'_mutual">'+mutual+'</div><div id="'+id+'_ai">'+ai+'</div><div id="'+id+'_gfx">'+getgfx+'</div></div>		';
		$("#display").append('<div id="'+id+'" class="focus" style="top:'+ypos+'px;left:'+xpos+'px;" x-pos="'+x+'" y-pos="'+y+'"><div style="position:relative"><div class="mover up">^&nbsp;&nbsp;</div><div class="mover down">&nbsp;&nbsp;v</div><img src="'+getgfx+'" id="'+id+'_gfx" class="gfx"><div class="name">'+'<p id="'+id+'-name">'+name+'</p></div><div class="mover left">&lt;&nbsp;&nbsp;</div><div class="mover right">&nbsp;&nbsp;&gt;</div><div class="tail"></div></div></div>'+allinfo);
		
		/*if(prefocusandor == true && prefocus.indexOf("&&") != -1){
			var prefocusarray = prefocus.split("&&");
			$.each(prefocusarray, function( index, value ) {
			  var top = parseInt($("#"+value).css("top").replace("px",""))+parseInt($("#"+value).css("height").replace("px",""));
			  if(top.toString().charAt(0) == "-"){
				  var topcalc = top.toString().replace("-","");
			  }else{
			  	var topcalc = top;
			  }
			  var verttop = topcalc+(topcalc / 2);
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
			  if(parseInt($("#"+value).css("left").replace("px","")) < ypos){
			  	var left = parseInt($("#"+value).css("left").replace("px",""))+59;
			  }else{
				var left = ypos+59;  
			  }
			  alert(value+";top: "+topcalc+";vertical: "+verticalcalc+";width: "+widthcalc+";left: "+left);
			  $("#display").append('<div class="connector-norm" id="'+id+'-'+value+'" style="top:'+topcalc+'px;width:'+widthcalc+'px;left:'+left+'px;"></div>');
			  $("#display").append('<div class="connector-norm" id="'+id+'-'+value+'" style="top:'+verttop+'px;width:'+verticalcalc+'px;left:'+left+'px;-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);-o-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);"></div>');
			});	
		}
		if(prefocusandor == true && prefocus.indexOf("||") != -1){
			
		}*/
		
		$("#name").val("");
		$("#desc").val("");
		$("#available").val("");
		$("#reward").val("");
		$("#time").val("");
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
			$("#x").val(getx);
			$("#y").val(gety);
			$("#chosen-gfx").val(getgfx.replace("images/","").replace(".png",""));
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
	});
	//Move focus left
	$(document).on('click', ".left", function() {
		if(parseInt($(this).parent().parent().css("left").replace("px","")) > 99){
			$(this).parent().parent().animate({left: '+=-150px'}, 0);
			$(this).parent().parent().attr("x-pos",parseInt($(this).parent().parent().attr("x-pos"))-1);
		}
	});
	//Move focus down
	$(document).on('click', ".down", function() {
		$(this).parent().parent().animate({top: '+=150px'}, 0);
		$(this).parent().parent().attr("y-pos",parseInt($(this).parent().parent().attr("y-pos"))+1);
	});
	//Move focus up
	$(document).on('click', ".up", function() {
		if(parseInt($(this).parent().parent().css("top").replace("px","")) > 149){
			$(this).parent().parent().animate({top: '+=-150px'}, 0);
			$(this).parent().parent().attr("y-pos",parseInt($(this).parent().parent().attr("y-pos"))-1);
		}
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
	
	/* Export text files*/
	$("#export").click(function(){
		$("#workplace-focus").val("focus_tree = {<br>id = my_focus_tree<br>country = {<br>factor=0<br>modifier = {<br>add = 10\n#place country tag(s) here<br>}<br>}\ndefault = no<br>#Custom focuses start here<br>");
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
			var exportgfx = $(exportimg).text();
			var fixprefocus = $(exportprefocus).text().replace(/&&/g,"}\n prerequisite = { focus =").replace(/||/g,"  focus = ");
			var fixmutual = $(exportmutual).text().replace(/&&/g,"}\n mutually_exclusive = { focus =").replace(/||/g,"  focus = ");
		
			$("#workplace-lang").val($("#workplace-lang").val() + exportid + ':0 "' + $(exportname).text() + '"\n');
			$("#workplace-lang").val($("#workplace-lang").val() + exportid + '_desc:0 "' + $(exportdesc).text() + '"\n');
			
			$("#workplace-focus").val($("#workplace-focus").val() + '#Focus for - '+ $(exportname).text() + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val()+'focus = {<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'id ='+ exportid + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'icon ='+ exportgfx.replace(".png","").replace("images/","GFX_") + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'bypass ='+ exportbypass + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'x ='+ exportx + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'y ='+ exporty + '<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'mutually_exclusive = { focus = '+ fixmutual + '}<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'prerequisite = { focus = '+fixprefocus + '}<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'available = { '+ $(exportavailable).text() + ' }<br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'cost = '+ $(exportttc).text() + ' \n available_if_capitulated = yes <br>');
			$("#workplace-focus").val($("#workplace-focus").val() + 'completion_reward = {<br>'+ $(exportreward).text() + '<br>}<br>}<br>');
		});
		$("#workplace-focus").val($("#workplace-focus").val()+"#end<br>}");
		
		var a = document.body.appendChild(document.createElement("a"));
		a.download = "national-focus-tree.yml";
		a.href = "data:text/html," + $("#workplace-focus").val().replace(/\<br\>/g,"%0D%0A");
		a.click();
		
		var a = document.body.appendChild(document.createElement("a"));
		a.download = "national-focus-tree-lang.yml";
		a.href = "data:text/plain," + $("#workplace-lang").val();
		a.click();
	});
	
	/*
	$("#focustree").val($("#focustree").val()+"focus_tree = {\nid = my_focus_tree\ncountry = {\nfactor=0\nmodifier = {\nadd = 10\n#place country tag(s) here\n}\n}\ndefault = no\n#Custom focuses start here\n");
$('.all-info').each(function () {
		var exportid = $(this).attr("id").replace("-all-info","");
		var exportname = "#"+exportid+"_name";
		var exportdesc = "#"+exportid+"_desc";
		var exportprefocus = "#"+exportid+"_prefocus";
		var exportavailable = "#"+exportid+"_available";
		var exportmutual = "#"+exportid+"_mutual";
		var exportimg = "#"+exportid+"_gfx";
		var exportreward = "#"+exportid+"_reward";
		var exportttc = "#"+exportid+"_ttc";
		var exportx = $(this).attr("x-pos");
		var exporty = $(this).attr("y-pos");
		var exportgfx = $(exportimg).text();
		var fixprefocus = $(exportprefocus).text().replace(/&&/g,"}\n prerequisite = { focus =").replace(/||/g,"  focus = ");
		var fixmutual = $(exportmutual).text().replace(/&&/g,"}\n mutually_exclusive = { focus =").replace(/||/g,"  focus = ");
		/ Create Lang info /
		$("#langfile").val($("#langfile").val() + exportid + ':0 "' + $(exportname).text() + '"\n');
		$("#langfile").val($("#langfile").val() + exportid + '_desc:0 "' + $(exportdesc).text() + '"\n');
		/ Create Focuses /
		$("#focustree").val($("#focustree").val() + '#Focus for - '+ $(exportname).text() + '\n');
		$("#focustree").val($("#focustree").val() + 'focus = {\n');
		$("#focustree").val($("#focustree").val() + 'id ='+ exportid + '\n');
		$("#focustree").val($("#focustree").val() + 'icon ='+ exportgfx.replace(".png","").replace("images/","GFX_") + '\n');
		$("#focustree").val($("#focustree").val() + 'x ='+ exportx + '\n');
		$("#focustree").val($("#focustree").val() + 'y ='+ exporty + '\n');
		$("#focustree").val($("#focustree").val() + 'mutually_exclusive = { focus = '+ fixmutual + '}\n');
		$("#focustree").val($("#focustree").val() + 'prerequisite = { focus = '+fixprefocus + '}\n');
		$("#focustree").val($("#focustree").val() + 'available = { '+ $(exportavailable).text() + ' }\n');
		$("#focustree").val($("#focustree").val() + 'cost = '+ $(exportttc).text() + ' \n available_if_capitulated = yes \n');
		$("#focustree").val($("#focustree").val() + 'completion_reward = {\n'+ $(exportreward).text() + '\n}\n}\n');
	});	
	$("#focustree").val($("#focustree").val()+"#end\n}");
	*/
	
});
