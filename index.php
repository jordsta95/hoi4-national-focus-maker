<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>HOI4 National Focus Tool</title>
<?php include 'php/head.php'; ?>
<?php $v = '1.5.1-0.05'; ?>
<meta name="description" content="Tool for making national focuses in Hearts of Iron IV">
<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.min.css?v=1" rel='stylesheet' type='text/css' />
<!-- Custom CSS -->
<link href="css/style.css?v=<?php echo $v; ?>" rel='stylesheet' type='text/css' />
<!-- Graph CSS -->
<link href="css/font-awesome.css?v=1" rel="stylesheet"> 
<!-- jQuery -->
<script src="js/jquery-2.1.4.min.js?v=1"></script>
<!-- //jQuery -->
<script src="js/script.js?v=<?php echo $v; ?>"></script>
<script src="js/tree-to-json.js?v=<?php echo $v; ?>"></script>
<script src="js/ui-elements.js?v=<?php echo $v; ?>"></script>
<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
<!-- lined-icons -->
<link rel="stylesheet" href="css/icon-font.min.css?v=1" type='text/css' />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head> 
<body>
<div id="display-password">
</div>
<div class="errors inactive">
	<span class="numbers"></span>
	<span class="message"></span>
</div>
<div class="page-container">
<div class="popup_container_wrapper">
	<div class="popup_container">
	   	<div id="edit-focus" class="open-closeable">	
			<div class="panel" style="left:265px">
				<div class="panel-head">
				<p id="edit-focus-close" class="close-button open-closeable">X</p>
					<h3>Add/Edit Focus</h3>
				</div>
				<div class="panel-body">
					<div>
						<p>Name</p>
						<input id="name" />
					</div>
					<div>
						<p>Description</p>
						<textarea id="desc"></textarea>
					</div>
						<div>
						<button id="open-gfx">Choose GFX</button>
						<input id="chosen-gfx" value="goal_unknown" hidden />
						<img src="images/goal_unknown.png" id="display-gfx" />
						<br /><label for="customgfx">Or choose your own</label><br /> <input name="customgfx" id="customgfx" type="file" /><br />
						<p>Custom focus GFX needs to be in a PNG format with a recommended Width: 95px Height: 85px</p>
					</div>
					<div id="choosegfx">
						<?php
						$directory = 'images/';
						$scanned_directory = array_diff(scandir($directory, 1), array('..', '.'));
						foreach ($scanned_directory as $value) {
							$file = 'images/' . $value;
							$id = str_replace(".png","",$value);
							echo '<img id="'.$id.'" class="nficon" src="'.$file.'" />';
						}
						?>
				</div>
					<div>
						<p>Bypass</p>
						<textarea id="bypass"></textarea>
					</div>
					<div>
						<p>Available</p>
						<textarea id="available"></textarea>
					</div>
					<div>
						<p>Mutually Exclusive</p>
						<input id="mutual" />
					</div>
					<div>
						<p>Prerequisite</p>
						<input id="prefocus" />
					</div>
					<div>
						<p>AI Will Do Factor</p>
						<input id="ai" type="number" />
					</div>
					<div>
						<p>Time to Complete</p>
						<select id="time">
							<option value="1">1 Week</option>
							<option value="2">2 Weeks</option>
							<option value="3">3 Weeks</option>
							<option value="4">4 Weeks</option>
							<option value="5">5 Weeks</option>
							<option value="6">6 Weeks</option>
							<option value="7">7 Weeks</option>
							<option value="8">8 Weeks</option>
							<option value="9">9 Weeks</option>
							<option value="10" selected>10 Weeks</option>
							<option value="11">11 Weeks</option>
							<option value="12">12 Weeks</option>
							<option value="13">13 Weeks</option>
							<option value="14">14 Weeks</option>
							<option value="15">15 Weeks</option>
						</select>
					</div>
					<div>
						<p>Location - X|Y</p>
						<input id="x" />|<input id="y" />
					</div>
					<div>
						<p>Complete Tooltip</p>
						<textarea id="tooltip"></textarea>
					</div>
					<div>
						<p>Reward</p>
						<p>Use <abbr title="As you type possible options will apear as placeholders. Press enter, tab, or right arrow key to auto-complete">predictive input</abbr>? <input id="predictive_reward" type="checkbox"></p>
						<div class="reward_wrapper">
							<textarea id="reward"></textarea>
							<textarea id="reward_underlay"></textarea>
						</div>
					</div>
					<div>
						<button id="submit-focus">Submit</button>
					</div>
				</div>
			</div>
		</div>
		<div id="export-help-box" class="open-closeable">	
			<div class="panel" style="left:265px">
				<div class="panel-head">
				<p id="export-help-box-close" class="close-button open-closeable">X</p>
					<h3>Export Help</h3>
				</div>
				<div class="panel-body">
					<p>Saving to local storage will allow you to leave this page, and return with your focus tree exactly how you left it.</p>
					<p>Saving to server will allow you to save your current focus tree to the server, and access it from any location using the password you will be given once the focus tree has saved.</p>
					<p>Exporting to file will export a zip file. You will have 1 folder inside the zip file, and 4 sub-folders. Those 4 sub-folders will need to be dragged into your mod's main directory. If you have uploaded a custom icon, you may need to re-save the .tga file with a different encoding format if it doesn't appear in game.</p>
				</div>
			</div>
		</div>
		<div id="help-box" class="open-closeable">
			<div class="panel" style="left:265px">
				<div class="panel-head">
				<p id="help-box-close" class="close-button open-closeable">X</p>
					<h3>How to use this tool</h3>
				</div>
				<div class="panel-body">
					<p>By pressing the "Add Focus" button at the top of the page you will be able to start creating your focus tree</p>
				<p>Once you have created a focus you will be able to select it when creating a new focus as a prerequisite/mutually exclusive focus</p>
				<p>If you have made a mistake in one of the focuses, simply click the one you want to edit, and the editor will open up with the focus information in it<br />If you select the checkbox for delete mode, you will delete focuses when you click them.</p>
				<hr>
				<h4>How does the available/rewards section work?</h4>
				<p>You will be given a popup box when you click the boxes which will allow you to build these with relative ease. However, the default formatting may not work for all of the things you try.</p>
				</div>
			</div>
		</div>
		<!-- Save to server -->
		<div id="server-box" class="open-closeable">
			<div class="panel" style="left:265px">
				<div class="panel-head">
				<p id="server-box-close" class="close-button open-closeable">X</p>
					<h3>Save to Server</h3>
				</div>
				<div class="panel-body">
					<p>If you would like your focuses to be public, e.g. anyone can use them, check the box below</p>
					<p><input id="public_focuses" type="checkbox" /></p>
					<p>Please input which country/countries your focus(es) relate to seperated by comma for multiple countries, e.g ENG,SOV,GER<br />If it is for a generic focus tree leave it blank.</p>
					<p><input id="country_tags" /></p>
					<button id="savetoserver">Save To Server</button>
				</div>
			</div>
		</div>
		<div id="import-box" class="open-closeable">
			<div class="panel" style="left:265px">
				<div class="panel-head">
				<p id="import-box-close" class="close-button open-closeable">X</p>
					<h3>Import</h3>
				</div>
				<div class="panel-body">
					<p>Input the password of the focus(es) you want to add into the textbox below, or leave it blank to see all public focuses.</p>
					<input name="import_password" id="import_password" />
					<button id="sub-pass">Submit Password</button>
					<p><strong>Or</strong> paste an existing focus tree into the text box below, and press the "Import Focus Tree" button below it, to import an existing focuses from a focus tree</p>
					<table cellpadding="0" border="0" cellspacing="0" width="100%">
					<tr>
						<th>Focus Tree</th>
						<th>Localisation</th>
					</tr>
					<tr>
						<td><textarea id="existing-focus-tree"></textarea></td>
						<td><textarea id="existing-localisation"></textarea></td>
					</tr>
					</table>
					<textarea id="existing-focus-tree-output" style="display:none;"></textarea>
					<p><button id="treetojson">Import Focus Tree</button></p>
					<div id="show-output">
					</div>
				</div>
			</div>
		</div>
		
		<div id="selectfocusarea" class="open-closeable">
			<div class="panel">
				<div class="panel-head">
				<p id="selectfocusarea-close" class="close-button open-closeable">X</p>
					<h3>Select Focus</h3>
				</div>
				<div class="panel-body">
					<p>Want to select multiple? Choose whether you want all to be required, or any to be required</p>
					<p>ALL - <input type="checkbox" id="select-and" style="width:1rem;" /> | ANY - <input type="checkbox" id="select-or" style="width:1rem;" /> | RESET - <input type="checkbox" id="select-reset" style="width:1rem;" /> </p>
					<div id="selectfocus">
					</div>
				</div>
			</div>
		</div>
		<div id="builder" class="open-closeable">
			<div class="panel">
				<div class="panel-head">
				<p id="builder-close" class="close-button open-closeable">X</p>
					<h3>Available/Bypass/Reward</h3>
				</div>
				<div class="panel-body">
					<p>Search</p>
					<p><input id="searchjson" /></p>
					<small>After searching, click the output to see the example, click the example to add it to the builder</small>
					<div id="popularsearches">
						<h4>Common searches</h4>
						<p class="build-description" id="add_political_power_cs" tag="no" state="no" iscustom="yes">Add Political Power</p>
						<div class="default-outcome" id="add_political_power_cs_defaultoutcome" iscustom="yes">add_political_power = 50</div>
						<div class="build-hover" id="add_political_power_cs_hover" iscustom="yes">add_political_power = 50</div>
						<p class="build-description" id="add_civ_factory_cs" tag="no" state="no">Add Civilian Factory To Any Owned State</p>
						<div class="default-outcome" id="add_civ_factory_cs_defaultoutcome" iscustom="yes">
							random_owned_controlled_state = {<br />
							&#09;	limit = {<br />
							&#09;&#09;	free_building_slots = {<br />
							&#09;&#09;&#09;		building = industrial_complex<br />
							&#09;&#09;&#09;		size > 0<br />
							&#09;&#09;&#09;		include_locked = yes<br />
							&#09;&#09;	}<br />
							&#09;	}<br />
							&#09;	add_extra_state_shared_building_slots = 1<br />
							&#09;	add_building_construction = {<br />
							&#09;&#09;	type = industrial_complex<br />
							&#09;&#09;	level = 1<br />
							&#09;&#09;	instant_build = yes<br />
							&#09;	}<br />
							&#09;	set_state_flag = REPLACE_ME_WITH_UNIQUE_IDENTIFIER<br />
							}
						</div>
						<div class="build-hover" id="add_civ_factory_cs_hover" iscustom="yes">
							random_owned_controlled_state = {<br />
							&#09;	limit = {<br />
							&#09;&#09;	free_building_slots = {<br />
							&#09;&#09;&#09;		building = industrial_complex<br />
							&#09;&#09;&#09;		size > 0<br />
							&#09;&#09;&#09;		include_locked = yes<br />
							&#09;&#09;	}<br />
							&#09;	}<br />
							&#09;	add_extra_state_shared_building_slots = 1<br />
							&#09;	add_building_construction = {<br />
							&#09;&#09;	type = industrial_complex<br />
							&#09;&#09;	level = 1<br />
							&#09;&#09;	instant_build = yes<br />
							&#09;	}<br />
							&#09;	set_state_flag = REPLACE_ME_WITH_UNIQUE_IDENTIFIER<br />
							}
						</div>
						<p class="build-description" id="add_mil_factory_cs" tag="no" state="no" iscustom="yes">Add Military Factory To Any Owned State</p>
						<div class="default-outcome" id="add_mil_factory_cs_defaultoutcome" iscustom="yes">
							random_owned_controlled_state = {<br />
							&#09;	limit = {<br />
							&#09;&#09;	free_building_slots = {<br />
							&#09;&#09;&#09;		building = arms_factory<br />
							&#09;&#09;&#09;		size > 0<br />
							&#09;&#09;&#09;		include_locked = yes<br />
							&#09;&#09;	}<br />
							&#09;	}<br />
							&#09;	add_extra_state_shared_building_slots = 1<br />
							&#09;	add_building_construction = {<br />
							&#09;&#09;	type = arms_factory<br />
							&#09;&#09;	level = 1<br />
							&#09;&#09;	instant_build = yes<br />
							&#09;	}<br />
							&#09;	set_state_flag = REPLACE_ME_WITH_UNIQUE_IDENTIFIER<br />
							}
						</div>
						<div class="build-hover" id="add_mil_factory_cs_hover" iscustom="yes">
							random_owned_controlled_state = {<br />
							&#09;	limit = {<br />
							&#09;&#09;	free_building_slots = {<br />
							&#09;&#09;&#09;		building = arms_factory<br />
							&#09;&#09;&#09;		size > 0<br />
							&#09;&#09;&#09;		include_locked = yes<br />
							&#09;&#09;	}<br />
							&#09;	}<br />
							&#09;	add_extra_state_shared_building_slots = 1<br />
							&#09;	add_building_construction = {<br />
							&#09;&#09;	type = arms_factory<br />
							&#09;&#09;	level = 1<br />
							&#09;&#09;	instant_build = yes<br />
							&#09;	}<br />
							&#09;	set_state_flag = REPLACE_ME_WITH_UNIQUE_IDENTIFIER<br />
							}
						</div>
					</div>
					<div id="searchoutput">
					</div>
					<div id="build-output" style="margin-top:2rem;">
						<div id="build-preview" class="current-build-add-location">
						</div>
						<button id="submit-build" build="null">Submit</button>
					</div>
				</div>
			</div>
		</div>
		<div id="tag-box" class="open-closeable">
			<div class="panel">
				<div class="panel-head">
				<p id="tag-box-close" class="close-button open-closeable">X</p>
					<h3>TAG Selector</h3>
				</div>
				<div class="panel-body">
					<p>Search for a country</p>
					<p><input id="searchtags" /></p>
					<div id="tagsearchoutput">
					</div>
				</div>
			</div>
		</div>
		<div id="state-box" class="open-closeable">
			<div class="panel">
				<div class="panel-head">
				<p id="state-box-close" class="close-button open-closeable">X</p>
					<h3>State Selector</h3>
				</div>
				<div class="panel-body">
					<p>Search for a state name</p>
					<p><input id="searchstates" /></p>
					<div id="statesearchoutput">
					</div>
				</div>
			</div>
		</div>
		<div id="export-box" class="open-closeable">
			<div class="panel" style="left:265px">
				<div class="panel-head">
				<p id="export-box-close" class="close-button open-closeable">X</p>
					<h3>Export</h3>
				</div>
				<div class="panel-body">
					<p>Focus tree ID (ASCII alphabet characters only - all spaces will be removed)</p>
					<form action="zip.php" method="POST" target="_blank">
					<p><input name="focus-tree-id" id="focus-tree-id" /></p>
					<p>Language ID (braz_por is Portuguese)</p>
					<select id="tree-language" name="tree-language">
						<option id="braz_por">braz_por</option>
						<option id="english">english</option>
						<option id="french">french</option>
						<option id="german">german</option>
						<option id="polish">polish</option>
						<option id="russian">russian</option>
						<option id="spanish">spanish</option>
					</select>
					<p>Country this focus tree is for</p>
					<p><input id="export-country" name="export-country" /></p>
					<p id="export-country-results">Start typing to search for country</p>
					<div style="display:none;">
						<textarea id="workplace-lang" name="workplace-lang"></textarea>
						<textarea id="workplace-focus" name="workplace-focus"></textarea>
					</div>
					<p><button id="export-focus">Export Focus</button><input type="submit" id="export-focus-hidden" value="Export Focus" hidden /></p>
					</form>
					<p>Upon pressing the Export Focus button you will be given a zip file which contains a single folder. Open that folder, and you will have 4 sub-folders. Copy these into the main directory for your mod; interfaces and gfx will not be needed if you have not used any custom icons.</p>
				</div>
			</div>
		</div>
		<div id="help-out-box" class="open-closeable">
			<div class="panel" style="left:265px">
				<div class="panel-head">
					<p id="help-out-box-close" class="close-button open-closeable">X</p>
					<h3>Help Out</h3>
				</div>
				<div class="panel-body">
					<h4>Help with coding</h4>
					<p>Helping with coding could make the tool grow and evolve much faster, if you understand Javascript/jQuery and/or PHP, as well as basic CSS and HTML you may be able help out.</p>
					<p>The code behind this tool is available <a href="https://github.com/jordsta95/hoi4-national-focus-maker/">on GitHub</a></p>
					<h4>Help keep the site running</h4>
					<p>Being web-based, this tool requires a server to run on. And when it comes to websites, I will never put anything on it which I wouldn't want to see myself, which means no adverts.</p>
					<p>$10 a month is all it costs to keep this tool online. I am more than happy to pay this myself, though any donations towards the upkeep are greatly appreciated, and I will find a way to honour anyone who donates.</p>
					<p style="text-align:center;margin-top:2.5rem;"><a class="donate" href="https://www.paypal.me/hoi4modding" target="_blank">Donate</a></p>
				</div>
			</div>
		</div>
		<div style="display:none;">
			<p id="max-x">30</p>
			<p id="max-y">10</p>
		</div>
		<div id="editing"></div>
	</div>
</div>
   <!--/content-inner-->
<div class="left-content">
	   <div class="mother-grid-inner">
             <!--header start here-->
				<div class="header-main">
					<div style="position:relative">
						<div id="display">
						</div>
					</div>
				</div>
<!--heder end here-->
			
<!-- script-for sticky-nav -->
		<script>
		$(document).ready(function() {
			 var navoffeset=$(".header-main").offset().top;
			 $(window).scroll(function(){
				var scrollpos=$(window).scrollTop(); 
				if(scrollpos >=navoffeset){
					$(".header-main").addClass("fixed");
				}else{
					$(".header-main").removeClass("fixed");
				}
			 });
			 
		});
		</script>
		<!-- /script-for sticky-nav -->
<!--inner block start here-->
<div class="inner-block">

</div>
<!--inner block end here-->
</div>
</div>
  <!--//content-inner-->
			<!--/sidebar-menu-->
				<div class="sidebar-menu">
					<header class="logo1">
						<span class="sidebar-icon"> <span class="fa fa-bars"></span> </span> 
					</header>
						<div style="border-top:1px ridge rgba(255, 255, 255, 0.15)"></div>
                           <div class="menu">
									<ul id="menu" >
										<li id="edit-focus-open"  class="open-closeable"><p><i class="fa fa-plus"></i> <span>Add Focus</span></p></li>
									 	<li class="sub-menu" ><p><i class="fa fa-download" aria-hidden="true"></i><span> Save/Export</span> <span class="fa fa-angle-right" style="float: right"></span></p>
											<ul class="sub-menu" >
										  		<li id="savetostorage" ><p>Save To Storage</p></li>
												<li id="server-box-open" class="open-closeable"><p>Save To Server</p></li>
												<li id="export-box-open" class="open-closeable"><p>Export Files</p></li>
												<li id="export-help-box-open" class="open-closeable"><p>Save/Export Help</p></li>
										  	</ul>
										</li>
										<li id="import-box-open" class="open-closeable"><p><i class="fa fa-file" aria-hidden="true"></i><span>Import</span></p></li>
										<li id="help-box-open" class="open-closeable"><p><i class="fa fa-question"></i>  <span>Help</span></p></li>
										<li><p><i class="fa fa-trash"></i>  <span>Delete Mode</span></p>
											<ul class="sub-menu" >
										  		<li><p><label for="delete">Enable Delete Mode? <input type="checkbox" id="delete" name="delete" style="width:1rem;"></label></p></li>
												<li><p><button id="delete-all" style="color:black;">Delete All</button></p></li>
										  	</ul>
										</li>
										<li id="help-out-box-open" class="open-closeable"><p><span>Help Out</span></p></li>
									</ul>
								</div>
							  </div>	
							</div>
						
							<script>
							var toggle = true;
										
							$(".sidebar-icon").click(function() {                
							  if (toggle)
							  {
								$(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
								$(".panel").css({"left":"70px"});
							  }
							  else
							  {
								$(".page-container").removeClass("sidebar-collapsed").addClass("sidebar-collapsed-back");
								setTimeout(function() {
								  $(".panel").css({"left":"234px"});
								}, 400);
							  }
											
											toggle = !toggle;
										});
								
							</script>
							

</body>
</html>