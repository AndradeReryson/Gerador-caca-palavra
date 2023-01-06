import * as exp from "/JS/Gerar_quadro.js" ;
import callModal from "/JS/modais.js";

export default function selecionarLetras(){
    const letras_selecionadas = []
    let selecionando = false

    /* adicionando os event listeners pra cada letra do quadro, permitindo serem selecionadas, mudar o fundo, etc */
    let letras = document.querySelectorAll('.letra')

    letras.forEach((item) => {

        // ao apertar e segurar o botão esquerdo do mouse
        item.addEventListener('mousedown', function(){
            selecionando = true
            item.style.outline = "none"
            /* aplica o efeito do mouseover no primeiro elemento que voce clicar */
            /* sem isso, a letra que voce clica primeiro não é selecionada, só as proximas após apertar*/
            if(item.style.backgroundColor == "beige"){
                item.style.backgroundColor = "lightblue"
                //item.closest("td").style.backgroundColor = "lightblue"
            } else if (item.style.backgroundColor == "lightgreen"){
                item.style.outline = "1px solid blue"
            }
            // envia as informações da letra no quadro, sendo elas [letra, linha, coluna], para o vetor de letras_selecionadas
            letras_selecionadas.push([item.textContent,item.getAttribute("data-y"),item.getAttribute("data-x")])
        })

        // ao mover o mouse sobre as letras
        item.addEventListener('mouseover', function(){
            // após o usuário ativar o mousedown (segurar o botao do mouse), ao passar o mouse por cima de outras letras ele irá selecioná-las
            if(selecionando == true){
                if(item.style.backgroundColor == "beige"){
                    item.style.backgroundColor = "lightblue"
                    //item.closest("td").style.backgroundColor = "lightblue"
                } else if (item.style.backgroundColor == "lightgreen") {
                    item.style.outline = "1px solid blue"
                }
                letras_selecionadas.push([item.textContent,item.getAttribute("data-y"),item.getAttribute("data-x")])
            } else {
                item.style.outline = "1px solid black"
            }
        })

        // ao soltar o botão esquerdo do mouse
        item.addEventListener('mouseup', function(){
            selecionando = false
            let acertou = conferirPalavra() // pede pra conferir a palavra selecionada

            if(acertou[0] == true){
                marcarAcerto(acertou[1]) // manda a palavra para ser marcada no quadro
                letras_selecionadas.length = 0 // zera as letras selecionadas
            } else {
                letras_selecionadas.length = 0 // zera as letras selecionadas
                limparSelecao() // limpa a seleção
            }
        })

        // ao tirar o mouse de cima de uma letra
        item.addEventListener('mouseout', function(){
            if(selecionando == false){
                item.style.outline = "none" // tira a borda preta da letra quando você tira o mouse dela
            }
        })
    })

    // função que devolve para as letras a cor de fundo normal, com exceção de quando a palavra foi marcada corretamente
    function limparSelecao(){
        letras.forEach((item) => {
            if(item.style.backgroundColor == "lightblue"){
                item.style.backgroundColor = "beige"
                //item.closest("td").style.backgroundColor = "beige"
            }
            if(item.style.outline){
                item.style.outline = "none"
            }
            
        })
    }

    // função que confere se a palavra esta certa
    function conferirPalavra(){
        let tamanho_selecao = letras_selecionadas.length
        let palavra_selecionada = ""
        
        // dados da letra no HTML, sendo eles a letra, posição y e posição x
        let letra = ""
        let letra_y = 0
        let letra_x = 0

        let checagem_letra = true // se mantem true caso esteja tudo certo

        // aqui será usado o quadro_usado como referencia
        // esse laço vai montar a palavra selecionada e conferir se cada letra selecionada bate com o as letras que estão no quadro_usado
        for(let conf = 0; conf < tamanho_selecao; conf++){
            letra = letras_selecionadas[conf][0]
            letra_y = letras_selecionadas[conf][1]
            letra_x = letras_selecionadas[conf][2]

            palavra_selecionada = palavra_selecionada+letra // monta a palavra juntando as letras

            if(!(letra == exp.quadro_usado[letra_y][letra_x])){
                // confere se a letra selecionada bate com a letra que está no quadro_usado. 
                // como a seleção de letras é livre, o usuário não é obrigado a selecionar letras em linha reta, portanto, ele pode montar a palavra usando qualquer letra que forme a palavra
                // para evitar isso, comparamos a letra selecionada com a que está presente no quadro_usado, pois nesta matriz só existem as palavras que foram inseridas, logo, quando o usuario seleciona uma letra errada (mesmo fazendo sentido) no quadro, no quadro_usado essa letra será um valor "null"
                checagem_letra = false
            }
        }

        // se a palavra selecionada existir no vetor "palavras" e as letras estiverem corretas
        if(exp.palavras.includes(palavra_selecionada) && checagem_letra == true){
            return [true, palavra_selecionada]
        } else {
            return [false, palavra_selecionada]
        }
    }


    let total_encontradas = 0 // total de palavras encontradas
    let falta_encontrar = exp.palavras_inseridas.length

    // função que marca no quadro a palavra encontrada e tambem marca ela na lista de palavras
    function marcarAcerto(palavra){
        letras.forEach((item) => {
            // se estiver com a borda aparecendo, tira ela
            if(item.style.outline){
                item.style.outline = "none"
            }

            // se a palavra estiver certa, o fundo deixa de ser azul e fica verde
            if(item.style.backgroundColor == "lightblue"){
                item.style.backgroundColor = "lightgreen"
                //item.closest("td").style.backgroundColor = "lightgreen"
            }

            // muda a cor da palavra encontrada na lista de palavras
            let palavra_certa = document.querySelector('li[data-palavra="'+palavra+'"]')
            palavra_certa.classList.add("encontrou")
        })

        // confere se a palavra que o usuário selecionou já não foi encontrada antes
        if(!(exp.palavras_encontradas.includes(palavra))){
            exp.palavras_encontradas.push(palavra)
            total_encontradas++
            falta_encontrar--
            document.querySelector(".palavras h2").innerHTML = "Faltam: "+falta_encontrar
        }
        
        if(total_encontradas == exp.palavras_inseridas.length){
            callModal("Parabens, encontrou tudo","lightgreen",2000)
        }
        
        //console.log(total_encontradas+"/"+exp.palavras_inseridas.length)
    }
}