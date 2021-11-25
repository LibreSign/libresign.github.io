# API Guide

## Prerequisites

- All requests require a `Content-Type` of `application/json`.
- The API is located at https://nextcloud.local/index.php/apps/libresign/api/v1.0
- All request parameters are required, unless otherwise specified

## Examples on Insomnia

You can [download here](Insomnia_2021-11-24.json) an example of request to API.

## Headers

Read https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

Example:

```bash
curl -X POST \
  http://localhost/index.php/apps/libresign/api/0.1/webhook/register \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic YWRtaW46YWRtaW4=' \
  -H 'Content-Type: application/json'
  -d '{
	"file": {
		"url": "https://test.coop/test.pdf"
	},
	"name": "test",
	"callback": "https://test.coop/callbackWebhook",
	"users": [
		{
			"display_name": "Jhon Doe",
			"email": "jhondoe@test.coop",
			"description": "Lorem ipsum"
		}
	]
}'
```

## Endpoints

[Api Documentation](api)

# Sign flow

### Request signature

POST /sign/register

```bash
curl --request POST \
  --url http://localhost/apps/libresign/api/0.1/sign/register \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
  --data '{
	"file": {
		"base64": "JVBERi0xLjYKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAw0DMwslAwtTTVMzIxV7AwMdSzMDNUKErlCtdSyOMyVADBonQuA4iUhaVCLheKYqBIDlw7xLAcuLEgFlwVVwZXmhZXoAIAI+sZGAplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjg2CmVuZG9iagoKNSAwIG9iago8PAo+PgplbmRvYmoKCjYgMCBvYmoKPDwvRm9udCA1IDAgUgovUHJvY1NldFsvUERGL1RleHRdCj4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyA2IDAgUi9NZWRpYUJveFswIDAgNTk1LjI3NTU5MDU1MTE4MSA4NDEuODg5NzYzNzc5NTI4XS9Hcm91cDw8L1MvVHJhbnNwYXJlbmN5L0NTL0RldmljZVJHQi9JIHRydWU+Pi9Db250ZW50cyAyIDAgUj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgNiAwIFIKL01lZGlhQm94WyAwIDAgNTk1IDg0MSBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgo3IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUgovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQo+PgplbmRvYmoKCjggMCBvYmoKPDwvQ3JlYXRvcjxGRUZGMDA0NDAwNzIwMDYxMDA3Nz4KL1Byb2R1Y2VyPEZFRkYwMDRDMDA2OTAwNjIwMDcyMDA2NTAwNEYwMDY2MDA2NjAwNjkwMDYzMDA2NTAwMjAwMDM3MDAyRTAwMzA+Ci9DcmVhdGlvbkRhdGUoRDoyMDIxMDIyMzExMDgwOS0wMycwMCcpPj4KZW5kb2JqCgp4cmVmCjAgOQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAyNzAgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMTc2IDAwMDAwIG4gCjAwMDAwMDA0MzggMDAwMDAgbiAKMDAwMDAwMDE5NSAwMDAwMCBuIAowMDAwMDAwMjE3IDAwMDAwIG4gCjAwMDAwMDA1MzYgMDAwMDAgbiAKMDAwMDAwMDYxOSAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOS9Sb290IDcgMCBSCi9JbmZvIDggMCBSCi9JRCBbIDw1RkQ4MDlEMTdFODMwQUU5OTRDODkxNDVBMTMwNUQyQz4KPDVGRDgwOUQxN0U4MzBBRTk5NEM4OTE0NUExMzA1RDJDPiBdCi9Eb2NDaGVja3N1bSAvRDZBQThGQTBBQjMwODg2QkQ5ODU0QzYyMTg5QjI2NDQKPj4Kc3RhcnR4cmVmCjc4NQolJUVPRgo="
	},
	"status": 0,
	"name": "Contract",
	"users": [
		{
			"email": "a@b.c"
			"displayName": "User Name"
		}
	]
}'
```

After this request the file will receive the status `draft` and you need change the status of the document to notify all users.

You will receive the fileId or UUID, store this data to create visible elements.

### Validate

Get data of a specific file, you can use `file_id` or `uuid` on path, both data you will receive after request to `POST /sign/register`

The association between user and file will result on a `fileUserId`. You will need this to sign the document or define the page and coordinates of place that the signature of the user will be filled.

```bash
curl --request GET \
  --url http://localhost/apps/libresign/api/0.1/file/validate/file_id/1995 \
  --header 'Authorization: Basic YWRtaW46YWRtaW4='
```

### List files

List all LibreSign files

```bash
curl --request GET \
  --url http://localhost/apps/libresign/api/0.1/file/list \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
```

### Visible elements

#### Create
POST /file/{uuid}/elements

```bash
curl --request POST \
  --url http://localhost/apps/libresign/api/0.1/file/88968195-6f0a-4036-ac05-9680feb109e4/elements \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
  --data '{
    "coordinates": {
        "top": 188,
        "left": 4,
        "width": 370,
        "height": 90,
        "page": 1
    },
    "type": "signature",
    "fileUserId": 51
}'
```

#### Update
PATCH /file/{uuid}/elements/{elementId}

The UUID you will receive when you will do a request to `POST /sign/register` and the `fileUserId` is the relation between an user and the file to sign. You can check the `fileUserId` doing a request to /validate

```bash
curl --request PATCH \
  --url http://localhost/apps/libresign/api/0.1/file/87e5d5f0-1a9b-48cd-8146-0ee8b3aafd83/elements/1 \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
  --data '{
    "coordinates": {
        "top": 188,
        "left": 4,
        "width": 370,
        "height": 90,
        "page": 1
    },
    "type": "signature",
    "fileUserId": 1
}'
```

#### Delete
DELETE /file/{uuid}/elements/{elementId}


### Define sign password
If the system is enabled to sign using password, the user will need to create a password to sign the file.

```bash
curl --request POST \
  --url http://localhost/apps/libresign/api/0.1/account/signature \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
  --data '{
  "signPassword": "password"
}'
```

### Changing status

You will need change the status of a file from draft to able to sign. When you change the status, all users will receive an email with URL to create account if the user don't exists or authenticate and sign the file.

> **PS**: The URL that all users will receive have an UUID, this is the UUID of the relation between the file and user, don't is the UUID of file.

```bash
curl --request PATCH \
  --url http://localhost/apps/libresign/api/0.1/sign/register \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
  --data '{
	"file": {
		"fileId": 1995
	},
	"status": 1
}'
```

### Define user signature

This is necessary for all user to store the own signature or initial.

```bash
curl --request POST \
  --url http://localhost/apps/libresign/api/0.1/account/signature/elements \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
  --data '{
  "elements": [
    {
      "type": "signature",
      "file": {
        "base64": "iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRSkVQTtIcchQnSyIFREnrUIRKpRaoVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v+SQosYD4778e7e4+4dIDQqTDW7xgFVs4x0Ii5mc6tizysCCGMAMcxIzNTnUqkkPMfXPXx8vYvyLO9zf44+JW8ywCcSzzLdsIg3iKc2LZ3zPnGIlSSF+Jx4zKALEj9yXXb5jXPRYYFnhoxMep44RCwWO1juYFYyVOJJ4oiiapQvZF1WOG9xVis11ronf2Ewr60sc53mMBJYxBJSECGjhjIqsBClVSPFRJr24x7+sONPkUsmVxmMHAuoQoXk+MH/4He3ZiE24SYF40D3i21/jAA9u0Czbtvfx7bdPAH8z8CV1vZXG8D0J+n1thY5Avq3gYvrtibvAZc7wNCTLhmSI/lpCoUC8H5G35QDBm+BwJrbW2sfpw9AhrpK3gAHh8BokbLXPd7d29nbv2da/f0AA+Zy4dveUIkAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflChoSNCP5pnpQAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAFhJREFUeNrtwTEBAAAAwqD1T20Hb6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAxCFEAAZDlHEoAAAAASUVORK5CYII="
      }
    },
    {
      "type": "initial",
      "file": {
        "base64": "iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TRSkVQTtIcchQnSyIFREnrUIRKpRaoVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v+SQosYD4778e7e4+4dIDQqTDW7xgFVs4x0Ii5mc6tizysCCGMAMcxIzNTnUqkkPMfXPXx8vYvyLO9zf44+JW8ywCcSzzLdsIg3iKc2LZ3zPnGIlSSF+Jx4zKALEj9yXXb5jXPRYYFnhoxMep44RCwWO1juYFYyVOJJ4oiiapQvZF1WOG9xVis11ronf2Ewr60sc53mMBJYxBJSECGjhjIqsBClVSPFRJr24x7+sONPkUsmVxmMHAuoQoXk+MH/4He3ZiE24SYF40D3i21/jAA9u0Czbtvfx7bdPAH8z8CV1vZXG8D0J+n1thY5Avq3gYvrtibvAZc7wNCTLhmSI/lpCoUC8H5G35QDBm+BwJrbW2sfpw9AhrpK3gAHh8BokbLXPd7d29nbv2da/f0AA+Zy4dveUIkAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflChoSNCP5pnpQAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAFhJREFUeNrtwTEBAAAAwqD1T20Hb6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAxCFEAAZDlHEoAAAAASUVORK5CYII="
      }
    }
  ]
}'
```

### Sign method

You can change the sign method between `password`, `email`, `sms`, `telegram` or `signal`.

To sign using SMS you will need install the app `twofactor_gateway` and configure the gateway to SMS.

Example:

```bash
docker-compose exec --user www-data nextcloud php occ config:app:set libresign sign_method --value=password

docker-compose exec --user www-data nextcloud php occ config:app:set libresign sign_method --value=email

docker-compose exec --user www-data nextcloud php occ config:app:set libresign sign_method --value=sms
```

#### SMS

Configuring the SMS gateway.

```bash
docker-compose exec --user www-data nextcloud php occ twofactorauth:gateway:configure sms
```
I recomend to use the [playSMS](https://github.com/librecodecoop/playsms-docker) as a SMS gateway.

#### Define phone number

To sign using SMS the user will need define the phone number.

```bash
curl --request PUT \
  --url http://localhost/settings/users/admin/settings \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
  --data '{
	"phone": "+1987654321"
}'
```
#### Request code

If the sign method is a code, the authenticated user will need request a code to sign the file.

```bash
curl --request POST \
  --url http://localhost/apps/libresign/api/0.1/sign/file_id/3051/code \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
```
#### Sign using code

To sign you only will need send the code that you received by email or SMS.

```bash
curl --request POST \
  --url http://localhost/apps/libresign/api/0.1/sign/file_id/1995 \
  --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
  --header 'Content-Type: application/json' \
  --data '{
  "code": "5150"
}'
```
You also can define the relation between the user and the file elements. You can receive the list of elements on validate endpoint and you will need create a relation between the user to sign and the element.