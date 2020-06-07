# Messaging System
The Api is contain 6 routes.

### Register -
POST methode

`/auth/register`

Body Params:

email: String (mandatory)

password: String (mandatory)

full_name: String (mandatory)

Response example: 

`
{success:true,full_name:full_name}`

### Login -

POST methode

`/auth/login`

Body Params:

email: String (mandatory)

password: String (mandatory)

Response example: 

`{
    "success": true,
    "token": AuthToken
}`

The response token should be used in EACH HTTP METHODE FROM HERE
Just add to the Headers "auth-token": "THE TOKEN YOUVE GOT FROM LOGIN"

### Get Messages -

GET methode

`/messages/message/`

Headers: auth-token:token

Response example: 

`{
    "response": {
        "id": 6,
        "sender": "3",
        "reciver": "1",
        "message": "asfhfahahashdfasjsgjk",
        "subject": "fdhsdfjhdsfj",
        "deleted": false,
        "updatedAt": "2020-06-04T11:51:12.582Z",
        "createdAt": "2020-06-04T11:51:12.582Z"
    }
}`

GET Sent Messages `/messages/message/?filter=sent`
The response is the same as above just the sender will be the id of your current user

### Get Users -

GET methode

`/messages/users/`

Headers: auth-token:token

Response example: 

`{
    "success": true,
    "response": [
        {
            "id": 1,
            "email": "name@gmail.com",
            "full_name": "Full Name"
        },
        {
            "id": 2,
            "email": "shahar@gmail.com",
            "full_name": "Shahar Gilad"
        }
    ]
}`

### Send Message -

POST methode

`/messages/message/`

Headers: auth-token:token

Body Params:

email: String (mandatory)

password: String (mandatory)

Response example: 

`{
    "success": true,
    "token": AuthToken
}`

### Delete Message -

DELETE methode

`/messages/message/:id`

Headers: auth-token:token

Params: id

`
{success:true}
`