# sangmean kwangmin
When include those two values into the .env file
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
I get an error looks like this: 
An error occurred: AuthLambdaFunction - Resource handler returned message: "Lambda was unable to configure your environment variables because the environment variables you have provided contains reserved keys that are currently not supported for modification. Reserved keys used in this request: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (Service: Lambda, Status Code: 400, Request ID: d59eb185-1284-4fac-9d02-f26f38e3ca05, Extended Request ID: null)" (RequestToken: 55349aae-4b8f-5b14-d925-5af72b58753c, HandlerErrorCode: InvalidRequest).

because cloudformation already assigned aws keys by default.
So remove those env value in your .env file.
or
I added exclude option in the serverless > custom > dotenv