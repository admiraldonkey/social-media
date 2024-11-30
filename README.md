# Social Media Site

Simple social media site with clerk user authentication

## Features

- Users can create a new account by signing up via Clerk and then gets presented with a form to add their profile details.
- Users can create posts, view other user's posts and profile pages, and follow other users.
- Main posts page displays all posts by default, with option for a logged in user to only view posts made by people they follow. Filter toggle implemented as a Radix UI primitive component.
- Users can like other user's posts and click on the poster's name to access their user profile.
- User profiles display their bio, follower information, and any posts they have made.
- Styled with TailwindCss, posts have alternating styles.
- Clerk SignedIn and SignedOut components used to dynamically render or restrict user as appropriate.

## Future considerations

- Split followers on user page with option to view BOTH a list of users they follow and a list of users that follow them.
- Add ability for users to edit or delete their own posts, and edit their own profile.
- Implement comment functionality.
- Reconsider approach with certain components used and if some of the more dynamic functions with lots of if/switch statements could have been handled better.
- Give the site a theme.
- Reconsider colours and make buttons and such more consistent across the site.

# Reflection

## What requirements did you achieve?

All

## Were there any requirements or goals that you were unable to achieve?

N/A

## If so, what was it that you found difficult about these tasks?

N/A

## What went really well and what could have gone better?

In hindsight I wish I would have used my previous project as a starting point instead of starting fresh. Would have allowed me to add far more functionality to flesh out the site and make it more interactive. As a fresh project, it feels a bit bare bones.

I wanted to make better use of components with this project, but think I may have overdone it with the complexity of some of the display and get functions in an effort to minimise repeating code. As I added more features or reconsidered ways of doing things, it was all to easy to accidentally break something by trying to fix or add something else. When trying to debug it was also challenging to easily figure out what was going on, especially before I added the comments.

I wish I'd linked my posts table to my user table via foreign key rather than clerk_id. As I had other instances where I needed to access posts via a user_id, it made it considerably more complicated, both in adding extra switch cases and parameters depending on which type was needed, and in the SQL queries themselves. By the point I realised how awkward it was, it would have been likely more work to change it.

Overall though, while I didn't have time to add a few things, I am proud of the things I was able to achieve. While complicated and probably not the best approach, I did like having a single point of call for many of the display components or db get queries (when I was able to understand my own code). Some of the things which took the longest to implement only translated to small UI changes, such as followers. For example, just the short follower sentence on a user profile has 8 different conditional renders using multiple functions.

If I'd had more time and had been able to add the extra CRUD functionality, I was also planning to give the site a silly theme where everything was in pirate speak (with the site being called something like "Social Meady-Yarr").
