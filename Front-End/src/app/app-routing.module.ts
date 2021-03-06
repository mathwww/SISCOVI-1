import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComumComponent} from './layout/comum/comum.component';
import {LoginComponent} from './users/login.component';
import {LoggedInGuard} from './users/logged-in.guard';
import {IndicadoresComponent} from './indicadores/indicadores.component';
import {InicioComponent} from './inicio/inicio.component';
import {RubricasComponent} from './rubricas/rubricas.component';
import {TotalMensalCalculoComponent} from './totalMensal/total-mensal-calculo/total-mensal-calculo.component';
import {ProfileGuard} from './users/profile.guard';
import {PercentuaisEstaticosComponent} from './percentuais-estaticos/percentuais-estaticos.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {CargoComponent} from './cargos/cargo.component';
import {ContratosComponent} from './contratos/contratos.component';
import {PercentuaisComponent} from './percentuais/percentuais.component';
import {CargosDoContratoComponent} from './cargos/cargos.do.contrato.component';
import {ConvencoesColetivasComponent} from './convencoes-coletivas/convencoes.coletivas.component';
import {VigenciaDosContratosComponent} from './vigencia-dos-contratos/vigencia.dos.contratos.component';
import {FuncionariosComponent} from './funcionarios/funcionarios.component';
import {CargosDosFuncionariosComponent} from './cargos/cargos-dos-funcionarios/cargos.dos.funcionarios.component';
import {CadastrarRubricaComponent} from './rubricas/cadastrar-rubrica/cadastrar-rubrica.component';
import {AjusteContratoComponent} from './contratos/ajustes-contratuais/ajuste-contrato.component';
import {HistoricoGestoresComponent} from './historico/historico-gestores.component';
import {TotalMensalComponent} from './totalMensal/total-mensal.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 're' , component: IndicadoresComponent, canActivate: [LoggedInGuard],
    children: []
  },
  {path: '', component: ComumComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'indicadores', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'rubricas', component: RubricasComponent, canActivate: [LoggedInGuard, ProfileGuard]},
      {path: 'rubricas/:id', component: CadastrarRubricaComponent, canActivate: [LoggedInGuard, ProfileGuard]},
      {path: 'usuarios', component: UsuariosComponent, canActivate: [LoggedInGuard, ProfileGuard]},
      {path: 'cargos', component: CargoComponent, canActivate: [LoggedInGuard, ProfileGuard]},
      {path: 'gerenciar', component: IndicadoresComponent, canActivate: [LoggedInGuard]},
      {path: 'contratos', component: ContratosComponent, canActivate: [LoggedInGuard]},
      {path: 'percentuais', component: PercentuaisComponent, canActivate: [LoggedInGuard]},
      {path: 'cargosContrato', component: CargosDoContratoComponent, canActivate: [LoggedInGuard]},
      {path: 'convencoes', component: ConvencoesColetivasComponent, canActivate: [LoggedInGuard]},
      {path: 'terceirizados', component: FuncionariosComponent, canActivate: [LoggedInGuard]},
      {path: 'funcoes-dos-terceirizados', component: CargosDosFuncionariosComponent, canActivate: [LoggedInGuard]},
      {path: 'vigencias', component: VigenciaDosContratosComponent, canActivate: [LoggedInGuard]},
      {path: 'home', component: InicioComponent, canActivate: [LoggedInGuard]},
      {path: 'ferias', component: InicioComponent, canActivate: [LoggedInGuard]},
      {path: 'decTer', component: InicioComponent, canActivate: [LoggedInGuard]},
      {path: 'rescisao', component: InicioComponent, canActivate: [LoggedInGuard]},
      {path: 'totalMensal', component: TotalMensalComponent, canActivate: [LoggedInGuard]},
      {path: 'saldoConta', component: InicioComponent, canActivate: [LoggedInGuard]},
      {path: 'percentEst', component: PercentuaisEstaticosComponent, canActivate: [LoggedInGuard, ProfileGuard]},
      {path: 'ajustes-contratuais', component: AjusteContratoComponent, canActivate: [LoggedInGuard]},
      {path: 'historico-gestores', component: HistoricoGestoresComponent, canActivate: [LoggedInGuard]},
    ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
