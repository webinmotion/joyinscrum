# Get rolling...

__JoyInScrum__ (sounds like join scrum) is an app which complements the scrum's __estimation planning__ ceremony by providing a visual tool for coordinating voting in several ways:

- participants can conveniently join using a sharable browser url (desktop/laptop) or a qr code (phone app)
- shows who has submitted their choice and who still hasn't
- puts front-and-center the scrum topic under discussion
- shows pictorially the distribution of voting for a given set of voting options
- voting can be done anonymously 

## How to Scrum

There are two user modes:
- __Organizer__ - in this mode, you have to be signed in
- __Guest mode__ - in this mode, you should not be signed in

Based on the mode you are in, you will see different menu options

## Menu differences

| Organizer                                     |   Guest                                   |
|-----------------------------------------------|-------------------------------------------|
| Sign In/Sign Up menus are not available       |   Sign In/Sign Up menus are available     |
| Sign Out menu is on the Top nav bar           |   Sign Out menu is not available          |
| ![Organizer Menu](./img/organizer-menu.png)   |   ![Guest Menu](./img/guest-menu.png)     |


## Organizer mode

- When signed in, you cannot simulteneously be a participant. As an __Organizer__, you simply officiate, and as a __Guest__, you simply participate.
- Clicking the __Join Scrum__ menu will simply produce a __Conflict 409__ page 
- Clicking on the __Organizer__ menu will require you to be signed in. 
- You will require a __valid email address__ to be successfully registered. This email is necessary to discourage fake users or internet bots
- Once registered and signed in, you should share the __scrum url__ from the __Organizer__ menu with the participants, or they can use their phone to scan the __QR Code__ displayed

![Organizer QR](./img/organizer-qr-code.png)

- The __Manage__ tab is initially empty, but as participants join, then they will appear below the __current topic__ textbox.

![Manage Topics](./img/manage-scrum-topic.png)

- The __Voting__ tab is used to reveal the summary of the voting based on a particular scrum topic.

![Scrum Voting](./img/manage-scrum-voting.png)

- The __Visualize__ tab is used to visualize the summarized voting data using a bar chart so that it's easy to discuss the result.

![Visualize Votes](./img/manage-scrum-visualize.png)

- The __Organizer__ can remove an idle participant from voting by clicking on the __x__ symbol on the participant box

![Remove Participant](./img/remove-participant.png)

## Guest mode

- As a guest, you are simply a participant, and all you need to do is vote when a new scrum topic is brough up for voting.

- Clicking the __Join Scrum__ menu will prompt you for a __scrum url__ and you will provide a __unique identifier__, like a username or an email address. This value is not used by the app for any other purpose beyond identifying you amongst your fellow participants in the same scrum session.

![Join Scrum](./img/join-as-a-participant.png)

- Upon joining an active scrum session, wait for the organizer to push the topic for voting

![Await Topic](./img/awaiting-topic-change.png)

- Upon receiving a new topic, select the best estimation from the drop down. You can do so more than once, for example, to change the vote previously submitted

![Submit Vote](./img/select_best_option.png)

## Mobile phone users

A mobile app option will soon be avaiable for Android devices in Google play store. The name to search will be __joyinscrum-client__. This app provides a convenient way to join the __scrum estimation ceremony__ without needing to have a browser open in a desktop/laptop computer. In the mobile device however, you can only be a __participant__ and not an __organizer__. Functionality that is reserved for an organizer is currently not available in the mobile app.

### Home Screen

|   Screen                                              |       Notes                                                       |
|-------------------------------------------------------|-------------------------------------------------------------------|
|   ![home-screen](./img/mobile/home-screen.jpg)        |   This is also the landing page. It is the first screen that a mobile user will encounter when using the client app
|   ![guest-screen](./img/mobile/guest-screen.jpg)      |   Upon pressing the __Scan QR Code__ button in the __Home Page__, and scanning the organizer's QR Code, this screen allows a participant who is not signed in to provide a custom user handle (must be unique). If the participant is signed in, this screen is skipped and the user's email address is used as the handle (the value is already unique)
|   ![account-screen](./img/mobile/account-screen.jpg)  |   Upon pressing the __My Profile__ button in the __Home Page__, this scren provides the participant to either register a new account or sign in using their existing account. This is convenient for skipping the __Guest Page__ when a unique user handle is required before joining an ongoing scrum
|   ![profile-screen](./img/mobile/profile-screen.jpg)  |   This screen allows a user to optionally __enrich their profile__ by adding attributes like first name, last name, phone number and the country they are located. This page also provides a __sign out__ button for the participant. __Purging__ an existing account can not be done from a mobile device
|   ![scrum-screen](./img/mobile/scrum-screen.jpg)      |   This screen allows a user to __respond to the current scrum topic__ by selecting a a choice from the dropdown menu   


## Conclusion

Feel free to leave any feedback or suggestions through the channels provided. Your input will be used to improve your experience with the app. __Happy Scrumming__ 