using System;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace StreamProfiling
{


    class Program
    {
        static void Main(string[] args)
        {
            var sw = Stopwatch.StartNew();
            var fileName =new Generator().Generate(2000_000);
            new Sorter().Sort(fileName, 100_000);
            sw.Stop();
            Console.WriteLine($"Execution took: {sw.Elapsed}");
        }
    }
    
}
