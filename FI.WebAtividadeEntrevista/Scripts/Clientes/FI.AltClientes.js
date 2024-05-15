
$(document).ready(function () {
    $('#CPF').inputmask('999.999.999-99');
    $('#BeneficiarioCPF').inputmask('999.999.999-99');

    if (obj) {
        obj.Beneficiarios.forEach(apresentaBenefsDoCliente);
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }
    
    $('#formCadastro').submit(function (e) {

        var TableData = new Array();

        $('#table tr').each(function (row, tr) {
            TableData[row] = {
                "CPF": $(tr).find('td:eq(0)').text().replaceAll(".", "").replace("-", ""),
                "Nome": $(tr).find('td:eq(1)').text()
            }
        });
        TableData.shift();

        e.preventDefault();
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val().replaceAll(".", "").replace("-", ""),
                "Beneficiarios":TableData
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    //Ação de apertar no botão com id beneficiario-remove e remoção dos elementos que estão abaixo da tag tr
    $('#table').on('click', '.beneficiario-remove', function () {
        $(this).parents('tr').detach();
    });
    //Ação de apertar no botão com id beneficiario-edit, colocando os valores nos inputs e remoção dos elementos que estão abaixo da tag tr
    $('#table').on('click', '.beneficiario-edit', function () {
        $('#BeneficiarioCPF').val($(this).parents('tr').find('.CPFBenefAdicionado').text());
        $('#BeneficiarioNome').val($(this).parents('tr').find('.NOMEBenefAdicionado').text());
        $(this).parents('tr').detach();
    });
    //Inclui beneficiario em forma de linha na table
    $('#incluirBenefCliente').on('click', function (e) {
        $('#tableBeneficiarios')
            .append("<tr><td class='CPFBenefAdicionado'>" +
            $('#BeneficiarioCPF').val().inputmask('999.999.999-99') + "</td><td class='NOMEBenefAdicionado'>" +
                $('#BeneficiarioNome').val() + "</td><td><span class='beneficiario-edit'><button type='button' class='btn btn-warning'>Editar</button></span>     <span class='beneficiario-remove'><button type='button' class='btn btn-danger'>Excluir</button></span></td></tr>");

    });
})

//Função que adiciona os beneficiarios em forma de linha na table, quando são recebidos pelo retorno dos dados do cliente
function apresentaBenefsDoCliente(item) {
    $('#tableBeneficiarios')
        .append("<tr><td class='CPFBenefAdicionado'>" +
        item.CPF + "</td><td class='NOMEBenefAdicionado'>" +
        item.Nome + "</td><td><span class='beneficiario-edit'><button type='button' class='btn btn-warning'>Editar</button></span>     <span class='beneficiario-remove'><button type='button' class='btn btn-danger'>Excluir</button></span></td></tr>");
}
function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
