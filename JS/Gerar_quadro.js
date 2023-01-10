import inserirPalavras from "./inserir_palavras.js"
import selecionarLetras from "./selecionar_letras.js"

// tamanho do quadro
export let altura = 15
export let comprimento = 15
export let quant_palavras = 10

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    comprimento = 13
}

// essa variavel é modificada pelo "modais.js" o qual manda o valor 
export let tipo_lista = "default"

// vetor com as palavras que o usuário inseriu para gerar o quadro
export const palavras_custom = []

// vetor com as palavras que vão pro quadro
export const palavras = []

// vetor com as palavras que foram de fato inseridas (pode ser que alguma palavra não encaxe no quadro, então vai ficar fora deste vetor)
export const palavras_inseridas = []

// vetor com as palavras que não foram inseridas no quadro por falta de espaço
export const palavras_nao_usadas = []

// vetor com as palavras encontradas (usado pra saber se tudo foi achado e dar alert)
export const palavras_encontradas = []

// vetores do quadro (que será impresso no HTML) e quadro_usado (usado como referencia para inserir palavras no quadro e selecioná-las depois)
export const quadro = Array.apply(null, Array(altura)).map(function () {}) // definindo o vetor com valores nulos
export const quadro_usado = Array.apply(null, Array(altura)).map(function () {})

// vetor com as palavras a serem inseridas
export const animais = [
    "ABELHA","AVESTRUZ","ARANHA","ARRAIA",
    "BALEIA","BESOURO","BURRO","BODE",
    "CAVALO","CASTOR","CORVO","CIGARRA","CACHORRO",
    "ELEFANTE","ESCORPIÃO","ESQUILO",
    "FALCÃO","FORMIGA","FOCA",
    "GAIVOTA", "GAMBÁ", "GATO","GUAXINIM","GUEPARDO",
    "HIENA","HAMSTER",
    "IGUANA","IMPALA",
    "JACARÉ", "JAVALI", "JIBOIA","JAGUAR",
    "LAGARTA", "LEÃO", "LOBO", "LEOPARDO","LHAMA",
    "KOALA",
    "MACACO", "MARIPOSA", "MINHOCA","MARMOTA",
    "ORCA", "OVELHA", "OSTRA",
    "PANTERA", "PEIXE", "PORCO", "POLVO", "PARDAL","PELICANO",
    "RAPOSA", "RATAZANA",
    "SAPO", "SARDINHA", "SUCURI","SALMÃO",
    "TATU", "TEXUGO", "TOPEIRA","TIGRE","TUBARÃO","TAMANDUÁ",
    "URSO", "URUBU",
    "VACA","VEADO",
    "ZEBRA"
]


export default function gerarCacaPalavra(){
    palavras_inseridas.length = 0
    palavras_nao_usadas.length = 0
    palavras_encontradas.length = 0

    const alfabeto = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]

    // laço pra criar as colunas do quadro e preenche-los com letras
    for(let l = 0; l < altura; l++){
        quadro[l] = Array.apply(null, Array(5)).map(function () {})
        for(let c = 0; c < comprimento; c++){
            let index = Math.floor(Math.random() * alfabeto.length)
            quadro[l][c] = alfabeto[index]
        }
    }

    // criando colunas vazias para o quadro_usado
    for(let q = 0; q < altura; q++){
        quadro_usado[q] = Array.apply(null, Array(comprimento)).map(function () {})
    }

    // vetor para controlar quais palavras ja foram escolhidas anteriormente
    const index_selecionados = []
    index_selecionados.length = 0
    
    // usado para definir o tamanho de cada palavra (será colocado em ordem crescente posteriormente)
    const tamanho_palavras = []
    tamanho_palavras.length = 0

    // usado para guardar as palavras que foram escolhidas para ir pro quadro. Dependendo do tamanho da palavra ela irá antes/depois de outras
    const palavras_temp = []
    palavras_temp.length = 0

    // veriifica se o usuário quer usar o vetor de animais ou o vetor customizado que ele inserir
    if(tipo_lista == "default"){
        // laço que escolhe nomes de animais do vetor "animais". Se o mesmo não foi selecionado antes ele é mandado pro vetor "palavras"
        for(let z = 0; z < quant_palavras; z++){ 
            let total_animais = animais.length
            let index_aleatorio = 0
            while(true){
                index_aleatorio = Math.floor(Math.random() * total_animais)
                if(!(index_selecionados.includes(index_aleatorio))){
                    index_selecionados.push(index_aleatorio)
                    break
                }
            }

            let animal_aleatorio = animais[index_aleatorio]

            tamanho_palavras.push(animal_aleatorio.length) // tamanho do nome do animal escolhido
            palavras_temp.push(animal_aleatorio) // nome do animal que vai pro vetor temporario "palavras_temp"
        }


        // colocamos os tamanhos dos nomes em ordem crescente
        tamanho_palavras.sort()

        // esse laço vai iterar o vetor "tamanho_palavras". Será usado como referencia para encontrar palavras que possuam um tamanho especifico.
        // o objetivo é colocar as palavras maiores primeiro no quadro, pois assim fica mais facil encaixar as outras palavras depois
        for(let v = 0; v < tamanho_palavras.length; v++){
            let tam_palavra = tamanho_palavras[v]
            
            let aux1 = 0
            while(true){
                if(tam_palavra == palavras_temp[aux1].length){
                    palavras.unshift(palavras_temp[aux1]) // coloca os nomes no começo do vetor
                    palavras_temp.splice(aux1,1) // deleta o nome que foi mandado pro vetor "palavras" 
                    break
                }
                aux1++
            }    
        }
    } else {
        // laço que escolhe nomes de animais do vetor "animais". Se o mesmo não foi selecionado antes ele é mandado pro vetor "palavras"
        for(let z2 = 0; z2 < quant_palavras; z2++){ 
            let total_custom = palavras_custom.length
            let index_aleatorio2 = 0
            while(true){
                index_aleatorio2 = Math.floor(Math.random() * total_custom)
                if(!(index_selecionados.includes(index_aleatorio2))){
                    index_selecionados.push(index_aleatorio2)
                    break
                }
            }

            let palavra_c_aleatoria = ""
            palavra_c_aleatoria = palavras_custom[index_aleatorio2]

            tamanho_palavras.push(palavra_c_aleatoria.length) // tamanho da palavra escolhida
            palavras_temp.push(palavra_c_aleatoria) // palavra que vai pro vetor temporario "palavras_temp"
        }


        // colocamos os tamanhos dos nomes em ordem crescente
        tamanho_palavras.sort()

        // esse laço vai iterar o vetor "tamanho_palavras". Será usado como referencia para encontrar palavras que possuam um tamanho especifico.
        // o objetivo é colocar as palavras maiores primeiro no quadro, pois assim fica mais facil encaixar as outras palavras depois
        for(let v2 = 0; v2 < tamanho_palavras.length; v2++){
            let tam_palavra = tamanho_palavras[v2]
            
            let contador = 0
            while(true){
                if(tam_palavra == palavras_temp[contador].length){
                    palavras.unshift(palavras_temp[contador]) // coloca os nomes no começo do vetor
                    palavras_temp.splice(contador,1) // deleta o nome que foi mandado pro vetor "palavras" 
                    break
                }
                contador++
            }    
        }
    }
    
    
    /* Inserindo as palavras no quadro*/
    inserirPalavras() // importado do inserir_palavras.js

    /* imprimindo o quadro no HTML e no console */

    // linha da tabela
    let linha = ""

    for(let y = 0; y < altura; y++){
        linha = linha + "<tr>"
        for(let x = 0; x < comprimento; x++){ 
            linha = linha+"<td class='letra' data-x="+x+" data-y="+y+" style='background-color: beige;'>"+quadro[y][x]+"</td>" 
        }
        linha = linha + "</tr>"
    }
    
    document.querySelector(".quadro").innerHTML = linha

    // imprimindo a lista de palavras que deverão ser encontradas
    let items_lista = ""

    for(let idx = 0; idx < palavras_inseridas.length; idx++){
        items_lista = items_lista+"<li class='palavra' data-palavra='"+palavras_inseridas[idx]+"'>"+palavras_inseridas[idx]+"</li>"
    }

    document.querySelector(".lista_palavras").innerHTML = items_lista

    // imprimindo a lista de palavras que não foi possivel encaixar no quadro

    let items_nao_usados = palavras_nao_usadas.length

    if(palavras_nao_usadas.length > 0){
        document.querySelector("p.qnt_nao_utilizadas").innerHTML = "Não foi possível inserir "+items_nao_usados+" palavra(s)"
    } else {
        document.querySelector("p.qnt_nao_utilizadas").innerHTML = null
    }

    document.querySelector(".palavras h2").innerHTML = "Faltam: "+palavras_inseridas.length

    /* seleção das palavras e checagem se esta correta */
    selecionarLetras() // importado do selecionar_letras.js
}

export function setAltura(valor){
    altura = valor
}

export function setComrpimento(valor){
    comprimento = valor
}

export function setQntPalavras(valor){
    quant_palavras = valor
}

export function setTipoLista(valor){
    tipo_lista = valor
}
