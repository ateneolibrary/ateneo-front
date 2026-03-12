# Context

We are building a static fronted at the moment, only mock-up with some data but mockups. And de poupose of ateno
is to create a web to be able to manage book clubs in spain primarly. At the time we've donde some mokups, such as:

- Club Dashboard: app/my-club/[id]/dasboard  
- Club Members: app/my-club/[id]/members
- Club Library: app/my-club/[id]/library
- Profile: app/profile/[userId]

Latter I will tell yo more about those pages, now I'm gona list what we have left.

- Club Meetings: app/my-club/[id]/meetings
- List of my-clubs: app/my-clubs
- Explore clubs: app/explore
- Landing: app
- Login: app/login
- Register: app/register
- Create club: app/create-club
- Club Settings: app/my-club/[id]/settings


# Tech Stack And desing

We are using nextjs 16.1.6, react: 19.2.3 tailwindcss, typescript for the frontend.


## UI desing
we are searching a minimal app based in the style of the bauhause convention. With geometric figures, ligth color

 - bg: #F2F0EA;
 - paper: #FAF8F3;
 - ink: #111111;
 - muted: #4e4e4e;
 - accent: #c1121f;
 - line: #111111;

# User flow
A user will always land on the landing page, from there he will be able to navigate throw the navBar we hace, he will be able to go to the next pages:
- My Clubs
- Explore clubs
- Login (if he hasn't loged in yet)
- Create acount (if he hasn't created and acount)
- To his profile (if he is already loged in)

The user will be able to create a club, visit a club, add books to his club to read, and other actions.

# How are we going to workl
I will write a requiremet, and based on the requirement, yo will create the user interface based in the other interfaces that we have done.

When, requirements will alway be in the directory `requirements/x-requirement.md`
In this x-requirement.md you will find what page are we going to build and what components should whe create or use. I like a lot to program lots of componentes, i also like a lot animations to make the user experience more likable. 


