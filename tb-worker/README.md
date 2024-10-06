# tb-worker

The code for the Cloudflare Worker. Currently an interface for Cloudflare D1.

## `/add`

Type: `POST`

Adds a username to the list of blocked usernames.

Blocklist will not update on all clients immediately.

### Request Body

```json
{
  username: string,
}
```

### Response

200 OK (unless something happens lol then idk)

## `/fetch`

Type: `GET`

Fetches the list of blocked usernames. Is cached depending on load. Please respect the cache, database queries can get expensive

### Request Body

None.

### Response

Space delimited string of usernames.
