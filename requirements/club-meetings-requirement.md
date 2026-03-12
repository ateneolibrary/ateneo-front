# Requirement
We need to create the page where the user and member of a club will se the the schedule of the month, and he will be able to add new meetings, edit meetigs and delete mettings (only in he is the admin of the club) 

```route:/app/my-clubs/[id]/meetings```

## UX/UI
He will have two nav bars, on etill be the club nav bar, and the other will be the main nav bar. The club nav bar will have the following items:
- Dashboard
- Library
- Members
- Meetings (this one will have the backgroud colo red because is the active one)

In the center of the page will be a calendar with the view of the month, in black and withe, the today date will be in one color to identiffy it, the number of the today date mus be in color red.

The calendar will show pased events and new ones, in the free tier we will only have one type of events, will be event, nothin else.

Whe can change the mothn calendar with two buttons that each one will have an arrow pointing backward to go to the previous mont, and the other one will have an arrow forward to go to the next month. Between the buttos, the name of the moth will show.

Next to the forward arrow will be a button to create a new event, if this button is click, will apear a form from the rigth site of the page in this form the user will be able to create an event. This page will also apear to consult more info from a event if the event is clicked in the calendar.

What will be necesary to create an event:

- Event name
- Date
- Duration
- Localization (if the club is online whe can set the location or put a link to the meeting, if the club is physical we can put the location, if the club has one by default will be that club location)


What a user will be able to see when consulting an event:

- Event name
- Date
- Duration
- Localization 
- Attendance (this will show the users that are going to assist to the meeting)
- His own atendace (he will be able to check or uncheck his attendance, or put "not sure")


