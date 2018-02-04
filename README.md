# E-Election App

## What is it? 
E-election app is an innovative and unique app that allows users to conduct an election for a given post. For each post, users are able to nominate themselves as candidates and the users should be able to vote for one of them. 

As we know, India is the largest democracy in the world and houses ~1.3 Billion people. But as statistics have shown, all Indians do not come forward to vote for their leaders for some reason or the other like long election queues, election booth violence etc. So, we have developed this app (as a part of Hasura Product Development Fellowship) to remove these constraints and give a smoother experience to the users. Also, any party/individual candidate can come forward and nominate himself/herself for a post.

## How it works? 
### Workflow
When the user signs up and there after logs in, he is supposed to go to the "Get Credentials" page where he will include all his details and on entering valid detils, a voting credential will be generated which would be used while voting for a post.
In the "Homepage" of the e-election app, the user can see the various ongoing elections and view their details by clicking on the "View Details" button next to each election. On clicking the "View Details" button, he will be able to see the various nominations for the post. He can select a candidate and vote for him/her by entering his voting credentials. Also, he can nominate himself for the post by entering the manifesto and other details.
After the election date, the user can view the results and thus the election is considered inactive.

## Internal Implementation
The app uses [Node.JS](https://nodejs.org) in the backend and [React.JS](https://reactjs.org) in the frontend. We have also used the React UI library called [Ant Design](https://www.ant.design).
We have also used Hasura Data APIs for managing databases, Auth APIs for user authentication, filestorage APIs for storing photo from user.

## How do I build the e-election app?
You can get the project from the hasura hub after it is uploaded there and use it to build an e-election app.

## Support
If you happen to get stuck anywhere, feel free to raise an issue [here](https://github.com/geekysrm/e-election-fullstack/issues)

Also, you can contact me via [email](mailto:soumyacool2012@gmail.com) or [twitter](https://twitter.com/SoumyaRnMohanty) or [facebook](https://www.fb.com/geekysrm).