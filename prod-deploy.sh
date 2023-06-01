#!/bin/bash

npm run heroku-postbuild
aws s3 --profile ivnoteamplify rm s3://meetmyna/ --recursive
aws s3 --profile ivnoteamplify cp dist/ s3://meetmyna/ --recursive --acl public-read
aws cloudfront --profile ivnoteamplify create-invalidation --distribution-id E2IWW6L7ZRXNYE --paths "/*"
