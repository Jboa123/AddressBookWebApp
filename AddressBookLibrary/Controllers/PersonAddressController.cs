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
        public List<PersonAddressModel> People { get; set; }
        public PersonAddressController(ILogger<PersonAddressController> logger, DataAccess DA)
        {
            _dataAccess = DA;
            _logger = logger;
            People = _dataAccess.LoadData<PersonAddressModel>(SQLProceedures.LoadPeopleAddresses());
        }

        [HttpGet]
        public IEnumerable<PersonAddressModel> GetPeopleAddresses()
        {
            return this.People.ToArray();
        }
           
        [HttpPost]
        public void SavePerson (PersonAddressModel person)
        {
            DoesEmailExist(person);
            _dataAccess.SaveData(SQLProceedures.SavePersonAddress() ,person);
        }

        private void DoesEmailExist(PersonAddressModel newPerson)
        {
            foreach(PersonAddressModel savedPerson in this.People)
            {
                if(savedPerson.Email == newPerson.Email)
                {
                    throw new Exception("Email already exists");
                }
            }
        }

    }
}

