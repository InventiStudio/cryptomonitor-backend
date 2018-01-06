<a name="top"></a>
# Api v1.0.0

Api endpoints

- [Session](#session)
	- [DELETE Session](#delete-session)
	- [GET session](#get-session)
	- [POST Session](#post-session)
	


# Session

## DELETE Session
[Back to top](#top)



	DELETE /sessions/:token






## GET session
[Back to top](#top)

<p>Useful when you want to validate token</p>

	GET /sessions/:token





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| token | uuid | <p>Session's token</p>|


### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| session | Object | |

## POST Session
[Back to top](#top)



	POST /sessions/






