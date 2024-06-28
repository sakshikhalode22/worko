# worko
Node JS assignment

# Clone Repository
Fork Repo in Your git account

clone repo in desired folder or location
To clone 1: right click do 'git bash here' option
         2: git clone https://github.com/{your userName}/worko.git (copy from repo code)
         3: Open in VS or any Editor
         3: Open terminal
         4: run command Git Fetch Origin
         5: run command npm install
         6: If getting repository error run below command( npm set registry https://registry.npmjs.com/ again run 5th command)
         
# Build Project
npm run build

# Start Project
npm start

# test project
npm run test

# Operation
Id Generation
Id generating randomly for user
exports.generateUserId = () => {
    const userId = Math.floor(Math.random() * 1000000);
    return userId.toString();
}


1. Create User
   method:post
   url:"http://localhost:4200/worko/users"
   body:{
         "name": "Johny Dose",
         "email": "johny.dose@gmail.com",
         "age": 19,
         "city": "Mumbai",
         "zipCode": "440003",
         "password": "Johny@2231"
         }
   
   <img width="625" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/543cfed7-9217-4c9e-920e-b6c0354472ab">
   
2. Login User
   method:post
   url:"http://localhost:4200/worko/users/login"
   body:{
         "email": "johny.dose@gmail.com",
         "password": "Johny@2231"
         }
   
   <img width="628" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/e8906f73-ac46-4340-a8ae-0356816df2ac">

3. Get All Users
   method:get
   url:"http://localhost:4200/worko/users"
   
   <img width="636" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/b846377d-5217-46e3-8057-61baab7359ef">

4. Get User by Id
   method:get
   url:"http://localhost:4200/worko/users/418467"

   <img width="639" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/5ba14fef-7f09-49f6-acb7-1478f271bc73">

5. Get Active User
   method:get
   url:"http://localhost:4200/worko/users/active"
   Users with null in deletedAt field

   <img width="625" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/7573a389-5289-4a22-a212-4c8da1473cbb">

6. Get Inactive User
    method:get
    url:"http://localhost:4200/worko/users/inactive"
    Users with not null in deletdAt field

    <img width="635" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/d66c8f13-d11f-4f32-b27f-082c0813c8ee">

7. Update User
    method:put
    url: "http://localhost:4200/worko/users/747061"
    body:{
         "name": "Anie Hade",
         "email": "annie.hade@gmail.com",
         "age": 20,
         "city": "Bangalore",
         "zipCode": "440013",
         "password": "Annie@2231",
         }
   
    User is Active
   
    <img width="651" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/b1442b00-d343-45a9-b634-5fab6adbcdbb">

    User is Inactive
   
    <img width="661" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/50815f78-f8dd-4860-a136-4d0be0c412ae">

    
9. Update User(Partially)
    method:patch
    url: "http://localhost:4200/worko/users/747061"
    body: {
             "age": 20,
             "city": "Nagpur",
             "zipCode": "440013",
             "password": "Anna@2233"
         }
    User is Active
   
    <img width="623" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/245ff108-6ad3-4738-9c38-44cb528ebc02">

    User is Inactive
   
    <img width="621" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/e349a566-e13c-461e-9619-1126a9db39a4">


    
11. Delete User(soft)
    method:delete
    url:"http://localhost:4200/worko/users/418467"
    In Soft delete the deleteUser method is checking if id is in db and if deletedAt value is null then only user getting soft deleted
    
    <img width="624" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/e99de3ac-9556-42a4-a154-59bd662b7473">

# Test
<img width="444" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/b29e593b-db58-404e-8657-b1e91b01a4d1">

<img width="562" alt="image" src="https://github.com/sakshikhalode22/worko/assets/55319326/bb456c01-224f-493b-a115-e18bbb6fdd52">



