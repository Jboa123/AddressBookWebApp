using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;


namespace AddressBookLibrary.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonAddressController : ControllerBase
    {

        private readonly DataAccess _dataAccess;
        private readonly ILogger<PersonAddressController> _logger;
        
        public PersonAddressController(ILogger<PersonAddressController> logger, DataAccess DA)
        {
            _dataAccess = DA;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<PersonAddressModel> GetPeopleAddresses()
        {
            return _dataAccess.LoadData<PersonAddressModel>(SQLProceedures.LoadPeopleAddresses());
        }
           
        [HttpPost]
        public void SavePerson (PersonAddressModel person)
        {
            CheckDataValidity(person);
            _dataAccess.SaveData(SQLProceedures.SavePersonAddress() ,person);
        }

        [HttpDelete]
        [Route("{Email?}")]
        public void DeletePersonFromDB(string email)
        {
           _dataAccess.DeleteData(SQLProceedures.DeletePerson(), new { Email = email });
        }

        private void CheckDataValidity(PersonAddressModel newPerson)
        {
            List<PersonAddressModel> savedPeople = _dataAccess.LoadData<PersonAddressModel>(SQLProceedures.LoadPeopleAddresses());
            foreach (PersonAddressModel savedPerson in savedPeople)
            {
                if (newPerson.FirstName == "")
                {
                    throw new Exception("First name is required");
                }
                if(newPerson.LastName == "")
                {
                    throw new Exception("Last name is required");
                }
                if(savedPerson.Email == newPerson.Email)
                {
                    throw new Exception("Email already exists", null);
                }
            }
        }

    }
}

