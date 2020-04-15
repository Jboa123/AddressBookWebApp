using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Data.SqlClient;

namespace AddressBookLibrary
{
    public class DataAccess
    {
        string cnnString;

        public DataAccess(IConfiguration configuration)
        {
           cnnString = configuration.GetConnectionString("LocalSqlCnn");
        }


        public void SaveData<T>(string sqlProceedure, T data)
        {
            using(IDbConnection cnn = new SqlConnection(cnnString))
            {
                cnn.Execute(sqlProceedure, data);
            }
            
        }

        public List<T> LoadData<T>(string sqlProceedure)
        {
            List<T> People = new List<T>();
            using (IDbConnection cnn = new SqlConnection(cnnString))
            {
                People = cnn.Query<T>(sqlProceedure).AsList();
            }
            return People;
        }

        public void DeleteData<T>(string sqlProceedure, T data)
        {
            List<T> People = new List<T>();
            using (IDbConnection cnn = new SqlConnection(cnnString))
            {
                cnn.Execute(sqlProceedure, data);
            }
        }
    }
}
