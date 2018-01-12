<a name="top"></a>
# Api v1.0.0

Api endpoints

- [Currency](#currency)
	- [GET all currencies](#get-all-currencies)
	- [GET all currencies for currency name](#get-all-currencies-for-currency-name)
	- [GET all currencies for crypto name](#get-all-currencies-for-crypto-name)
	
- [Session](#session)
	- [DELETE Session](#delete-session)
	- [GET session](#get-session)
	- [POST Session](#post-session)
	


# Currency

## GET all currencies
[Back to top](#top)

<p>Get all currencies in database</p>

	GET /currencies





### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Object |  | **optional**<p>currency</p>|

## GET all currencies for currency name
[Back to top](#top)

<p>Get all currencies in database for currency name</p>

	GET /currencies/:currency





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Currency | currency | <p>e.g. USD</p>|


### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Object |  | **optional**<p>currency</p>|

## GET all currencies for crypto name
[Back to top](#top)

<p>Get all currencies in database for crypto name</p>

	GET /currencies/:currency/:cryptocurrency





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Currency | currency | <p>e.g. USD</p>|
| Cryptocurrency | cryptocurrency | <p>e.g. ETH</p>|


### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Object |  | **optional**<p>currency</p>|

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






