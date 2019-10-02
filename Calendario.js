var meses;

var mesAlvo;
var anoAlvo = new Date().getFullYear();

$(function () {
    var hoje = new Date();
    var mesHoje = hoje.getMonth(); //pega o mês de hoje
    var anoHoje = hoje.getFullYear(); //pega o ano de hoje
    mesAlvo = mesHoje;

    carregaMes(mesHoje);
})

function controlaMes(proximoMes) {
    if (proximoMes)
        mesAlvo++;
    else
        mesAlvo--;

    carregaMes(mesAlvo);
}

function carregaMes(mes) {
    var qtDiasSemana = 7;
    var semana = 1;

    var hoje = new Date();
    var diaHoje = hoje.getDate(); //pega o dia de hoje
    var mesHoje = hoje.getMonth(); //Pega o mês de hoje
    var anoHoje = hoje.getFullYear(); //Pega o ano de hoje

    if ((anoAlvo % 4 == 0 && anoAlvo % 100 != 0) || anoAlvo % 400 == 0) { //Verifica se o ano é bissexto
        meses = [
            { contagem: 1, mes: "Janeiro", dias: 31 },
            { contagem: 2, mes: "Fevereiro", dias: 29 },
            { contagem: 3, mes: "Março", dias: 31 },
            { contagem: 4, mes: "Abril", dias: 30 },
            { contagem: 5, mes: "Maio", dias: 31 },
            { contagem: 6, mes: "Junho", dias: 30 },
            { contagem: 7, mes: "Julho", dias: 31 },
            { contagem: 8, mes: "Agosto", dias: 31 },
            { contagem: 9, mes: "Setembro", dias: 30 },
            { contagem: 10, mes: "Outubro", dias: 31 },
            { contagem: 11, mes: "Novembro", dias: 30 },
            { contagem: 12, mes: "Dezembro", dias: 31 }
        ];
    } else {
        meses = [
            { contagem: 1, mes: "Janeiro", dias: 31 },
            { contagem: 2, mes: "Fevereiro", dias: 28 },
            { contagem: 3, mes: "Março", dias: 31 },
            { contagem: 4, mes: "Abril", dias: 30 },
            { contagem: 5, mes: "Maio", dias: 31 },
            { contagem: 6, mes: "Junho", dias: 30 },
            { contagem: 7, mes: "Julho", dias: 31 },
            { contagem: 8, mes: "Agosto", dias: 31 },
            { contagem: 9, mes: "Setembro", dias: 30 },
            { contagem: 10, mes: "Outubro", dias: 31 },
            { contagem: 11, mes: "Novembro", dias: 30 },
            { contagem: 12, mes: "Dezembro", dias: 31 }
        ];
    }

    $("#calendarioMes").empty();
    $("#calendarioBody").empty();

    if (mes == 12) {
        mes = 0;
        anoAlvo++;
    } else if (mes < 0) {
        mes = 11;
        anoAlvo--;
    }

    var inicioMes = new Date(anoAlvo, mes, 1); // Primeiro dia do mês
    var diaSemanaInicioMes = inicioMes.getDay(); // Dia da semana que começa o mês
    var diaComecoMes = inicioMes.getDate();

    $("#calendarioMes").append(meses[mes].mes + " de " + anoAlvo);
    $("#calendarioBody").append("<tr id='semana1'></tr>");

    if (mes == 0) {
        var contDia = meses[mes].dias - diaSemanaInicioMes;
    } else {
        var contDia = meses[mes - 1].dias - (diaSemanaInicioMes-1);
    }

    for (var contDiaSemana = 0; contDiaSemana < diaSemanaInicioMes; contDiaSemana++) { // Preenche as datas do mês antecessor, nos slots vazios do mês(calendário)
        $("#semana1").append("<td class='opacidade-dia'><div>" + contDia + "<a>Adicionar</a></div><div></div></td>");
        contDia++;
    }

    for (contDia = diaComecoMes; contDia <= meses[mes].dias; contDia++) { // Preenche o calendário com as datas
        if (diaSemanaInicioMes == qtDiasSemana) {
            semana++;
            $("#calendarioBody").append("<tr id='semana" + semana + "'></tr>");
            diaSemanaInicioMes = 0;
        } 

        if (diaHoje == contDia && mesHoje == mes && anoHoje == anoAlvo) {
            $("#semana" + semana).append("<td class='marcado'><div>" + contDia + "<a>Adicionar</a></div><div></div></td>");
        } else {
            $("#semana" + semana).append("<td><div>" + contDia + "<a>Adicionar</a></div><div></div></td>");
        }

        diaSemanaInicioMes++;
    }

    if (diaSemanaInicioMes <= qtDiasSemana) { // Preenche as datas do mês sucessor, nos slots vazios do mês(calendário)
        contDia = 1;
        for (var contDiaSemana = diaSemanaInicioMes; contDiaSemana < qtDiasSemana; contDiaSemana++) {
            $("#semana" + semana).append("<td class='opacidade-dia'><div>" + contDia + "<a>Adicionar</a></div><div></div></td>");
            contDia++;
        }
    }

    mesAlvo = mes;
}