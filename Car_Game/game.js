game();

function game()
{
    let isPause = false;
    let animationId = null;

    // window.innerHeight
    // window.innerWidth

    const speed = 3;

    const car = document.querySelector('.car');
    const carWidth = car.clientWidth / 2;
    const carHeight = car.clientHeight;

    const coin = document.querySelector('.coin');
    const coinCoord = getCoords(coin);
    const coinWidth = coin.clientWidth / 2;

    const arrow = document.querySelector('.arrow');
    const arrowCoord = getCoords(arrow);
    const arrowWidth = arrow.clientWidth / 2;

    const danger = document.querySelector('.danger');
    const dangerCoord = getCoords(danger);
    const dangerWidth = danger.clientWidth / 2;

    const road = document.querySelector('.road');
    const roadHeight = road.clientHeight;
    const roadWidth = road.clientWidth / 2;

    const trees = document.querySelectorAll('.tree');

    const carCoords = getCoords(car);
    const carMoveInfo = {
        top: null,
        bottom: null,
        left: null,
        right: null
    };
    const treesCoords = [];

    for (let i=0; i < trees.length; i++)
    {
        const tree = trees[i];
        const coordsTree = getCoords(tree); // Это нужно для всех деревьев

        treesCoords.push(coordsTree);
    }


    // keydown keyup keypress
   
    document.addEventListener('keydown', (e) =>{
        if(isPause)
        {
            return;
        }

        const code = e.code;

        if(code === 'ArrowUp' && carMoveInfo.top === null)
        {
            carMoveInfo.top = requestAnimationFrame(carMoveToTop);
        }

        if(code === 'ArrowDown' && carMoveInfo.bottom === null)
        {
            carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
        }

        if(code === 'ArrowLeft' && carMoveInfo.left === null)
        {
            carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
        }

        if(code === 'ArrowRight' && carMoveInfo.right === null)
        {
            carMoveInfo.right = requestAnimationFrame(carMoveToRight);
        }


        //WASD
        if(code === 'KeyW' && carMoveInfo.top === null)
        {
            carMoveInfo.top = requestAnimationFrame(carMoveToTop);
        }

        if(code === 'KeyS' && carMoveInfo.bottom === null)
        {
            carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
        }

        if(code === 'KeyA' && carMoveInfo.left === null)
        {
            carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
        }

        if(code === 'KeyD' && carMoveInfo.right === null)
        {
            carMoveInfo.right = requestAnimationFrame(carMoveToRight);
        }


    })

     
    document.addEventListener('keyup', (e) =>{
        const code = e.code;

        

        if(code === 'ArrowUp')
        {
            cancelAnimationFrame(carMoveInfo.top);
            carMoveInfo.top = null;
        }

        if(code === 'ArrowDown')
        {
            cancelAnimationFrame(carMoveInfo.bottom);
            carMoveInfo.bottom = null;
        }

        if(code === 'ArrowLeft')
        {
            cancelAnimationFrame(carMoveInfo.left);
            carMoveInfo.left = null;
        }

        if(code === 'ArrowRight')
        {
            cancelAnimationFrame(carMoveInfo.right);
            carMoveInfo.right = null;
        }

        if(code === 'KeyW')
        {
            cancelAnimationFrame(carMoveInfo.top);
            carMoveInfo.top = null;
        }

        if(code === 'KeyS')
        {
            cancelAnimationFrame(carMoveInfo.bottom);
            carMoveInfo.bottom = null;
        }

        if(code === 'KeyA')
        {
            cancelAnimationFrame(carMoveInfo.left);
            carMoveInfo.left = null;
        }

        if(code === 'KeyD')
        {
            cancelAnimationFrame(carMoveInfo.right);
            carMoveInfo.right = null;
        }
    })

    function carMoveToTop()
    {
        const newY = carCoords.y - 5; 

        if(newY < 0)
        {
            return;
        }
        carCoords.y = newY;
        CarMove(carCoords.x, newY)
        carMoveInfo.top = requestAnimationFrame(carMoveToTop);
    }

    function carMoveToBottom()
    {
        const newY = carCoords.y + 5;   
        
        if(newY + carHeight > roadHeight)
        {
            return;
        }
        carCoords.y = newY;
        CarMove(carCoords.x, newY)
        carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
    }

    function carMoveToLeft()
    {
        const newX = carCoords.x - 5;   
        
        if(newX < -roadWidth + carWidth)
        {
            return
        }

        carCoords.x = newX;
        CarMove(newX, carCoords.y)
        carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
    }

    function carMoveToRight()
    {
        const newX = carCoords.x + 5;    
        
         
        if(newX > roadWidth - carWidth)
        {
            return
        }
        
        carCoords.x = newX;
        CarMove(newX, carCoords.y)
        carMoveInfo.right = requestAnimationFrame(carMoveToRight);
    }

    function CarMove (x, y)
    {
        car.style.transform = `translate(${x}px ,${y}px)`;
    }


    // const firsttree = trees[0];
    // const coordsTree1 = getCoords(firsttree); - Это нужно для одного дерево
    // const coords = getCoords(firsttree);

    animationId = requestAnimationFrame(StartGame);

    function StartGame() // Запуск игры
    {
        treesAnimation();
        elementAnimation(coin, coinCoord, coinWidth, -100);
        elementAnimation(danger, dangerCoord, dangerWidth, -250);
        elementAnimation(arrow, arrowCoord, arrowWidth, -600);

        animationId = requestAnimationFrame(StartGame);
    }

    function treesAnimation() // отрисовка анимаций деревьев
    {
        for (let i=0; i < trees.length; i++)
        {
            const tree = trees[i];
            const coords = treesCoords[i];

            let newYCoord = coords.y +speed;

            if(newYCoord > window.innerHeight)
            {
                newYCoord = -400;
            }

            treesCoords[i].y = newYCoord;
    
            // const newCoord = getCoords(firsttree) + speed;
            tree.style.transform = `translate(${coords.x}px ,${newYCoord}px)`;
        }
    }


    function elementAnimation(element, elementCoord, elementWidth, elementInitialYCoord)
    {
        let newYCoord = elementCoord.y +speed;
        let newXCoord = elementCoord.x;

        if(newYCoord > window.innerHeight)
        {
            newYCoord = elementInitialYCoord;

            const direction = parseInt(Math.random() * 2);

            const maxXCoord = (roadWidth + 1 - elementWidth);

            const randomXCoord = parseInt(Math.random() * maxXCoord);
    
            // if(direction === 0) // двигаем влево
            // {
            //     newXCoord = -randomXCoord;
            // }
            // else if (direction === 1) // двигаем вправо
            // {
            //     newXCoord = randomXCoord;
            // }
    
            newXCoord = direction === 0 ? -randomXCoord : randomXCoord // двигаем или велво или вправо
        }

       
        
        elementCoord.y = newYCoord;
        elementCoord.x = newXCoord;
        element.style.transform = `translate(${newXCoord}px ,${newYCoord}px)`;
    }

    function getCoords(element) // Берем координаты для анимации
    {
        const matrix = window.getComputedStyle(element).transform;
        const array = matrix.split(',');
        const y = array[array.length-1];
        const x = array[array.length-2];
        const numericY = parseFloat(y);
        const numericX = parseFloat(x);
        
        return {x: numericX, y: numericY};
    }



    const PauseButton = document.querySelector('.pause_button'); // кнопка паузы
    PauseButton.addEventListener('click', () =>{
        isPause = !isPause;
        if(isPause) {
            cancelAnimationFrame(animationId);
            cancelAnimationFrame(carMoveInfo.top);
            cancelAnimationFrame(carMoveInfo.bottom);
            cancelAnimationFrame(carMoveInfo.left);
            cancelAnimationFrame(carMoveInfo.right);
            PauseButton.children[0].style.display = 'none';
            PauseButton.children[1].style.display = 'initial';
        }
        else{
            animationId = requestAnimationFrame(StartGame);
            PauseButton.children[0].style.display = 'initial';
            PauseButton.children[1].style.display = 'none';
        }
    })
}