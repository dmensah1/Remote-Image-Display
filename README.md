# Remote-Image-Display
Socket programming project using Node.js based on a client-server architecture. The server provides an image to the clients to download and display directly using the default image viewer supported by the operating system.

# To run the code:
Make sure you have Node.js downloaded. Next open two command prompts. On one, change directory into the Server folder and run the command:

node ImageDB

which starts the server. Once the server is started, change directory into the Client folder and run the following command on the second command prompt to start the client program:

node GetImage -s 127.0.0.1:3000 -q Swan.jpg -v 3314

The .jpg image file name can be any one of those images in the images folder.
