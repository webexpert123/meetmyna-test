#!/bin/bash

npm run heroku-postbuild
aws s3 --profile ivnoteamplify rm s3://dev.meetmyna.com/ --recursive
aws s3 --profile ivnoteamplify cp dist/ s3://dev.meetmyna.com/ --recursive --acl public-read
aws cloudfront --profile ivnoteamplify create-invalidation --distribution-id E2Y3EGIZTT21BC --paths "/*"
