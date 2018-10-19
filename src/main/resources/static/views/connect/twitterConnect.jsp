<%-- 
    Document   : twitterConnect
    Created on : 15-ago-2016, 0:25:46
    Author     : JAIR
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Hello Twitter</title>
	</head>
	<body>
		<h3>Connect to Twitter</h3>

		<form action="/connect/twitter" method="POST">
			<div class="formInfo">
				<p>You aren't connected to Twitter yet. Click the button to connect this application with your Twitter account.</p>
			</div>
			<p><button type="submit">Connect to Twitter</button></p>
		</form>
	</body>
</html>