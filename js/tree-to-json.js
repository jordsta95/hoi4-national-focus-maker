$(document).ready(function(){
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
			if(focus[i].hasOwnProperty('id')){
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
		}
		return json;
		
	}
});