<?php

class Orcamento{
    private $total, $quantiaMes, $quantiaSemana;
    public function __construct(){
        $this->total = 0;
        $this->quantiaMes = array();
        $this->quantiaSemana = array();
    }
    
    /*
        Essa função atualiza as variaveis $this->total, $this->quantiaMes, $this->quantiaSemana
        variaveis locais da funcao:
        $saldoAtual deve conter um float informando quanto o usuario tem atualmente
        $saldoSemanal deve conter um float informando o saldo semanal fixo (o valor pode ser negativo)
        $quantidadeSemanas deve conter um inteiro infromando a quantidade de semanas que o orçamento deve calcular
        $saldoSemanasExatas (opcional) deve conter um array onde a chave é a semana e o valor o despesa, exemplo: array(3 => 200, 7 => -1000)
    */
public function orcamentoSemanal($saldoAtual, $saldoSemanal, $quantidadeSemanas, $saldoSemanasExatas = null){
        $this->total = $this->total + $saldoAtual;
        for($semanaAtual = 1; $semanaAtual <= $quantidadeSemanas; $semanaAtual++){
            $saldoSemanaAtual;
            // Adiciona o lucro da semana atual a variável lucro, e se não tiver o indice o lucro é igual a 0
            if ($saldoSemanasExatas == null || !array_key_exists($semanaAtual, $saldoSemanasExatas)){
                $saldoSemanaAtual = 0;
            }
            else{
                $saldoSemanaAtual = $saldoSemanasExatas[$semanaAtual];
            }
            
            // Atualiza o valor total, o saldo das semanas e o saldo dos meses
            $this->total = $this->total + $saldoSemanal + $saldoSemanaAtual;
            $this->quantiaSemana[] = array($semanaAtual => $this->total);
            if($semanaAtual % 4 == 0){
                $this->quantiaMes[] = array($semanaAtual / 4 => $this->total);
            }
        }
    }
    
    // Retorna o total
    public function retornaTotal(){
        return $this->total;
    }
    
    // retorna um json da quantia de cada emana
    public function retornaQuantiaSemana(){
        return json_encode(array("resp" => $this->quantiaSemana));
    }
    
    // retorna um json da quantia de cada mes
    public function retornaQuantiaMes(){
        return json_encode(array("resp" => $this->quantiaMes));
    }
    
}


// Se o método for get retorna o orcamento pedido, o request deve especificar o método a ser utilizado
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $orcamento = new Orcamento();
    $resp = $_GET['funcao'];
    $saldoSemanasExatas = json_decode($_GET['saldoSemanasExatas'], true)[0];
    $orcamento->$resp($_GET['saldoAtual'], $_GET['saldoSemanal'], $_GET['quantidadeSemanas'], $saldoSemanasExatas);
    echo $orcamento->$_GET['retorno']();
}





