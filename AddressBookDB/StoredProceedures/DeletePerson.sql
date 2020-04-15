CREATE PROCEDURE [dbo].[DeletePerson]
	@Email nvarchar(200)
AS
	SET NOCOUNT ON;
	DELETE FROM dbo.PersonAddressTable
	WHERE Email = @Email
RETURN 0
