using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace WpfApp2
{
    public class Statisztika
    {
        private List<Car> cars;

        public Statisztika()
        {
            cars = new List<Car>();
            try
            {
                LoadCarsFromDatabase();
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("Hiba az adatbázishoz való kapcsolódáskor: " + e.Message);
                Environment.Exit(1);
            }
        }

        private void LoadCarsFromDatabase()
        {
            string connStr = "server=localhost;database=cars;user=root;password=;";

            using (var conn = new MySqlConnection(connStr))
            {
                conn.Open();
                string query = "SELECT id, license_plate_number, brand, model, daily_cost FROM cars";
                using (var cmd = new MySqlCommand(query, conn))
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var car = new Car(
                            reader.GetInt32("id"),
                            reader.GetString("license_plate_number"),
                            reader.GetString("brand"),
                            reader.GetString("model"),
                            reader.GetInt32("daily_cost")
                        );
                        cars.Add(car);
                    }
                }
            }
        }

        public void RunTasks()
        {
            CountCheaperThan20000();
            HasMoreExpensiveThan26000();
            PrintMostExpensiveCar();
            PrintCarCountByBrand();
            CheckLicensePlateCost();
        }

        private void CountCheaperThan20000()
        {
            int count = cars.Count(c => c.DailyCost < 20000);
            Console.WriteLine($"20.000 Ft-nál olcsóbb napidíjú autók száma: {count}");
        }

        private void HasMoreExpensiveThan26000()
        {
            bool exists = cars.Any(c => c.DailyCost > 26000);
            if (exists)
                Console.WriteLine("Van az adatok között 26.000 Ft-nál drágább napidíjú autó");
            else
                Console.WriteLine("Nincs az adatok között 26.000 Ft-nál drágább napidíjú autó");
        }

        private void PrintMostExpensiveCar()
        {
            var maxCar = cars.OrderByDescending(c => c.DailyCost).FirstOrDefault();
            if (maxCar != null)
            {
                Console.WriteLine($"Legdrágább napidíjú autó: {maxCar.LicensePlateNumber} - {maxCar.Brand} – {maxCar.Model} – {maxCar.DailyCost} Ft");
            }
        }

        private void PrintCarCountByBrand()
        {
            Console.WriteLine("Autók száma:");
            var brandCounts = cars.GroupBy(c => c.Brand)
                                  .OrderBy(g => g.Key)
                                  .ToDictionary(g => g.Key, g => g.Count());

            foreach (var entry in brandCounts)
            {
                Console.WriteLine($"          {entry.Key}: {entry.Value}");
            }
        }

        private void CheckLicensePlateCost()
        {
            Console.Write("Adjon meg egy rendszámot: ");
            string plate = Console.ReadLine().Trim();

            var found = cars.FirstOrDefault(c => c.LicensePlateNumber.Equals(plate, StringComparison.OrdinalIgnoreCase));
            if (found != null)
            {
                if (found.DailyCost > 25000)
                    Console.WriteLine("A megadott autó napidíja nagyobb mint 25.000 Ft");
                else
                    Console.WriteLine("A megadott autó napidíja nem nagyobb mint 25.000 Ft");
            }
            else
            {
                Console.WriteLine("Nincs ilyen autó");
            }
        }

        public List<Car> Cars => cars;
    }
}
