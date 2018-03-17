<?php
if(isset($_POST['workplace-focus'])){

$errors = []; 
$added = [];

$json = json_decode($_POST['workplace-focus']);
$lang = $_POST['workplace-lang'];
$lan = (string)$_POST['tree-language'];
if($json->treeid){
    $folder = $json->treeid."-".date('Ymdgis');
    //Create directory
    mkdir($folder);
    mkdir($folder.'/gfx');
    mkdir($folder.'/gfx/interface');
    mkdir($folder.'/gfx/interface/goals');
    mkdir($folder.'/interface');
}else{
    $errors[] = 'You tried submitting a focus tree without setting a focus tree ID';
}

$tree = "";
$tree .= str_replace("<br>","\r\n",$json->start);
$customGFX = "spriteTypes = { \r\n";

foreach($json->focuses as $focus){
	if($focus->name !== "" && $focus->name !== "undefined" && !in_array($focus->id, $added)){
        $added[] = $focus->id;
        $fortree = '';
		$fortree .= '#Focus for '.$focus->name.' 
		';
		$fortree .= 'focus = { 
		';
		if(strpos($focus->icon,"data:image/png;") !== false){
			$image = base64_decode(str_replace("data:image/png;base64,","",$focus->icon));
			file_put_contents($folder.'/gfx/interface/goals/'.$focus->id.'.png',$image);
			$img = new Imagick($folder.'/gfx/interface/goals/'.$focus->id.'.png'); //Load the uploaded image
			$img->setformat('tga'); //Set the format to tga
			$img->writeimage($folder.'/gfx/interface/goals/GFX_'.$focus->id.'.tga'); //Write/save the dds texture
			$icon = 'GFX_'.$focus->id;
			$customGFX .= '##Icon For: '.$focus->id.' \r\n SpriteType = { \r\n name = "'.$icon.'" \r\n texturefile = "gfx/interface/goals/'.$icon.'.tga" \r\n }';
		}else{
			$rem_png = str_replace(".png","",$focus->icon);
			$icon = str_replace("images/","GFX_",$rem_png);
		}
		$fortree .= 'id = '.$focus->id.' 
		';
		$fortree .= 'icon = '.$icon.' 
		';
		$fortree .= str_replace("<br>"," \r\n ",str_replace("'",'"',$focus->everythingelse));
		$fortree .= '}';
        $opening = substr_count($fortree, '{');
        $closing = substr_count($fortree, '}');
        if($opening !== $closing){
            $errors[] = $focus->name.' has inconsistent braces: <i>'.$opening.'x {</i> & <i>'.$closing.'x }</i><br>This issue will be found in the one of the following: rewards, available, and bypass sections<br><strong>To resolve this issue, you will need to count how many opening/closing braces you have in each of the previously stated text boxes, and add the missing opening/closing braces where it is missing.';
        }
        $tree .= $fortree;
	}
}
$tree .= '#End of focuses 
}';
if($errors){
    ?>
    <style>
    html,body{font-family: monospace;padding: 0;margin: 0;}
    .h1{background: #1b93e1;color: #fff;margin-bottom: 1rem;}
    div{padding: 1rem;}
    </style>
    <?php
    echo '<div class="h1"><h1>Your file could not be exported as it contains at least 1 common error</h1></div>';
    echo '<div>';
    foreach ($errors as $error) {
        echo '- '.$error.'<hr>';
    }
    echo '<br> <span style="color:red;">Please report these errors <a href="https://github.com/jordsta95/hoi4-national-focus-maker/issues">on Github</a> and make reference to what caused the error.';
    echo '</div>';
    die();
}

mkdir($folder.'/common');
mkdir($folder.'/common/national_focus');
$focustreefile = './'.$folder.'/common/national_focus/'.$json->treeid.".txt";
$focustreecontent = $tree;
if (file_put_contents($focustreefile, $focustreecontent) !== false) {
    echo "File created (" . basename($focustreefile) . ")";
} else {
    echo "Cannot create file (" . basename($focustreefile) . ")";
}
mkdir($folder.'/localisation');

$langfile = './'.$folder.'/localisation/'.$json->treeid."_l_".$lan.".yml";
$langfilecontent = chr(239) . chr(187) . chr(191) . str_replace("<br>","\r\n",$lang);
if (file_put_contents($langfile, $langfilecontent) !== false) {
    echo "File created (" . basename($langfile) . ")";
} else {
    echo "Cannot create file (" . basename($langfile) . ")";
}
$customGFX .= " \r\n }";
$customgfxfile = $folder.'/interface/customicons.gfx';
if (file_put_contents($customgfxfile, $customGFX) !== false) {
    echo "File created (" . basename($langfile) . ")";
} else {
    echo "Cannot create file (" . basename($langfile) . ")";
}


if(isset($json->treeid)){
$zip_file_name = $json->treeid.'.zip';
}else{
$zip_file_name = 'unnamed.zip';	
}
$download_file = true;
//$delete_file_after_download= true; doesnt work!!
class FlxZipArchive extends ZipArchive{
    /** Add a Dir with Files and Subdirs to the archive;;;;; @param string $location Real Location;;;;  @param string $name Name in Archive;;; @author Nicolas Heimann;;;; @access private  **/
    public function addDir($location, $name){
        $this->addEmptyDir($name);
        $this->addDirDo($location, $name);
     } // EO addDir;
    /**  Add Files & Dirs to archive;;;; @param string $location Real Location;  @param string $name Name in Archive;;;;;; @author Nicolas Heimann
     * @access private   **/
    private function addDirDo($location, $name){
        $name .= '/';
        $location .= '/';
        // Read all Files in Dir
        $dir = opendir ($location);
        while ($file = readdir($dir))
        {
            if ($file == '.' || $file == '..') continue;
            // Rekursiv, If dir: FlxZipArchive::addDir(), else ::File();
            $do = (filetype( $location . $file) == 'dir') ? 'addDir' : 'addFile';
            $this->$do($location . $file, $name . $file);
        }
    } // EO addDirDo();
}
$za = new FlxZipArchive;
$res = $za->open($zip_file_name, ZipArchive::CREATE);
if($res === TRUE) {
    $za->addDir($folder, basename($folder));
    $za->close();
}
else  { echo 'Could not create a zip archive';}

if ($download_file){
    ob_get_clean();
    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: private", false);
    header("Content-Type: application/zip");
    header("Content-Disposition: attachment; filename=" . basename($zip_file_name) . ";" );
    header("Content-Transfer-Encoding: binary");
    header("Content-Length: " . filesize($zip_file_name));
    readfile($zip_file_name);

    //deletes file when its done...
    //if ($delete_file_after_download) 
    //{ unlink($zip_file_name); }
}

//Delete directory
$dir = $folder;
unlink($zip_file_name);usleep(100);
array_map('unlink', glob("$folder/gfx/interface/goals/*.*"));usleep(100);
array_map('unlink', glob("$folder/gfx/interface/*.*"));usleep(100);
array_map('unlink', glob("$folder/gfx/*.*"));usleep(100);
array_map('unlink', glob("$folder/common/national_focus/*.*"));usleep(100);
array_map('unlink', glob("$folder/common/*.*"));usleep(100);
array_map('unlink', glob("$folder/localisation/*.*"));usleep(100);
array_map('unlink', glob("$folder/interface/*.*"));usleep(100);
array_map('unlink', glob("$folder/*.*"));usleep(100);
rmdir($folder.'/common/national_focus');usleep(100);
rmdir($folder.'/common');usleep(100);
rmdir($folder.'/localisation');usleep(100);
rmdir($folder.'/gfx/interface/goals');usleep(100);
rmdir($folder.'/gfx/interface');usleep(100);
rmdir($folder.'/gfx');usleep(100);
rmdir($folder.'/interface');usleep(100);
rmdir($folder);
}
?>
