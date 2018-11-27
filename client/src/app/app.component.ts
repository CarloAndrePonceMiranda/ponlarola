import { Component, OnInit    } from '@angular/core';
import { User } from './models/usuario';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService],
})
export class AppComponent implements OnInit{
  public title = '¡Pon La Rola!';
  public user : User;
  public user_register : User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;

  constructor(
    private _userService: UserService,
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmit(){
    // Consiguen Datos del Usuario
    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){
          alert("No se inició sesión correctamente ❌");
        }else{
          //Crear elemento en el LocalStorage
          localStorage.setItem('identity', JSON.stringify(identity));

          //Conseguir el token para cada petición
          this._userService.signUp(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if(this.token.length <= 0){
                alert("El token no se Generó ❌");
              }else{
                //Crear elemento token en el LocalStorage
                localStorage.setItem('token', token);
                this.user = new User('','','','','','ROLE_USER','');
              }
            },
            error => {
              var errorMessage = <any>error;
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.mensaje;

              }
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.mensaje;
        }
      }
    );
  }


  onSubmitRegister(){
    this._userService.register(this.user_register).subscribe(
      res => {
        let user = res.user;
        this.user_register = user;
        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'Registro exitoso, Inicia con '+this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','');
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.mensaje;
        }
      }
    );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }
}
