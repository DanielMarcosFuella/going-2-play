const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "g2p"
});

//FUNCIONAMIENTO

connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Conectado correctamente");
    }
});

app.get("/", function (req, res) {
    console.log("Servidor ONLINE");
    res.send("Hola!!!")
})


// Login

app.post("/usuarios/login", function (req, response) {
    let sql =
      "SELECT * FROM usuarios WHERE (usuarios.nickname = ? AND usuarios.contrasena = ?)";
    connection.query(sql, [req.body.nickname, req.body.contrasena], function (err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
      }
    });
  });


// ENPOINTS USUARIOS//

app.get("/usuarios/:id", function (req, res) {
    id = req.params.id
    let sql = "SELECT * FROM usuarios WHERE usuario_id=" + id;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }

        res.send(result)
    })
})

app.get("/usuarios", function (req, res) {
    id = req.params.id
    let sql1 = "SELECT * FROM usuarios";
    connection.query(sql1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result)
    })
})

app.post("/usuarios", function (req, res) {
    if (!req.body) {
        console.log("error");

    } else {
        let sql2 = `INSERT INTO usuarios (usuario_id, nickname, nombre, apellido, url_perfil, nacimiento, correo, nacionalidad, contrasena, biografia, admin) VALUES(null, \"${req.body.nickname}\", \"${req.body.nombre}\", \"${req.body.apellido}\",\"${req.body.url_perfil}\",\"${req.body.nacimiento}\",\"${req.body.correo}\",\"${req.body.nacionalidad}\",\"${req.body.contrasena}\",\"${req.body.biografia}\",\"${req.body.admin}\")`
        connection.query(sql2, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            res.send(result)
        })
    }
})

app.put("/usuarios", function (req, response) {
    let usuario_id = req.body.usuario_id;
    let nickname = req.body.nickname;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let url_perfil = req.body.url_perfil;
    let nacimiento = req.body.nacimiento;
    let correo = req.body.correo;
    let nacionalidad = req.body.nacionalidad;
    let contrasena = req.body.contrasena;
    let biografia = req.body.biografia;
    let admin = req.body.admin;
    let sql = "UPDATE usuarios SET"
    let params = new Array()
    let modi = new Array()
    console.log(req.body)
    if (nickname) {
        params.push(nickname)
        modi.push(" nickname = ? ")

    }
    if (nombre) {
        params.push(nombre)
        modi.push(" nombre = ? ")

    }
    if (apellido) {
        params.push(apellido)
        modi.push(" apellido = ? ")
    }
    if (url_perfil) {
        params.push(url_perfil)
        modi.push(" url_perfil = ? ")
    }
    if (nacimiento) {
        params.push(nacimiento)
        modi.push(" nacimiento = ? ")
    }
    if (correo) {
        params.push(correo)
        modi.push(" correo = ? ")
    }
    if (nacionalidad) {
        params.push(nacionalidad)
        modi.push(" nacionalidad = ? ")
    }
    if (contrasena) {
        params.push(contrasena)
        modi.push(" contrasena = ? ")
    }
    if (biografia) {
        params.push(biografia)
        modi.push(" biografia = ? ")
    }
    if (admin) {
        params.push(admin)
        modi.push(" admin = ? ")
    }

    sql += modi.toString() + "WHERE usuario_id = " + usuario_id;
    console.log(sql);
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Datos de usuarios actualizados");
        }
        response.send(result);
    });
});      

app.delete("/usuarios", function (req, res) {
    let sql4 = `DELETE FROM usuarios WHERE usuario_id=${req.body.usuario_id}`
    connection.query(sql4, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result);
    })
})

// ENDOINT JUEGOS //

app.get("/juegos/:id", function (req, res) {
    id = req.params.id
    let sql = "SELECT * FROM juegos WHERE juego_id=" + id;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }

        res.send(result)
    })
})

app.get("/juegos", function (req, res) {
    id = req.params.id
    let sql1 = "SELECT * FROM juegos";
    connection.query(sql1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result)
    })
})

app.post("/juegos", function (req, res) {
    if (!req.body) {
        console.log("error");

    } else {
        let sql2 = `INSERT INTO juegos (juego_id, nombre, foto) VALUES(null, \"${req.body.nombre}\", \"${req.body.foto}\")`
        connection.query(sql2, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            res.send(result)
        })
    }
})

app.put("/juegos", function (req, response) {
    let juego_id = req.body.juego_id;
    let nombre = req.body.nombre;
    let foto = req.body.foto;
    
    let sql = "UPDATE juegos SET"
    let params = new Array()
    let modi = new Array()
    console.log(req.body)
    
    if (nombre) {
        params.push(nombre)
        modi.push(" nombre = ? ")

    }
    if (foto) {
        params.push(foto)
        modi.push(" foto = ? ")
    }
    

    sql += modi.toString() + "WHERE juego_id = " + juego_id;
    console.log(sql);
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Datos de juegos actualizados");
        }
        response.send(result);
    });
});      

app.delete("/juegos", function (req, res) {
    let sql4 = `DELETE FROM juegos WHERE juego_id=${req.body.juego_id}`
    connection.query(sql4, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result);
    })
})

// ENDPOINT CHAT //

app.get("/chat/:id", function (req, res) {
    id = req.params.id
    let sql = "SELECT * FROM chat WHERE chat_id=" + id;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }

        res.send(result)
    })
})

app.get("/chat", function (req, res) {
    id = req.params.id
    let sql1 = "SELECT * FROM chat";
    connection.query(sql1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result)
    })
})

app.post("/chat", function (req, res) {
    if (!req.body) {
        console.log("error");

    } else {
        let sql2 = `INSERT INTO chat (chat_id, partido_id, capitan_first, capitan_second) VALUES(null, ${req.body.partido_id}, ${req.body.capitan_first}, ${req.body.capitan_second})`
        connection.query(sql2, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            res.send(result)
        })
    }
})

app.put("/chat_id", function (req, response) {
    let chat_id = req.body.chat_id;
    let partido_id = req.body.partido_id;
    let capitan_first = req.capitan_first;
    let capitan_second = req.capitan_second;
    
    let sql = "UPDATE chat_id SET"
    let params = new Array()
    let modi = new Array()
    console.log(req.body)
    
    if (partido_id) {
        params.push(partido_id)
        modi.push(" partido_id = ? ")

    }
    if (capitan_first) {
        params.push(capitan_first)
        modi.push(" capitan_first = ? ")
    }
    
    if (capitan_second) {
        params.push(capitan_second)
        modi.push(" capitan_second = ? ")
    }
    

    sql += modi.toString() + "WHERE chat_id = " + chat_id;
    console.log(sql);
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Datos de chat actualizados");
        }
        response.send(result);
    });
});      

app.delete("/chat", function (req, res) {
    let sql4 = `DELETE FROM chat WHERE chat_id=${req.body.chat_id}`
    connection.query(sql4, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result);
    })
})

// ENDPOINT MENSAJES //

app.get("/mensajes/:id", function (req, res) {
    id = req.params.id
    let sql = "SELECT * FROM mensajes WHERE mensaje_id=" + id;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }

        res.send(result)
    })
})

app.get("/mensajes", function (req, res) {
    id = req.params.id
    let sql1 = "SELECT * FROM mensajes";
    connection.query(sql1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result)
    })
})

app.post("/mensajes", function (req, res) {
    if (!req.body) {
        console.log("error");

    } else {
        let sql2 = `INSERT INTO chat (mensaje_id, chat_id, usuario_id, mensaje) VALUES(null, ${req.body.chat_id}, ${req.body.usuario_id}, \"${req.body.mensaje}\")`
        connection.query(sql2, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            res.send(result)
        })
    }
})

app.put("/mensajes", function (req, response) {
    let mensaje_id = req.body.mensaje_id;
    let chat_id = req.body.chat_id;
    let usuario_id = req.usuario_id;
    let mensaje = req.mensaje;
    
    let sql = "UPDATE mensaje_id SET"
    let params = new Array()
    let modi = new Array()
    console.log(req.body)
    
    if (chat_id) {
        params.push(chat_id)
        modi.push(" chat_id = ? ")

    }
    if (usuario_id) {
        params.push(usuario_id)
        modi.push(" usuario_id = ? ")
    }
    
    if (mensaje) {
        params.push(mensaje)
        modi.push(" mensaje = ? ")
    }
    

    sql += modi.toString() + "WHERE mensaje_id = " + mensaje_id;
    console.log(sql);
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Datos de mensaje actualizados");
        }
        response.send(result);
    });
});      

app.delete("/mensajes", function (req, res) {
    let sql4 = `DELETE FROM mensajes WHERE mensaje_id=${req.body.mensaje_id}`
    connection.query(sql4, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result);
    })
})

// ENDPOINT REGLAS //

app.get("/reglas/:id", function (req, res) {
    id = req.params.id
    let sql = "SELECT * FROM reglas WHERE reglas_id=" + id;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }

        res.send(result)
    })
})

app.get("/reglas", function (req, res) {
    id = req.params.id
    let sql1 = "SELECT * FROM reglas";
    connection.query(sql1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result)
    })
})

app.post("/reglas", function (req, res) {
    if (!req.body) {
        console.log("error");

    } else {
        let sql2 = `INSERT INTO chat (reglas_id, juego_id, descripcion) VALUES(null, ${req.body.juego_id}, \"${req.body.descripcion}\")`
        connection.query(sql2, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            res.send(result)
        })
    }
})

app.put("/reglas", function (req, response) {
    let reglas_id = req.body.reglas_id;
    let juego_id  = req.body.juego_id ;
    let descripcion = req.descripcion;
    
    let sql = "UPDATE reglas_id SET"
    let params = new Array()
    let modi = new Array()
    console.log(req.body)
    
    if (juego_id) {
        params.push(juego_id)
        modi.push(" juego_id = ? ")

    }
    if (descripcion) {
        params.push(descripcion)
        modi.push(" descripcion = ? ")
    }
    
  
    

    sql += modi.toString() + "WHERE reglas_id = " + reglas_id;
    console.log(sql);
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Datos de reglas actualizados");
        }
        response.send(result);
    });
});      

app.delete("/reglas", function (req, res) {
    let sql4 = `DELETE FROM reglas WHERE reglas_id=${req.body.reglas_id}`
    connection.query(sql4, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result);
    })
})

// ENDPOINT PARTIDOS //

app.get("/partidos/:id", function (req, res) {
    id = req.params.id
    let sql = "SELECT * FROM partidos WHERE partido_id=" + id;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }

        res.send(result)
    })
})

app.get("/partidos", function (req, res) {
    id = req.params.id
    let sql1 = "SELECT * FROM partidos";
    connection.query(sql1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result)
    })
})

app.post("/partidos", function (req, res) {
    if (!req.body) {
        console.log("error");

    } else {
        let sql2 = `INSERT INTO partidos (partido_id, torneo_id, equipo_first, equipo_second, resultado_first, resultado_second) VALUES(null, ${req.body.torneo_id}, ${req.body.equipo_first}, ${req.body.equipo_second}, ${req.body.resultado_first}, ${req.body.resultado_second})`
        connection.query(sql2, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            res.send(result)
        })
    }
})

app.put("/partidos", function (req, response) {
    let partido_id = req.body.partido_id;
    let torneo_id  = req.body.torneo_id ;
    let equipo_first = req.equipo_first;
    let equipo_second = req.equipo_second;
    let resultado_first = req.resultado_first;
    let resultado_second = req.resultado_second;
    
    let sql = "UPDATE reglas_id SET"
    let params = new Array()
    let modi = new Array()
    console.log(req.body)
    
    if (torneo_id) {
        params.push(torneo_id)
        modi.push(" torneo_id = ? ")

    }
    if (equipo_first) {
        params.push(equipo_first)
        modi.push(" equipo_first = ? ")
    }
    if (equipo_second) {
        params.push(equipo_second)
        modi.push(" equipo_second = ? ")
    }
    if (resultado_first) {
        params.push(resultado_first)
        modi.push(" resultado_first = ? ")
    }
    if (resultado_second) {
        params.push(resultado_second)
        modi.push(" resultado_second = ? ")
    }
    
  
    

    sql += modi.toString() + "WHERE partido_id= " + partido_id;
    console.log(sql);
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Datos de PARTIDOS actualizados");
        }
        response.send(result);
    });
});      

app.delete("/partidos", function (req, res) {
    let sql4 = `DELETE FROM partidos WHERE partido_id=${req.body.partido_id}`
    connection.query(sql4, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.send(result);
    })
})

app.listen(8000)