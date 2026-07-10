#!/bin/bash

ID=$RANDOM
NAME="TestUser$ID"
EMAIL="test$ID@gmail.com"
CONTENT="Test Post #$ID"

echo "Creating a new timeline post"
curl.exe --request POST http://localhost:5000/api/timeline_post -d "name=$NAME&email=$EMAIL&content=$CONTENT"

echo "Retrieving timeline posts"
curl.exe http://localhost:5000/api/timeline_post