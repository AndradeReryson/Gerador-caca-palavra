import * as exp from "./Gerar_quadro.js" ;

export default function inserirPalavras(){
    // variavis para decidir o numero de palavras que serão na horizontal e quantas vão ser na vertical
    // quantidades possiveis pra palavras horizontais (minimo 3 e maximo 5)
    const max_min = [
        Math.round((exp.quant_palavras/2)-2), // minimo
        Math.round((exp.quant_palavras/2)-1), // medio
        Math.round(exp.quant_palavras/2) // maximo
    ] 

    let num_horizontais = Math.floor(Math.random() * max_min.length)
    let total_horizontais = max_min[num_horizontais]
    let total_verticais = exp.quant_palavras - total_horizontais

    // função para definir se a palavra será na horizontal ou vertical
    function getWordPosition(palavra){
        let WordPosNum = Math.floor(Math.random() * 2) // 0 ou 1

        // insere primeiro a palavra na horizontal, mas se ja tiver o numero maximo de horizontais coloca na vertical
        if(WordPosNum == 0){
            if(total_horizontais > 0){
                insertHorizontal(palavra)
                total_horizontais--
            } else if(total_verticais > 0){
                insertVertical(palavra)
                total_verticais--
            }
        } 

        // insere primeiro a palavra na vertical, mas se ja tiver o numero maximo de verticais coloca na horizontal
        if(WordPosNum == 1){
            if(total_verticais > 0){
                insertVertical(palavra)
                total_verticais--
            } else if(total_horizontais > 0){
                insertHorizontal(palavra)
                total_horizontais--
            }
        } 

    }

    // insere a palavra selecionada na horizontal no quadro
    function insertHorizontal(palavra){
        let tamanho_palavra_h = palavra.length
        let horizontal_x = 0 // index aleatório que será usado para escolher uma posição no quadro[x][y]
        let horizontal_y = 0 // index aleatório que será usado para escolher uma posição no quadro[x][y]


        // vetor que vai segurar cada letra da palavra 
        const letras_h = []

        // itera a palavra e manda a letra pro vetor "letras"
        for(let char1 of palavra){
            letras_h.push(char1)
        }

        let max_tentativas_h = 20

        // laço que vai tentar encaixar a palavra no quadro, ele roda enquanto o max_tentativas for maior que 0
        // é necessário limitar o numero de tentativas pois haveram casos onde será impossivel inserir uma palavra dependendo das outras que ja estão no quadro
        // se for impossível o quadro não será gerado nunca
        while(true){
            horizontal_x = Math.floor(Math.random() * (exp.comprimento - tamanho_palavra_h)) // pega um index aleatório na linha, mas a palavra inteira precisa caber
            horizontal_y = Math.floor(Math.random() * exp.altura) // pega um index aleatório nas colunas
            let valido1 = 0
            
            // confirma se a palavra cabe no quadro. Se ela for maior que o quadro, "horizontal_x" vai ser um numero negativo
            if(horizontal_x >= 0){
                // laço que testa para ver se a posição da matriz escolhida aleatóriamente está disponível
                // um index estará disponível caso ele seja nulo (não tem letra nenhuma de outra palavra) ou se a letra que está no index é a mesma que será inserida
                for(let t1 = 0; t1 < tamanho_palavra_h; t1++){
                    if(exp.quadro_usado[horizontal_y][horizontal_x+t1] == null || exp.quadro_usado[horizontal_y][horizontal_x+t1] == letras_h[t1]){
                        valido1++
                    }
                }

                // a variavel "valido" vai dizer se todos os campos são validos. Ela deve ter o mesmo valor que o tamanho da palavra que vai ser inserida
                // se for verdadeiro ele coloca as letras na matriz "quadro" (que será impressa no HTML) e na matriz "quadro_usado" (usada como referência)
                // se for falso o laço vai tentar denovo
                if(valido1 === tamanho_palavra_h){
                    for(let h1 = 0; h1 < tamanho_palavra_h; h1++){
                        exp.quadro[horizontal_y][horizontal_x+h1] = letras_h[h1] 
                        exp.quadro_usado[horizontal_y][horizontal_x+h1] = letras_h[h1] 
                    }
                    exp.palavras_inseridas.push(palavra)
                    break
                }
            }

            if(max_tentativas_h > 0){
                max_tentativas_h--
            } else {
                console.log("impossivel encaixar "+palavra)
                exp.palavras_nao_usadas.push(palavra)
                break
            }
       
        }
    }

    function insertVertical(palavra){
        let tamanho_palavra_v = palavra.length
        let vertical_x = 0 // index aleatório que será usado para escolher uma posição no quadro[x][y]
        let vertical_y = 0 // index aleatório que será usado para escolher uma posição no quadro[x][y]

        // vetor que vai segurar cada letra da palavra 
        const letras_v = []

        // preenche o "letras" com cada letra da palavra. Será necessário pra jogar letra por letra na matriz "quadro"
        for(let char2 of palavra){
            letras_v.push(char2)
        }

        // inverte as letras da palavra. Como ela será colocada na vertical, basicamente define se a palavra será escrita de baixo pra cima ou vice-versa
        if(Math.floor(Math.random() * 2) == 1 ){
            letras_v.reverse()    
        } 

        let max_tentativas_v = 20

        // laço que vai tentar encaixar a palavra no quadro, ele roda enquanto o max_tentativas for maior que 0
        // é necessário limitar o numero de tentativas pois haveram casos onde será impossivel inserir uma palavra dependendo das outras que ja estão no quadro
        // se for impossível o quadro não será gerado nunca
        while(true){
            vertical_x = Math.floor(Math.random() * exp.comprimento )
            vertical_y = Math.floor(Math.random() * (exp.altura - tamanho_palavra_v))
            let valido2 = 0 

            // confirma se a palavra cabe no quadro. Se ela for maior que o quadro, "vertical_y" vai ser um numero negativo
            if(vertical_y >= 0){
                // testa para ver se a posição da matriz escolhida aleatóriamente está disponível
                // um index estará disponível caso ele seja nulo (não tem letra nenhuma de outra palavra) ou se a letra que está no index é a mesma que está sendo inserida 
                for(let t2 = 0; t2 < tamanho_palavra_v; t2++){
                    if(exp.quadro_usado[vertical_y+t2][vertical_x] == null || exp.quadro_usado[vertical_y+t2][vertical_x] == letras_v[t2]){
                        valido2++ 
                    }
                }

                
                // a variavel "valido" vai dizer se todos os campos são validos. Ela deve ter o mesmo valor que o tamanho da palavra que vai ser inserida
                // se for verdadeiro ele coloca as letras na matriz "quadro" (que será impressa no HTML) e na matriz "quadro_usado" (usada como referência)
                if(valido2 === tamanho_palavra_v){
                    for(let v1 = 0; v1 < tamanho_palavra_v; v1++){
                        exp.quadro[vertical_y+v1][vertical_x] = letras_v[v1] 
                        exp.quadro_usado[vertical_y+v1][vertical_x] = letras_v[v1] 
                    }
                    exp.palavras_inseridas.push(palavra) 
                    break
                } 
            }

            if(max_tentativas_v > 0){
                max_tentativas_v--
            } else{
                console.log("impossivel encaixar "+palavra)
                exp.palavras_nao_usadas.push(palavra)
                break
            }
            
        }
    }

    // envia cada palavra que foi escolhida aleatóriamente para ser inserida, ou na horizontal ou vertical
    for(let plv = 0; plv < exp.palavras.length; plv++){
        getWordPosition(exp.palavras[plv])
    }
}