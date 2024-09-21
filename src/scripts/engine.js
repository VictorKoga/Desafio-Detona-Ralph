// variveis que vai alterar algum visual na tela
const state = {
  view:{
    squares:document.querySelectorAll(".square"),
    enemy:document.querySelector(".enemy"),
    //quando a view é um id declara ela com #
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values:{
    timerId: null, 
    // variavel da posicao
    hitPosition: 0, 
    // variavel do resultado
    result: 0, 
    // variavel para o tempo
    currentTime: 60, 
  },
  actions:{
    // a cada mil milisegundos ira atualizar o countDown
    countDownTimerId: setInterval(countDown, 1000),
    // variavel do tempo que o enemy aparece
    gameVelocity: setInterval(randomSquare, 1000), 
  }
}

function countDown() {
  // sempre que chamar ele vai diminuir o valor que tem na variavel
  state.values.currentTime --
  // variavel que vai ficar atualizando o current de maneira visual
  state.view.timeLeft.textContent = state.values.currentTime
  // se o valor de currenttime for <= 0 ele exibe o alert
  if (state.values.currentTime <= 0) {
    // toda vez que o tempo acaba ele limpa os action
    clearInterval(state.actions.countDownTimerId)
    // toda vez que o tempo acaba ele limpa os action
    clearInterval(state.actions.timerId)
    // apos o tempo ele da o alerta da msg informando o result
    alert("Game Over! O seu resultado foi: " + state.values.result)
  }  
}
// função para exibir o audio 
function playSound(audioName){
  // cria uma nova variavel com o caminho que esta o audio
  let audio = new Audio(`./src/audios/${audioName}.m4a`)
  // defino o volume do audio
  audio.volume = 0.1
  // starta o audio 
  audio.play()
}
// ter um quadradro aleatorio que vai sortear um inimigo
function randomSquare(){
  state.view.squares.forEach((square) => {
    // limpando todas as classes que contem enemy
    square.classList.remove("enemy")
  })
  // sortear um numero aleatorio que vai de 1 a 9
  let randomNumber = Math.floor(Math.random() * 9)
  // adicionar a class enemy ao quadrado sorteado
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemy")
  state.values.hitPosition = randomSquare.id
}
// adicionar alguma ação associa a um evento
function addListenerHitBox(){
  state.view.squares.forEach((square) => {
    // evento de descida no clique do mouse
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        // adiciona o resultado mais 1
        state.values.result++
        // passa o resultado obtido para o result
        state.view.score.textContent = state.values.result
        // volta pra nulo 
        state.values.hitPosition = null
        playSound("hit")
      }
    })
  })
}
// cirar uma função para iniciar
function initialize(){
  addListenerHitBox()
}
initialize()
