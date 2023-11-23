# s381f-project-diamond-magament-system
s381f-project-diamond-magament-system
Diamond Management System

Group: 18
Name: 
Luk Chun Keung (13344694)

Application link: https://s381f-project-diamond-magament-system.onrender.com/

********************************************
# Login
Through the login interface, each user can access the diamond information management system by entering their username and password.

Each user has a userID and password;
[
	{userid: coco, password: coco123},
	{userid: hana, password: hana456},
	{userid: riku, password: riku789},
	{userid: 381teachers, password: isthebest},
	{userid: 1, password: 1}
]

After successful login, userid is stored in seesion.

front: views/login.ejs
back: server.js
schema: models/user.js
rest api : POST

********************************************
# Logout
In the main page, each user can log out their account by clicking logout.

front: views/main.ejs
back: server.js 
schema: models/user.js
rest api : GET

********************************************
# CRUD service
- Create
-	A diamond document may contain the following attributes with an example: 
	1)	diamondID : (0000000111), diamond ID must be 10 digits
	2)	shape : (Round) 
	3)	carat : (1.50), Carat Weight maxlength : 4 & can input '.' must input number 
	4)	color : (D), Color Grade maxlength : 1 & must input String
	5)	clarity : (VV1)
	6)	cut : (Excellent)
	7)	polish : (Excellent)
	8)	symmetry : (Excellent)
	9)	fluorescence : (Strong)
	10)	price : (123456), must input number

All attributes are mandatory, diamondID must be unique
(shape, clarity, cut, polish, symmetry, fluorescence) those attributes are useing select box to let user select

Create operation is post request, and all information is in body of request.

front: views/crud.ejs
back: server.js
schema: models/diamond.js
rest api : POST

********************************************
# CRUD service
- Read
-  There are two options to read and find diamonds list all information or searching by diamond id.

1) List all information
	enter crud.ejs will be displayed with all diamonds on the table;
	click Show all will be displayed with all diamonds on the table;

2) Searching by diamond id
	input id of diamond you want to find (999999999);
	clicking select button, the details will be displayed with all diamond id(999999999) on the table;

All row of diamonds data behind have edit & delete button on the table 
	
front: views/crud.ejs
back: server.js
schema: models/diamond.js
rest api : GET

********************************************
# CRUD service
- Update
-	The user can update the diamond information through the rcud interface.
-	The user click the edit button on the table which row diamond data the user want to edit.
-	The system pass edit page to let user edit the data, the edit page will show the data which are user selected.

-	A diamond document may contain the following attributes with an example: 
	1)	diamondID : (0000000111), readonly
	2)	shape : (Round), selection option 
	3)	carat : (1.50) 
	4)	color : (D)
	5)	clarity : (VV1), selection option
	6)	cut : (Excellent), selection option
	7)	polish : (Excellent), selection option
	8)	symmetry : (Excellent), selection option
	9)	fluorescence : (Strong), selection option
	10)	price : (123456)

	All input rules same with create action 

front: views/edit.ejs, views/crud.ejs
back: server.js
schema: models/diamond.js
rest api : PUT

********************************************
# CRUD service
- Delete
-	The user can delete the diamond information through the rcud interface.
-	The user click the delete button on the table which row diamond data the user want to delete.

front: views/crud.ejs
back: server.js
schema: models/diamond.js
rest api : DELETE

********************************************
# Restful
In this project, there are four HTTP request types : post, get, put, delete.
- Post 
	Post request is used for insert.
	Post request is used for login.
	Path URL: /create
	Path URL: /login
	create Test: curl -X POST -H "Content-Type: application/json" --data '{"diamondID":"00000111",
    "shape": "Round",
    "carat": 1.5,
    "color": "D",
    "clarity": "VVS1",
    "cut": "Excellent",
    "polish": "Excellent",
    "symmetry": "Excellent",
    "fluorescence": "None",
    "price": 12345}'localhost:8099/create
	Login Test: curl -d "name=381teachers&password=isthebest" -X POST localhost:8099/login
- Get
	Get request is used for find.
	Path URL: /select
	Path URL: /crud
	Path URL: /
	Path URL: /:id
	Test show all diamond data: curl -v GET localhost:8099/crud
	Test select dimaondID (0000000010): curl -v GET "localhost:8099/select?selectID=0000000010"

- PUT
	put request is used for find.
	Path URL: /updateDiamond/:id
	Test: curl -X PUT -H "Content-Type: application/json" --data'{"color":"F"}' localhost:8099/updateDiamond/0000000010
	
- Delete
	Delete request is used for deletion.
	Path URL: /deleteDiamond/:id
	Test: curl -X DELETE localhost:8099/deleteDiamond/9999999999

For all restful CRUD services, login should be done at first.
