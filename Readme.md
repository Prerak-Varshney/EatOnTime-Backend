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

    GET /get-clients

    GET /get-client/:clientId

    POST /register
    
    POST /login

    PUT /update-client/:clientId

    PUT /set-client-addresses/:clientId

    DELETE /delete-client/:clientId

### Restaurant

    /restaurant

#### Endpoints
    
    GET /get-restaurants

    GET /get-restaurant/:restaurantId

    POST /register

    POST /login

    PUT /update-restaurant/:restaurantId

    DELETE /delete-restaurant/:restaurantId

    NOTE: 'DELETE' will delete restaurant and all the products associated with it.

### Product

    /restaurant/product

#### Endpoints

    GET /get-products

    GET /get-product/:productId

    POST /add-product

    PUT /update-product/:productId

    DELETE /delete-product/:productId

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