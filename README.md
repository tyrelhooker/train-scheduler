# train-scheduler
By: T.J. Hooker
Date: 04/09/2018

The train-scheduler app allows a user input of train information and calculates the time of the next train and how many minutes away the train is. 

This particular app allows the user input of train name, the train's destination, the train start time, and the train frequency. The app implements firebase as a real-time database to save the user's input. The app then pulls saved references from the database to calculate the next train time and how many minutes away the next train is. All updates are in real time and calculations use moment.js to obtain, format, and output all times used in the app. When the user hits refresh, the app should refresh with updated next train time and current minutes away. 

A remove button allows the user to not only delete any particular train row on the page, but also the entry in the firebase database.

Technologies used:
firebase
momemnt.js