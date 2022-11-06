﻿using System;
using System.IO;
using System.Linq;

namespace StreamProfiling
{
    internal sealed class Generator
    {
        private readonly Random _random = new Random();
        private readonly string[] _fileName;

        public Generator()
        {

            _fileName = Enumerable.Range(0, 10000).Select(x =>
            {
                var range = Enumerable.Range(0, _random.Next(20, 100));
                var chars = range.Select(a => (char)_random.Next('A', 'Z')).ToArray();
                var str = new string(chars);
                return str;
            }).ToArray();

        } 


            public string Generate(int linesCount)
            {
                var fileName = "L" + linesCount + ".txt";
                using (var writer = new StreamWriter(fileName))
                {
                    for (int i = 0; i < linesCount; i++)
                    {
                        writer.WriteLine(GenerateNumber() + ". " + GenerateString());
                    }
                }
                return fileName;
            }

            private string GenerateString() => _fileName[_random.Next(0, _fileName.Length)];



            private string GenerateNumber() => _random.Next(0, 10000).ToString();

        

    }
    
}
