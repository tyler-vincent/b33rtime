# B33rti.me

This is an experimental image uploading site. Its designed to be as lightweight and mobile friendly as possible with no considerations for browser backwards compatibility.

### SETUP

Populate the following using `rails credentials:edit`

```
aws:
  key: "<your S3 key>"
  secret: "<your S3 secret>"
  directory: "<S3 bucket name>"
```

Then run `docker compose build` then `docker compose up` and you should be good to go.
