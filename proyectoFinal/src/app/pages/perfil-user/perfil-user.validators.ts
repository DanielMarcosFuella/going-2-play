 public onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]	
    this.ng2ImgMax.compressImage(this.selectedFile, environment.maxFileSize).subscribe(
      result => {
        this.selectedFile = new File([result], result.name);
        if(environment.log.DEBUG){
          console.log(this.selectedFile.size)
        }
      }, (error) => {
        if(environment.log.DEBUG){
          console.log('😢 Oh no!', error);
        }
      }
    );
    // recuperamos la extensión del archivo
    let fileName = this.selectedFile.name;
    let ext = fileName.split('.').pop();
		// Convertimos en minúscula porque la extensión del archivo puede estar en mayúscula
    ext = ext.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png': break;
      default:
      this.toastr.error('El archivo no tiene la extensión adecuada', "Algo fue mal");
      fileName = '';
    }
  }


  public modificarUsuario(idUsuario:number, name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    if (idUsuario === null || name === null || password === null || email === null || comunidad === null || provincia === null || localidad === null || cp === null ||
      name === "" || password === "" || email === "" || comunidad === "" || provincia === "" || localidad === "" || cp === 0) {
      this.toastr.error("Por favor, completa todos los campos", "Algo fue mal")
      return
    }
    if(environment.log.INFO){
      console.log('Usuario Modificado')
    }
    let userImageUrl;
    let oldImage;
    if(this.selectedFile === null) {
      userImageUrl = this.usuarioActual.user_image;
    } else {
      oldImage = this.usuarioActual.user_image;
      oldImage = oldImage.replace(this.usuarioService.urlImg, "");
      if(environment.log.DEBUG){
        console.log(oldImage);
      }
      userImageUrl = this.usuarioService.urlImg + this.token() + "-" + idUsuario + ".jpg";
    }
    let userUpdated = new Usuario(idUsuario, name, password, email, comunidad, provincia, localidad, cp, userImageUrl);  
    if(this.selectedFile === null) {
      this.usuarioService.putUsuario(userUpdated).subscribe((data)=>{
        if(environment.log.DEBUG){
          console.log(data);
        }
        this.loginService.getUsuario(idUsuario).subscribe(data => {
          if(environment.log.DEBUG){
            console.log(data);
          }
          this.loginService.usuarioActual = data[0];
          this.usuarioActual = data[0];
          if(environment.log.DEBUG){
            console.log(this.usuarioActual);
          }
          this.toastr.success("Tus datos se han actualizado", "Usuario modificado con éxito")
          this.router.navigate(["/usuario"]);
        })
      }, (error) => {
        if(environment.log.ERROR){
          console.log(error);
        }
        if (error.status === 401) {
          this.loginService.forcedLogout();
        }
      })
    } else {
      const fd = new FormData()
      const nombreFoto = userImageUrl
      fd.append('user_image',this.selectedFile, nombreFoto);
      this.usuarioService.deleteImage(oldImage).subscribe((data)=>{
        console.log(data)
      })
      this.usuarioService.uploadImage(fd).subscribe((data)=>{
        if(environment.log.DEBUG){
          console.log(data);
        }
        this.usuarioService.putUsuario(userUpdated).subscribe((data)=>{
          if(environment.log.DEBUG){
            console.log(data);
          }
          this.loginService.getUsuario(idUsuario).subscribe(data => {
            if(environment.log.DEBUG){
              console.log(data);
            }
            this.loginService.usuarioActual = data[0];
            this.usuarioActual = data[0];
            if(environment.log.DEBUG){
              console.log(this.usuarioActual);
            }
            this.toastr.success("Tus datos se han actualizado", "Usuario modificado con éxito")
            this.router.navigate(["/usuario"]);
            this.selectedFile = null;
          })
        }, (error) => {
          if(environment.log.ERROR){
            console.log(error);
          }
          if (error.status === 401) {
            this.loginService.forcedLogout();
          }
        })
      })
    }
  }