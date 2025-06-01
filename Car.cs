using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp2
{
    public class Car
    {
        public int Id { get; }
        public string LicensePlateNumber { get; }
        public string Brand { get; }
        public string Model { get; }
        public int DailyCost { get; }

        public Car(int id, string licensePlateNumber, string brand, string model, int dailyCost)
        {
            Id = id;
            LicensePlateNumber = licensePlateNumber;
            Brand = brand;
            Model = model;
            DailyCost = dailyCost;
        }
    }
}
