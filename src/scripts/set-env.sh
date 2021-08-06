#!/bin/bash

echo "PORT"=$PORT >> .env
echo "AWS_ACCESS_KEY_ID"=$AWS_ACCESS_KEY_ID >> .env
echo "AWS_SECRET_ACCESS_KEY"=$AWS_SECRET_ACCESS_KEY >> .env
echo "JWT_SECRET=$JWT_SECRET" > .env
echo "STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY" > .env
echo "EMAIL_PASSWORD=$EMAIL_PASSWORD" > .env
echo "EMAIL=$EMAIL" > .env
echo "GMAIL_CLIENT_ID=$GMAIL_CLIENT_ID" > .env
echo "GMAIL_CLIENT_SECRET=$GMAIL_CLIENT_SECRET" > .env
echo "GMAIL_ACCESS_TOKEN=$GMAIL_ACCESS_TOKEN" > .env
echo "GMAIL_REFRESH_TOKEN=$GMAIL_REFRESH_TOKEN" > .env
echo "MAIL_USERNAME=$MAIL_USERNAME" > .env
echo "MAIL_PASSWORD=$MAIL_PASSWORD" > .env
echo "GOOGLE_API_KEY=$GOOGLE_API_KEY" > .env