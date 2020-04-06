CREATE PROCEDURE [dbo].[LoadPeopleAddresses]

AS
	SELECT [Email], [First_name] AS FirstName, [Last_name] AS LastName, [Phone_number]  AS Phone
	FROM dbo.PersonAddressTable
	ORDER BY [LastName] ASC;
RETURN 0
