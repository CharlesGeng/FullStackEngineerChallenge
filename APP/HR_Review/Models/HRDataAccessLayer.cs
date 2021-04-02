﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HR_Review.Models
{
    public class HRDataAccessLayer
    {

        HR_ReviewDBContext db = new HR_ReviewDBContext();

        public IEnumerable<Users> GetAllUsers()
        {
            try
            {
                return db.Users.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new user record     
        public int AddUser(Users user)
        {
            try
            {
                db.Users.Add(user);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar user 
        public int UpdateUser(Users user)
        {
            try
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular user
        public Users GetUserData(int id)
        {
            try
            {
                Users user = db.Users.Find(id);
                return user;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular user
        public int DeleteUser(int id)
        {
            try
            {
                Users user = db.Users.Find(id);
                db.Users.Remove(user);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}