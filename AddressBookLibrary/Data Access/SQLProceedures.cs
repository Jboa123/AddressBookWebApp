using System;
using System.Collections.Generic;
using System.Text;

namespace AddressBookLibrary
{
    public static class SQLProceedures
    {
        public static string SavePersonAddress()
        {
            return "dbo.SavePersonAddress @Email, @FirstName, @LastName, @Phone";
        }

        public static string LoadPeopleAddresses()
        {
            return "dbo.LoadPeopleAddresses";
        }
    }
}
