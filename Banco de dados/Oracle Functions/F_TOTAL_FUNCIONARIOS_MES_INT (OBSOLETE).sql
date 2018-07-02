create or replace function "F_TOTAL_FUNCIONARIOS_MES_INT"(pCodCargoContrato NUMBER, pMes NUMBER, pAno NUMBER) RETURN NUMBER
IS

  vTotalFuncionarios NUMBER;
  vAux NUMBER;

BEGIN

  vAux := 0;
  vTotalFuncionarios := 0;

--Caso em que o cálculo está sendo feito dentro do mês em que o funcionário começou a prestar serviço para o Tribunal
--e a data de desligamento é nula ou maior que o mês de cálculo.

  SELECT COUNT(DISTINCT(cod))
    INTO vAux
    FROM tb_cargo_funcionario
    WHERE cod_cargo_contrato = pCodCargoContrato
      AND TRUNC(data_disponibilizacao) >= TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))
      AND TRUNC(data_disponibilizacao) <= LAST_DAY(TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno))))
      AND (data_desligamento IS NULL OR TRUNC(data_desligamento) >= LAST_DAY(TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))))
      AND LAST_DAY(TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))) - TRUNC(data_disponibilizacao) >= 15;

  vTotalFuncionarios := vTotalFuncionarios + vAux;
  vAux := 0;

--Caso geral, onde a data de disponibilização é inferior ao mês do cálculo e o desligamento é nulo ou superior.

  SELECT COUNT(DISTINCT(cod))
    INTO vAux
    FROM tb_cargo_funcionario
    WHERE cod_cargo_contrato = pCodCargoContrato
      AND TRUNC(data_disponibilizacao) <= TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))
      AND (data_desligamento IS NULL OR TRUNC(data_desligamento) >= LAST_DAY(TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))));
      
  vTotalFuncionarios := vTotalFuncionarios + vAux;
  vAux := 0;

--Caso com data de desligamento no mês de cálculo e data de disponibilização inferior ao mês de cálculo.

  SELECT COUNT(DISTINCT(cod))
    INTO vAux
    FROM tb_cargo_funcionario
    WHERE cod_cargo_contrato = pCodCargoContrato
      AND TRUNC(data_disponibilizacao) <= TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))
      AND data_desligamento IS NOT NULL 
      AND TRUNC(data_desligamento) <= LAST_DAY(TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno))))
      AND TRUNC(data_desligamento) >= TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))
      AND (TRUNC(data_desligamento) - TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno))) + 1) >= 15;
      
  vTotalFuncionarios := vTotalFuncionarios + vAux;
  vAux := 0;

--Caso em que o cálculo está sendo feito dentro do mês em que o funcionário começou a prestar serviço para o Tribunal
--e a data de desligamento também está no mesmo mês.

  SELECT COUNT(DISTINCT(cod))
    INTO vAux
    FROM tb_cargo_funcionario
    WHERE cod_cargo_contrato = pCodCargoContrato
      AND TRUNC(data_disponibilizacao) >= TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))
      AND TRUNC(data_disponibilizacao) <= LAST_DAY(TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))) 
      AND data_desligamento IS NOT NULL
      AND TRUNC(data_desligamento) <= LAST_DAY(TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno))))
      AND TRUNC(data_desligamento) >= TRUNC(TO_DATE('01/' || TO_CHAR(pMes) || '/' || TO_CHAR(pAno)))
      AND (TRUNC(data_desligamento) - TRUNC(data_disponibilizacao) + 1) >= 15;
      
  vTotalFuncionarios := vTotalFuncionarios + vAux;
  vAux := 0;

  RETURN vTotalFuncionarios;

  EXCEPTION WHEN NO_DATA_FOUND THEN
  
    RETURN NULL;

END;