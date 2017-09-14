$(document).ready(function(){
    var inputAtual = $('.atual');
    var nome, saldoAtual, saldoSemanal, quantidadeSemanas;
    
    // Quando clickar em próximo
    $('.proximo').click(function(){
        if($($(inputAtual).children('input')[0]).attr('name') == 'nome'){
            nome = $($(inputAtual).children('input')[0]).attr('name', 'nome').val();
            $('.anterior').removeClass('remover');
            inputAtual = getNextInput(inputAtual);
        }
        else if($($(inputAtual).children('input')[0]).attr('name') == 'saldoAtual'){
            saldoAtual = $($(inputAtual).children('input')[0]).attr('name', 'saldoAtual').val();
            inputAtual = getNextInput(inputAtual);
        }
        else if($($(inputAtual).children('input')[0]).attr('name') == 'saldoSemanal'){
            saldoAtual = $($(inputAtual).children('input')[0]).attr('name', 'saldoSemanal').val();
            inputAtual = getNextInput(inputAtual);
            $('.proximo').addClass('remover');
            $('.confirmar').removeClass('remover');
        }
        else if($($(inputAtual).children('input')[0]).attr('name') == 'quantidadeSemanas'){
            saldoAtual = $($(inputAtual).children('input')[0]).attr('name', 'quantidadeSemanas').val();
            inputAtual = getNextInput(inputAtual);
        }
    });
    
    
    // Quando clickar em anterior
    $('.anterior').click(function(){
        if($($(inputAtual).children('input')[0]).attr('name') == 'saldoAtual'){
            saldoAtual = $($(inputAtual).children('input')[0]).attr('name', 'saldoAtual').val();
            inputAtual = getPrevInput(inputAtual);
            $('.anterior').addClass('remover');
        }
        else if($($(inputAtual).children('input')[0]).attr('name') == 'saldoSemanal'){
            saldoAtual = $($(inputAtual).children('input')[0]).attr('name', 'saldoSemanal').val();
            inputAtual = getPrevInput(inputAtual);
        }
        else if($($(inputAtual).children('input')[0]).attr('name') == 'quantidadeSemanas'){
            saldoAtual = $($(inputAtual).children('input')[0]).attr('name', 'quantidadeSemanas').val();
            $('.proximo').removeClass('remover');
            $('.confirmar').addClass('remover');
            inputAtual = getPrevInput(inputAtual);
        }
    });
    
    
});

// esconde o item atual, mostra o seguinte e retorna o item seguinte
function getNextInput(element){
    $(element).addClass('esconder');
    $(element).removeClass('atual');
    $(element).next().removeClass('esconder').addClass('atual');
    return $(element).next();
}

// esconde o item atual, mostra o anterior e retorna o item anterior
function getPrevInput(element){
    $(element).addClass('esconder');
    $(element).removeClass('atual');
    $(element).prev().removeClass('esconder').addClass('atual');
    return $(element).prev();
}