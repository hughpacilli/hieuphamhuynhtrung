<a name="readme-top"></a>
# The specification for a software module on the API service
These are several sequence diagrams that represent key workflows of the application. Each diagram will showcase the interaction between the user, front-end, and various services.
## User Registration
In this flow, a new user registers in the application. The user enters their details in the frontend, which then sends these details to the authentication service. The authentication service validates the information and, if valid, communicates with the user service to create a new user. After the user is successfully created, the authentication service returns a success message to the frontend, which then informs the user about successful registration.

![image](https://github.com/hughpacilli/hieuphamhuynhtrung/assets/93586447/b2318573-d8bf-445e-b9f2-708dfa0d6538)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Login
The user selects Login within the application.
The frontend redirects the user to the Authorization Server.
The Authorization Server redirects the user to the login and authorization prompt.
The user authenticates using the login option.
The Authorization Server redirects the user back to the application with a single-use authorization code.
The frontend sends the authorization code, the application's client ID, and the application's credentials, such as client secret or Private Key JWT, to the Authorization Server.
The Authorization Server verifies the authorization code, the application's client ID, and the application's credentials.
The Authorization Server responds with an ID token and access token.

The application can use the access token to call an API to access information about the user.
API responds with requested data.

![image](https://github.com/hughpacilli/hieuphamhuynhtrung/assets/93586447/c8e62389-61d9-43e3-937e-ee954019e5bb)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Player Performance Update Flow
This process involves updating the live performance stats of players during a match. It should also update the points scored by each player based on these stats.

![image](https://github.com/hughpacilli/hieuphamhuynhtrung/assets/93586447/9eda6f46-79f2-4b98-a3b5-c4d16da81a77)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Live Match Scoring
This flow involves updating scores during a live match. The live match service sends the player performances to the player service. The player service calculates the scores for each player based on the player's performances and updates the scores in the leaderboard service. The leaderboard service updates the leaderboards and informs the live match service, which then pushes the updates to the frontend for the users to see. It should handle the distribution of ranks in case of score ties.

![image](https://github.com/hughpacilli/hieuphamhuynhtrung/assets/93586447/8f7bdfec-18f1-4ddc-85bb-9b5f9be9024c)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
