document.addEventListener('DOMContentLoaded',() =>{
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startButton = document.querySelector('.start')

  const width = 10
  let currentIndex = 0 //primeiro elemento do grid
  let foodIndex = 0
  let currentSnake = [2, 1, 0] // numeros represantam as divs no grid
  //sendo 2 == head e 0 == tail

  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0 
  let interval = 0

  //start \ restart o jogo
  function startGame() {
    //utilizando arrow function (=>) forEach para considerar cada index da snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[foodIndex].classList.remove('food')
    clearInterval(interval)
    score = 0
    randomFood()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

  //função para lidar com movimentos da snake
  function moveOutcomes(){
    if (
      (currentSnake[0] + width >= (width * width) && direction === width) || //se snake toca o fundo
      (currentSnake[0] % width === width -1 && direction === 1) || //se snake toda parede direita
      (currentSnake[0] % width === 0 && direction === -1) || //se snake toca parede da esquerda
      (currentSnake[0] - width < 0 && direction === -width) || //se snake toca o topo
      squares[currentSnake[0] + direction].classList.contains('snake') //se snake toca a si mesma
    ) {
      return clearInterval(interval) //assim o intervalo será limpo caso alguma condição acima seja encontrada
    }

    const tail = currentSnake.pop() //remove e mostra o ultimo item do array
    squares[tail].classList.remove('snake') //remove a classse snake da tail
    currentSnake.unshift(currentSnake[0] + direction) //determina a direção da head

    //snake coletando food
    if (squares[currentSnake[0]].classList.contains('food')) {
      squares[currentSnake[0]].classList.remove('food')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomFood()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }

  //gerando uma nova food
  function randomFood() {
    do {
      foodIndex = Math.floor(Math.random() * squares.length)
    } while(squares[foodIndex].classList.contains('snake'))
    squares[foodIndex].classList.add('food')
  }



  //funções associadas a teclas
  function control(e){
    //removendo a classe snake de Todo o grid
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39){
      direction = 1 // assim snake movimenta-se ao detect press seta para a direita
    } else if (e.keyCode === 38) {
      direction = -width //pressionando seta para cima a snake voltara 10 divs;
      //dando a impressao de subir
    } else if (e.keyCode === 37) {
      direction = -1 //pressionando seta para esquerda a snake se move uma div para a esquerda
    } else if (e.keyCode === 40) {
      direction = +width //pressionando a seta para baixo a snake(head) aparecerá, instantaneamente, 10 divs a partir de onde estiver
    }
  }

  document.addEventListener('keyup', control)
  startButton.addEventListener('click', startGame)
})