NRI Web developer Challenge
This is a demo website for the NRI Web Dev challenge built with React, JavaScript, CSS, Node/Express using MySQL as the Relational Database. 

Project Screenshots:

Installation and Setup Instructions
Clone this repository. You will need node and npm installed on your machine. 
Also make sure to install the dependencies needed for this project.  

Since this React app has a server and client side, you will need to run npm start for both the “backend” and the “client” folders. For the RDB, you will need MySQL and MySQLworkbench. The database is called “test” and the table is called “csvdata”. Once you have these steps done, you can start up the React app.  You can also change the database configuration (i.e. the db name, table name, password, etc.) in the index.js file inside the server folder as per your needs. Once both client and backend are running, you can visit localhost:3000/Home to visit the app. 


The app has a navigation bar to switch between Home and Dashboard. 
On the Home page, there are 3 steps to follow to get to the end result, i.e. getting the graphs. (Note: When using the interface, double click the buttons instead of single clicking.)
Firstly, upload your .csv file. This will also display the data on your Home page so you can verify the data before creating your graphs. Then, upload your data to your RDB which is the MySQL workbench you set up before with the given information. Once uploaded, you can now generate your data report by clicking the “Generate” button which will conditionally render another button to take you to the dashboard. You can either click the button or use the navigation bar to go to the dashboard. On the dashboard, you will see your graphs. You can hover the graphs to look at each category within a dataset as well. The colors are auto-generated as well so they will change each time you refresh the page. This was done to account for datasets that differ from the test dataset that was given. 

This was definitely a fun challenge to code. I chose MySQL as my RDB for this challenge since it is easy to use and set up for first time users. MySQL was also developed for speed so it will work well even with large datasets. This also makes the app scalable since we do not need to worry about increasing dataset time and space costs. Lastly, MySQL offers encryption using SSL so if the app requires increased security, that can be implemented in the future as well. 

The things I was proud of while making this app were definitely the insight to keep scalability and abstraction in mind. Lot of the features in this app can be redesigned easily using React components and are also very reader friendly. Additionally, code repetition/code waste was minimized and code was thoroughly commented for anyone starting up the app for the first time. I also made the frontend resemble the original NRI website to make the challenge more realistic and enjoyable! Thanks for taking the time to have a look at this React App! 
