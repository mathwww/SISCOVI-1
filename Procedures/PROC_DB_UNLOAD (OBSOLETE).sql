create or replace procedure "PROC_DB_UNLOAD"
IS

BEGIN

  DELETE FROM tb_total_mensal_a_reter;

  DELETE FROM tb_restituicao_ferias;

  DELETE FROM tb_restituicao_decimo_terceiro;

  DELETE FROM tb_restituicao_rescisao;

  DELETE FROM tb_cargo_funcionario;

  DELETE FROM tb_convencao_coletiva;

  DELETE FROM tb_funcionario;

  DELETE FROM tb_cargo_contrato;

  DELETE FROM tb_percentual_contrato;

  DELETE FROM tb_rubricas;
  
  DELETE FROM tb_vigencia_contrato;

  DELETE FROM tb_contrato;

  DELETE FROM tb_usuario;

  DELETE FROM tb_perfil;
  
  DELETE FROM tb_cargo;  

END;