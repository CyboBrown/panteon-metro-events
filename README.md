# panteon-metro-events
Metro Events is an application designed to help everyone organize and join events.The idea is to have a way people connect to each other publicly. No invitations needed.

## How to run (For the devs)
- Clone the repository
- Open cmd or console in the folder's directory
- enter command "npm i"
- enter command "npm run dev"
- cheers, happy hacking

## Transactions
### User:
- Receive notifications of upcoming events
- Request to be an organizer `Admin`
- Request to join an event `Organizer`
- Upvote and give reviews of event

### Organizer:
- Create/update event `User`
- Reviews (accept and decline) event join request `User`
- Cancel event (should add reason why event is cancelled) `User`

### Administrator:
- Review organizer request `Organizer`
- Manages the App Overall (Granting Regular User to be an Administrator, and edit everything from users to events basically)

### Other Details:
* Events can be of any type
* Event has participants, upvotes, and reviews for the interested user
* Notifications: When transactions are done the `notified_user` receives a notification.
