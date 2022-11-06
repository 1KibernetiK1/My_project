using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tetris
{
    public class Figure
    {
        public int _x;
        public int _y;
        public int[,] matrix;

        public Figure(int x, int y)
        {
            _x = x;
            _y = y;
            matrix = new int[3, 3]
            {
                {0,1,0},
                {0,1,1},
                {0,0,1}
            };
        }

        public void MoveDown()
        {
            _y++;
        }

        public void MoveRight()
        {
            _x++;
        }

        public void MoveLeft()
        {
            _x--;
        }
    }
}
