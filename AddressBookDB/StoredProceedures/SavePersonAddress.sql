CREATE PROCEDURE [dbo].[SavePersonAddress]
	@Email nvarchar(200),
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Phone varchar(50)
	
	
AS
	SET NOCOUNT ON;
	INSERT INTO PersonAddressTable (Email, First_name, Last_name, Phone_number)
	VALUES (@Email, @FirstName, @LastName, @Phone)


RETURN 0
