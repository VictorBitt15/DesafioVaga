﻿CREATE PROC FI_SP_ConsBeneficiario
	@IDCLIENTE	BIGINT = NULL
AS
BEGIN
	
	SELECT NOME, CPF, IDCLIENTE FROM BENEFICIARIOS WITH(NOLOCK) WHERE IDCLIENTE = @IDCLIENTE

END