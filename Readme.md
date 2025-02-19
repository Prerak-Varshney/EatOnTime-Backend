# TODO
- Protect the routes and api's with jwt
- Access tokens and refresh tokens
- Add logout
- Add orders

### Database

    - MongoDb

### Cloud and Image handling
    
    - Imagekit.io (Cloud)

    - Multer (Image Handling)


### Error Codes

    - 404: Not Found

    - 500: Internal Server Error

    - 400: Bad Request

    - 401: Unauthorized

    - 403: Forbidden

    - 200: OK

    - 201: Created

    - 206: Partial Content

## API's

#### All API's

    http://localhost/api/v1

### Client

    /client

#### Endpoints

    POST /register

    POST /login

    POST /logout

    GET /get-clients

    GET /get-client/:clientId

    PUT /update-client/:clientId

    PUT /set-client-addresses/:clientId

    DELETE /delete-client/:clientId

### Restaurant

    /restaurants

#### Endpoints
    
    POST /register

    POST /login

    POST /logout

    GET /

    GET /:restaurantId

    PUT /:restaurantId

    DELETE /:restaurantId

    NOTE: 'DELETE' will delete restaurant and all the products associated with it.

### Products

    /products

#### Endpoints

    GET /

    GET /:productId

    POST /

    PUT /:productId

    DELETE /:productId

## Environment Variables 

    PORT=3000

    MONGODB_URI=<mongodb_uri>

    JWT_SECRET=<jwt secret>

    IMAGEKIT_PUBLIC_KEY=<public_key>

    IMAGEKIT_PRIVATE_KEY=<private_key>

    IMAGEKIT_URL_ENDPOINT=<Your Imagekit url>

## Run

#### Create a public/uploads folder in the root directory to handle image uploads
#### Create a '.env' file to setup envorinment variables.

    npm install

    npm start