<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Parser</title>
<style>
body,html{
    white-space: pre-wrap; 
}
</style>
</head>
<body>
<?php
if(!isset($_POST['focustree'])){
	echo '
	<form action="" method="POST">
	<textarea name="focustree" id="focustree">
	</textarea><br>
	<input type="submit">
	</form>
	';
}else{
	$unedited_focus = $_POST['focustree'];
	$strings = array('default = no','default = yes','default=no','default=yes');
	$remove_pre_default = $unedited_focus;
	foreach($strings as $replacestring){
		$remove_pre_default = str_replace($replacestring,"SPLITSTRINGHEREANDREMOVE0",$remove_pre_default);
	}
	$explodefocus = explode("SPLITSTRINGHEREANDREMOVE0",$remove_pre_default);
	//echo $explodefocus[1];
	$rem_last_brace = rtrim($explodefocus[1],"}");
	$array = explode("\n",$rem_last_brace);
	foreach($array as $arr) {
		if(substr( $arr, 0, 1 ) !== "#") {
			$output[] = $arr;
		}
	}
	$out = implode("\n",$output);
	$focuses = explode("focus = {",$out);
	$num = 0;
	foreach($focuses as $focus){
		if (strpos($focus, 'id = ') !== false || strpos($focus, 'id =') !== false || strpos($focus, 'id= ') !== false || strpos($focus, 'id=') !== false) {
			$rem_brace = ltrim($focus,"}");
			$out = implode("\n",$output);
			echo '<h3>'.$num.'</h3>'.$rem_brace.'<hr>';
			$num++;
		}
	}
}
?>
</body>
</html>