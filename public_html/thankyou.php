<?php
session_start(); // used to pass userId from page to page
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Thank You</title>
<?php
include 'includes/head-base.html';
?>
</head>

<body>
	
<?php
include 'includes/header.html';
?>
  <!-- division for content-->
  <section> 
<?php
include 'includes/feeback-link.html';
?>
	<div id="content_paragraph">
	
		<!--Page header-->
		<h2 class="heading_font">Thank You</h2>
		<hr class="heading"><br/>
	
		<!-- webpage content -->
		<p class="paragraph_font"> Thank you for your participation. Below is the initial result of your test session: <br/><br/>
		Some simple feedbacks will be provided here for the users. For example: heatmap and time taken to finish the task. <br/><br/>
			
		Questions regarding consent will be asked for the last time before storing test data in the database	</p>
		<br/>
		<br/>
	
	
	
		<!-- section for buttons -->
		<div>
			<!-- Buttons to return to home-->
			<a href="home.php"><input class="bttn" id="homeBttn" type= "submit" value="Exit to Home"/></a>
			<br/>
		</div>
	
	</div>
  </section>
	
	
	<!--footer section-->
	<footer>
		<p>Software Engineering Project A<p>
		<p>&#169; Swinburne University of Technology</p>
	</footer>

</body>

</html>