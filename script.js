/* script.js
   Exemplos comentados de funções tradicionais, escopo e retorno.
*/

/* ---------- 1. Exemplo básico: função sem retorno (mostra escopo local) ---------- */
function saudacaoSimples(nome) { // 'nome' é parâmetro; variável local à função
  const mensagem = "Olá, " + nome + "!"; // 'mensagem' é local (escopo da função)
  console.log(mensagem);
}
// Uso:
saudacaoSimples("Maria"); // imprime "Olá, Maria!"

/* ---------- 2. Escopo global vs local ---------- */
var contadorGlobal = 0; // variável global (evitar 'var' em produção, usado aqui para demonstrar)

function incrementar() {
  var contadorLocal = 0; // local à função
  contadorLocal += 1;
  contadorGlobal += 1;
  console.log("local:", contadorLocal, "global:", contadorGlobal);
}
incrementar();
incrementar();
// 'contadorLocal' não existe fora da função; 'contadorGlobal' foi alterada globalmente

/* ---------- 3. Função com retorno: cálculo do IMC (PoC) ---------- */
/*
  IMC = peso / (altura * altura)
  - peso em kg
  - altura em metros
*/
function calcularIMC(peso, altura) {
  if (typeof peso !== 'number' || typeof altura !== 'number') {
    // retorno antecipado: validação simples
    return null;
  }
  if (altura <= 0) return null;
  var imc = peso / (altura * altura);
  return imc; // retorna o valor calculado
}

// Uso:
console.log("IMC (70, 1.75):", calcularIMC(70, 1.75).toFixed(2));

/* ---------- 4. Exemplo avançado: função que retorna objeto com análise ---------- */
function analisarIMC(peso, altura) {
  var imc = calcularIMC(peso, altura);
  if (imc === null) {
    return { error: "Entrada inválida" }; // retorno de objeto em caso de erro
  }

  var categoria = "";
  if (imc < 18.5) categoria = "Abaixo do peso";
  else if (imc < 25) categoria = "Peso normal";
  else if (imc < 30) categoria = "Sobrepeso";
  else categoria = "Obesidade";

  return {
    imc: Number(imc.toFixed(2)),
    categoria: categoria
  };
}

// Uso avançado:
console.log(analisarIMC(70, 1.75)); // { imc: 22.86, categoria: "Peso normal" }

/* ---------- 5. Ligar a interface do index.html ---------- */
document.getElementById('calcular').addEventListener('click', function () {
  var peso = parseFloat(document.getElementById('peso').value);
  var altura = parseFloat(document.getElementById('altura').value);

  var resultado = analisarIMC(peso, altura);

  var p = document.getElementById('resultado');
  if (resultado.error) {
    p.textContent = "Erro: " + resultado.error;
  } else {
    p.textContent = "IMC: " + resultado.imc + " — " + resultado.categoria;
  }
});

/* ---------- 6. Exemplos opcionais (mais avançados) ---------- */
/* Função tradicional com parâmetro opcional (usando condicional):
   mostra como tratar valores padrão sem usar arrow functions */
function multiplicar(a, b) {
  if (b === undefined) b = 1; // valor padrão manual
  return a * b;
}
console.log(multiplicar(5)); // 5
console.log(multiplicar(5, 3)); // 15
