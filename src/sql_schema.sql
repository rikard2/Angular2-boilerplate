/*
DROP TABLE dbo.LoginUserSession
DROP TABLE dbo.LoginUser
DROP PROC API.LoginUser_Authenticate
DROP PROC API.LoginUser_Create
DROP PROC API.LoginUser_Info
*/
CREATE TABLE dbo.LoginUser
(
	LoginUserId int IDENTITY(1, 1) CONSTRAINT PK_User PRIMARY KEY,
	Email varchar(100) NOT NULL,
	PasswordHash varchar(40) NOT NULL,
	FirstName varchar(200) NOT NULL,
	LastName varchar(200) NOT NULL,
	DatetimeCreate datetime2 NOT NULL CONSTRAINT DF_User_Created DEFAULT(SYSDATETIME()),
	DatetimeUpdate datetime2 NULL
)
GO
CREATE TABLE dbo.LoginUserSession
(
	SessionKey uniqueidentifier PRIMARY KEY CONSTRAINT DF_UserSession_SessionKey DEFAULT (newid()),
	LoginUserId int NOT NULL CONSTRAINT FK_UserSession_LoginUser REFERENCES dbo.LoginUser (LoginUserId),
	DatetimeExpire datetime2 NOT NULL
)
GO
CREATE PROC API.LoginUser_Authenticate
	@Email varchar(100),
	@Password varchar(100),
	@_ErrorMessage varchar(max) = NULL OUTPUT
AS
BEGIN

	DECLARE
		@LoginUserID int = (
			SELECT
				LU.LoginUserID
			FROM
				dbo.LoginUser LU
			WHERE
				LU.Email = @Email
				AND LU.PasswordHash = CONVERT(VARCHAR(32), HashBytes('MD5', @Password), 2)
		)

	IF @LoginUserId IS NULL
	BEGIN
		SELECT
			@_ErrorMessage = 'Wrong email or password.'
		RETURN -1
	END

	DECLARE
		@SessionKey TABLE
		(
			SessionKey uniqueidentifier
		)

	INSERT INTO dbo.LoginUserSession
	(
		LoginUserId,
		DatetimeExpire
	)
	OUTPUT
		INSERTED.SessionKey
	INTO
		@SessionKey
	VALUES
	(
		@LoginUserId,
		DATEADD(MINUTE, 30, SYSDATETIME())
	)

	SELECT
		SK.SessionKey
	FROM
		@SessionKey SK

END
GO
CREATE PROC API.LoginUser_Create
	@Email varchar(100),
	@Password varchar(100),
	@FirstName varchar(200),
	@LastName varchar(200),
	@NewLoginUserId int = NULL OUTPUT,
	@_ErrorMessage varchar(max) = NULL OUTPUT
AS
BEGIN

	IF EXISTS (SELECT * FROM dbo.LoginUser LU WHERE LU.Email = @Email)
	BEGIN
		SELECT
			@_ErrorMessage = 'User already exists.'
		RETURN -1
	END

	DECLARE
		@PasswordHash varchar(32) = CONVERT(VARCHAR(32), HashBytes('MD5', @Password), 2)

	INSERT INTO dbo.LoginUser
	(
		Email,
		PasswordHash,
		FirstName,
		LastName
	)
	VALUES
	(
		@Email,
		@PasswordHash,
		@FirstName,
		@LastName
	)

	SELECT @NewLoginUserId = SCOPE_IDENTITY()

	DECLARE
		@SessionKey TABLE
		(
			SessionKey uniqueidentifier
		)

	INSERT INTO dbo.LoginUserSession
	(
		LoginUserId,
		DatetimeExpire
	)
	OUTPUT
		INSERTED.SessionKey
	INTO
		@SessionKey
	VALUES
	(
		@NewLoginUserId,
		DATEADD(MINUTE, 30, SYSDATETIME())
	)

	SELECT
		SK.SessionKey
	FROM
		@SessionKey SK

	RETURN

END
GO
CREATE PROC API.LoginUser_Info
	@SessionKey varchar(max)
AS
BEGIN
	SELECT
		LU.FirstName,
		LU.LastName,
		LU.Email
	FROM
		dbo.LoginUserSession LSU
		JOIN dbo.LoginUser LU ON
			LU.LoginUserId = LSU.LoginUserId
	WHERE
		LSU.SessionKey = @SessionKey
END
