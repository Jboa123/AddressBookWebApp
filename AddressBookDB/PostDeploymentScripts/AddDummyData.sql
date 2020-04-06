/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
IF 0 = (select count(*) FROM PersonAddressTable)
BEGIN
    INSERT INTO dbo.PersonAddressTable (Email, First_name, Last_name, Phone_number)
    VALUES ('johndoe@gmail.com', 'John', 'Doe', '01234567891'), ('suesmith@gmail.com', 'Sue', 'Smith', '98765432109')
END