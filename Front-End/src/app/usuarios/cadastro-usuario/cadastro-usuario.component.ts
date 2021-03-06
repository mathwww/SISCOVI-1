import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {ConfigService} from '../../_shared/config.service';
import {CadastroUsuarioService} from './cadastro-usuario.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {
    perfil: string[] = [];
    cadUs: CadastroUsuarioService;
    usuarioForm: FormGroup;
    nome = '';
    login = '';
    sigla = '';
    constructor(http: Http, config: ConfigService, cadUs: CadastroUsuarioService, fb: FormBuilder) {
        this.cadUs = cadUs;
        this.usuarioForm = fb.group({
            nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
            login: new FormControl('', [ Validators.required, Validators.minLength(4)]),
            sigla: new FormControl('', [Validators.required, Validators.minLength(4)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
            confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)])
        });
        const url = config.myApi + '/usuario/getPerfis/' + config.user.username;
        http.get(url).map(res => res.json()).subscribe(res => {
            this.perfil = res;
        });
    }
    verifyForm() {
        if (this.usuarioForm.status === 'VALID') {
            this.cadUs.nome = this.usuarioForm.controls.nome.value;
            this.cadUs.login = this.usuarioForm.controls.login.value;
            this.cadUs.sigla = this.usuarioForm.controls.sigla.value;
            this.cadUs.password = this.usuarioForm.controls.password.value;
           this.cadUs.setValidity(false);
        }else {
            this.cadUs.setValidity(true);
        }
    }
}
