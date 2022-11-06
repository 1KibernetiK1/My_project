using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Tetris
{
    public partial class Form1 : Form
    {
        Figure CurrentFigure;
        int size;
        int[,] map = new int[16, 8];
        public Form1()
        {
            InitializeComponent();
            init();
        }

        public void init()
        {
            size = 25;

            CurrentFigure = new Figure(3, 0);

            timer1.Interval = 100;
            timer1.Tick += Timer1_Tick;

            Invalidate();
        }

        private void Timer1_Tick(object sender, EventArgs e)
        {
            CurrentFigure.MoveDown();
            Merge();
            Invalidate();
        }

        public void Merge()
        {
            for (int i = CurrentFigure._y; i < CurrentFigure._y + 3; i++)
            {
                for (int j = CurrentFigure._x; j < CurrentFigure._x + 3; j++)
                {
                    map[i, j] = CurrentFigure.matrix[i - CurrentFigure._y, j-CurrentFigure._x];
                }
            }
        }

        public void DrawMap(Graphics g)
        {
            for (int i = 0; i < 16; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    if (map[i, j] == 1)
                    {
                        g.FillRectangle(Brushes.Red, new Rectangle(50+j*size, 50+i*size, size, size));
                    }
                }
            }
        }

        public void DrawGrid(Graphics g)
        {
            for (int i = 0; i <= 16; i++)
            {
                g.DrawLine(Pens.Black, new Point(50, 50+i*size), new Point(50+8*size, 50+i*size));
            }
            for (int i = 0; i <= 8; i++)
            {
                g.DrawLine(Pens.Black, new Point(50+i* size, 50), new Point(50 + i * size, 50 + 16 * size));
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void OnPaint(object sender, PaintEventArgs e)
        {
            DrawGrid(e.Graphics);
        }
    }
}
