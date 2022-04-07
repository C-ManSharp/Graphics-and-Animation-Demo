<html>

<head>

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="stylesheet" href="CSS/index.css">

<title>Castle</title>

<style>
body { margin: 0; }
canvas { width: 100%; height: 100% }
</style>

</head>

<body>
<!-- <script src="https://threejs.org/build/three.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/FirstPersonControls.js"></script>
<script src="js/TextureManager.js"></script>
<script src="js/AddTextures.js"></script>
<script src="src/TextureLoader.js"></script>
<script src="js/cannon.js"></script>
<script src="src/main.js" type="module"></script>
<!--- 
    <script src="src/modelCreator.js" type="module"></script> 
    --->
    <table id="UITable">
			<tr>
				<th id="dummyHitCountHeader">Dummy hit count: </th>
                <td id="dummyHitCountData">0</td>
			</tr>
			<tr>
				<th id="drawbridgeHeader">Drawbridge Status: </th>
				<td id="drawbridgeData">Closed</td>
			</tr>
			<tr>
				<th id="rainStatusHeader">Rain Status: </th>
				<td id="rainStatusData">Is raining</td>
			</tr>
			<tr>
				<th id="dummyHitNotification"></th>
			</tr>
		</table>
</body>

</html>