
$(document).ready(function () {

    $('#CPF').inputmask('999.999.999-99');
    $('#BeneficiarioCPF').inputmask('999.999.999-99');
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
            }
        });
    })
    
})


$('#table').on('click', '.beneficiario-remove', function () {
    $(this).parents('tr').detach();
});

$('#table').on('click', '.beneficiario-edit', function () {
    $('#BeneficiarioCPF').val($(this).parents('tr').find('.CPFBenefAdicionado').text());
    $('#BeneficiarioNome').val($(this).parents('tr').find('.NOMEBenefAdicionado').text());
    $(this).parents('tr').detach();
});
$('#incluirBenefCliente').on('click', function (e) {
    $('#tableBeneficiarios')
        .append("<tr><td class='CPFBenefAdicionado'>" +
        $('#BeneficiarioCPF').val().inputmask('999.999.999-99') + "</td><td class='NOMEBenefAdicionado'>" +
            $('#BeneficiarioNome').val() + "</td><td><span class='beneficiario-edit'><button type='button' class='btn btn-warning'>Editar</button></span>     <span class='beneficiario-remove'><button type='button' class='btn btn-danger'>Excluir</button></span></td></tr>");

});
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
