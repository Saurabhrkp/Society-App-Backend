**Society Management App**

To Achieve the goal we have to make
1. Server (Back-End)
2. App  (Front-End)

1. Server
I think so we should Express.js for Server and MongoDB with mongoose for Database

2. App
We can use Electron.js with any of library/framework like React, VUE or Angular

**Path to achieve goal:**
1. Create RESTful API Server.
2. Create MongoDB Document Model.
3. Connect with Server.
4. Setting-up all CURD Operations on Database.
5. Create all routes required.
6. Expose RESTful API.
7. Decide which library to use for Front-End.
    (Assuming We choose VUE.js with Electron)
8. Create Electron App with VUE as Render.
9. Connect to RESTful API to VUE-Electron using Axios.
10. Achieve CURD Operations.
11. Achieve all routes.
12. Fix Bugs.

**Changes Made Yesterday Night**

We have to work on the cntroller now
One Flat have many records (Flats will have all records grouped in Arrays[records(ID)])
records have entiry for it month, For which month does this record exists (Each Records are Linked Respectively with the Flat for which they exist and for what month they are created)
then each month have many records (Means all records for month are grouped in that month document by Array[ID] )