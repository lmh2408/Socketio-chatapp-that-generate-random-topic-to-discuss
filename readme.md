Discuss a random topic

Bored and want to discuss a random topic with a stranger?
The web application is the answer to that kind of need.
It pairs you up with a random stranger to discuss about it and generates a random topic to discuss about.
A topic can be a word randomly selected from an English dictionary, or can be a book freely available on internet.

Words repository API
https://www.randomlists.com/data/words.json


When you enter your name (or use anonymous id), a post request is sent to the server which will give you a session then redirect you to a waiting page.

On this page, a client is initially sent a socket emit with a request to join the waiting room.
When a request to join the waiting room detect that the room already have one socket connected to it, the socket callback will remove the both sockets from the waiting room and pair them together by making 2nd socket join the room with the 1st socket id.

After that, an emit from the server is sent to the room with the 1st socket id (which 2nd is in).
The emit will change the state of the React page, displaying a randomly generated word and a chat console.

When a socket disconnect, an emit is sent to the remaining socket and changes the state on the client to the initial state.
