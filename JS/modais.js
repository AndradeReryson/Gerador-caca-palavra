import * as exp from "./Gerar_quadro.js" ;
// script das caixas modais que vão ser mostradas na tela

// icone de configuração, texto descritivo e botão de fechar
let btn_config = document.querySelector('.desc_quadro')
let btn_icon_config = document.querySelector('.img_config_icon')
let btn_close_config = document.querySelector('#btn_close_config')
let modal_config_visivel = false;

function modalConfiguracoes(){
    let modal_config = document.querySelector(".fundo_modal_config")

    if(modal_config_visivel == false){
        modal_config.style.display = "flex"
        modal_config_visivel = true
    } else {
        modal_config.style.display = "none"
        modal_config_visivel = false
    }
}

btn_config.addEventListener("click", function(){
    modalConfiguracoes()
})

btn_icon_config.addEventListener("click", function(){
    modalConfiguracoes()
})

btn_close_config.addEventListener("click", function(){
    modalConfiguracoes()
})



/* animação, cor e texto da caixa modal de alerta*/
export default async function callModal(texto, cor, screen_time){
    $('.modal_alert_txt').text(texto)
    $('.modal_alert_txt').css({"backgroundColor": cor})

    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    document.querySelector('.modal_alert_backdrop').style.display = "block"
    $('.modal_alert').animate(
        {top: "3%"}, {duration: 500}
    ).animate(
        {top: "3%"},{duration: screen_time}
    ).animate(
        {top: "-50%"}, {duration: 500}
    )
    
    await sleep(screen_time)
    document.querySelector('.modal_alert_backdrop').style.display = "none"
}



/* ocultando/mostrando a text area de palavras customizadas dentro do modal config */
let caixa_radio = document.querySelector(".box-radio-input")
$(".box-textarea").hide();

/* qual botão radio esta selecionado */
let radio_selecionado = ""

caixa_radio.addEventListener("change", function(){
    radio_selecionado = document.querySelector('input[name="lista_palavra"]:checked').value

    if(radio_selecionado == "default"){
        $(document).ready(function(){
            $(".box-textarea").hide();
        })
    } else {
        $(document).ready(function(){
            $(".box-textarea").show();
        })
    }
})

/* função do botão de salvar */
let btn_salvar_config = document.querySelector('#btn-salvar')

btn_salvar_config.addEventListener('click', function() {
    salvarConfiguracao();
})

let form_altura = document.querySelector('#altura')
let form_comprimento = document.querySelector('#comprimento')
let form_qnt_palavras = document.querySelector('#quant_palavras')
let desc_quadro = document.querySelector('.desc_quadro')

function salvarConfiguracao(){
    // confere se o usuário escolheu no minimo 5 palavras
    if(parseInt(form_qnt_palavras.value) < 5){
        callModal("A quantidade mínima de palavras é 5","#ff7676",3000)
        return;
    }

    // limpando o vetor de palavras customizadas, se não o usuario insere os valores varias vezes apertando o botão mais de uma vez
    exp.palavras_custom.length = 0

    // montando e enviando um vetor com as palavras que o usuario inseriu, caso ele escolha essa opção
    // confere se tem alguma letra na textarea. Também vai server pra saber se o usuário selecionou a opção de lista customizada
    if(radio_selecionado == "custom"){        
        let campo_texto = document.querySelector("#textarea_palavras")
        
        // com o replace, removemos os espaços da string inserida no textarea
        let texto_custom = campo_texto.value
        texto_custom = texto_custom.replace(/\s+/g, '')

        // depois, separamos a string onde tem virgula, criando as palavras, além disso, também colocamos as palavras em letra maiuscula
        let custom_temp = ""
        custom_temp = texto_custom.split(',')
        custom_temp = custom_temp.map(element => element.toUpperCase())

        // porem, o usuário pode tentar inserir 10 palavras e só informar 1. Portanto retornamos a função
        if(custom_temp.length < form_qnt_palavras.value){
            callModal("Escreva no minimo "+form_qnt_palavras.value+" palavras","#ff7676",3000)
            return;
        }

        // caso contrario, vamos jogar as palavras no vetor
        for(let a = 0; a < custom_temp.length; a++){
            exp.palavras_custom.push(custom_temp[a])
        }

        
    } else {
        // confere se a quantidade de palavras selecionada pelo usuario não ultrapassa o tamanho do vetor de palavras padrão (animais)
        if(parseInt(form_qnt_palavras.value) > exp.animais.length){
            callModal("A quantidade máxima de palavras é "+exp.animais.length, "#ff7676",3000)
            return;
        }
    }
    
    // muda os valores das variaveis altura, comprimento, quantidade de palavras e tipo de lista no arquivo "gerar_quadro.js"
    exp.setAltura(parseInt(form_altura.value))
    exp.setComrpimento(parseInt(form_comprimento.value))
    exp.setQntPalavras(parseInt(form_qnt_palavras.value))

    
    let form_lista_palavras = document.querySelector('input[name="lista_palavra"]:checked').value
    exp.setTipoLista(form_lista_palavras)

    
    callModal("Configuração Salva","lightgreen",2000)

    // atualiza o texto do botão de configurações
    desc_quadro.innerHTML = "Quadro "+parseInt(form_altura.value)+"x"+parseInt(form_comprimento.value)+", "+parseInt(form_qnt_palavras.value)+" palavras, lista: "+form_lista_palavras
}
