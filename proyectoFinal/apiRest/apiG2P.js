const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const cors = require("cors");
const path = require("path");
const util = require("util");
const app = express();
const fs = require("fs");
const os = require("os");
const Busboy = require("busboy");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: process.env.MAX_FILESIZE * 1024 * 1024 * 1024, //max file(s) size
    },
  })
);

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "g2p_4",
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
  res.send("Hola!!!");
});

app.post("/upload", function (req, res) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.join("../src/assets/images", filename);
    console.log("Uploading: " + saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on("finish", function () {
    console.log("Upload complete");
    res.writeHead(200, { Connection: "close" });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);
});

// Login

app.post("/usuarios/login", function (req, response) {
  let sql =
    "SELECT * FROM usuarios WHERE (usuarios.nickname = ? AND usuarios.contrasena = ?)";
  connection.query(
    sql,
    [req.body.nickname, req.body.contrasena],
    function (err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
      }
    }
  );
});

// ENPOINTS USUARIOS//

app.get("/usuarios/:id", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM usuarios WHERE usuario_id=" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

// OBTENER JUGADORES POR ID DE UN EQUIPO
app.get("/jugadores/:id", function (req, res){
  id = req.params.id;
  let sql = "SELECT DISTINCT equipos.equipo_id, equipos.nombre, equipos.logo, usuarios.usuario_id, usuarios.url_perfil, usuarios.nickname FROM equipo_usuario LEFT JOIN usuarios ON (equipo_usuario.usuario_id = usuarios.usuario_id) LEFT JOIN equipos ON (equipo_usuario.equipo_id = equipos.equipo_id) WHERE equipos.equipo_id ="+id;
  connection.query(sql, function (err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
    res.send(result);
  })
})

// OBTEN EQUIPOS POR ID DE UN JUGADOR
app.get("/list-teams/:id", function (req, res){
  id = req.params.id;
  let sql = "SELECT DISTINCT equipos.equipo_id, equipos.nombre, equipos.logo, usuarios.usuario_id, usuarios.url_perfil, usuarios.nickname FROM equipo_usuario LEFT JOIN usuarios ON (equipo_usuario.usuario_id = usuarios.usuario_id) LEFT JOIN equipos ON (equipo_usuario.equipo_id = equipos.equipo_id) WHERE usuarios.usuario_id=" + id + " OR equipos.capitan="+id;
  connection.query(sql, function (err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
    res.send(result);
  })
})

app.get("/yourTeamRank/:id", function (req, res){
  id = req.params.id;
  let sql = "SELECT DISTINCT equipos.* FROM equipo_usuario LEFT JOIN equipos ON (equipo_usuario.equipo_id = equipos.equipo_id) WHERE equipos.capitan="+id;
  connection.query(sql, function (err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
    res.send(result);
  })
})

app.get("/admin-torneos", function (req, res){
  let sql = "SELECT DISTINCT torneos.torneo_id, torneos.nombre AS torneo_nombre, juegos.juego_id AS juego_nombre, juegos.nombre, torneos.fecha, torneos.hora, torneos.puntos, reglas.reglas_id, reglas.modo, torneos.estado FROM equipos_torneos LEFT JOIN torneos ON (equipos_torneos.torneo_id = torneos.torneo_id) LEFT JOIN reglas ON (torneos.reglas_id = reglas.reglas_id) LEFT JOIN juegos ON (torneos.game_id = juegos.juego_id)";
  connection.query(sql, function (err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
    res.send(result)
  })
})


app.get("/user", function (req, res) {
  console.log(req.query);
  let sql = `SELECT * FROM usuarios WHERE nickname=\"${req.query.nickname}\"`;
  connection.query(sql, function (err, result) {
    if (err) console.log(err);
    else {
      res.send(result);
    }
  });
});


app.get("/usuarios/correo/:id", function (req, res) {
  id = req.params.id;
  let sql = `SELECT * FROM usuarios WHERE correo=\"${req.params.id}\"`;
  connection.query(sql, function (err, result) {
    let resultado;
    if (err) {
      console.log(err);
    } else {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      let x = json.find((id) => id === id);
      if (x === undefined) {
        resultado = false;
        console.log(false);
      } else {
        resultado = true;
        console.log(true);
      }
    }
    res.send(result);
  });
});


app.post("/usuarios/top10/", function (req, res) {
  id = req.params.id;
  let sql = `SELECT nickname, nombre, apellido, url_perfil, puntuacion FROM usuarios WHERE isBanned= false ORDER BY usuarios.puntuacion DESC LIMIT 5`;
  connection.query(sql, function (err, result) {
    let resultado;
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});


app.post("/equipos/top5/", function (req, res) {
  id = req.params.id;
  let sql = `SELECT equipos.equipo_id, equipos.nombre, equipos.logo, juegos.juego_id AS juego_id, juegos.nombre AS juego_nombre, juegos.foto AS juego_logo, usuarios.usuario_id AS capitan_id, usuarios.nickname AS capitan_nickname, equipos.ganadas, equipos.perdidas, equipos.empatadas, equipos.jugadas, equipos.biografia, equipos.puntuacion FROM equipos JOIN juegos ON(equipos.juego_id = juegos.juego_id) JOIN usuarios ON (equipos.capitan = usuarios.usuario_id) ORDER BY equipos.puntuacion DESC LIMIT 5`;
  connection.query(sql, function (err, result) {
    let resultado;
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});


app.post("/usuarios/top1/", function (req, res) {
  id = req.params.id;
  let sql = `SELECT nickname, nombre, apellido, url_perfil, puntuacion FROM usuarios WHERE isBanned= false ORDER BY usuarios.puntuacion DESC LIMIT 1`;
  connection.query(sql, function (err, result) {
    let resultado;
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.post("/usuarios/getyourtop/", function (req, res) {
  id = req.params.id;
  let sql = `SELECT nickname, nombre, apellido, url_perfil, puntuacion FROM usuarios WHERE isBanned= false ORDER BY usuarios.puntuacion DESC`;
  connection.query(sql, function (err, result) {
    let resultado;
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.post("/equipos/top1/", function (req, res) {
  id = req.params.id;
  let sql = `SELECT nombre, logo, puntuacion FROM equipos ORDER BY equipos.puntuacion DESC LIMIT 1`;
  connection.query(sql, function (err, result) {
    let resultado;
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.get("/usuarios/nickname/:id", function (req, res) {
  id = req.params.id;
  let sql = `SELECT * FROM usuarios WHERE nickname=\"${req.params.id}\"`;
  connection.query(sql, function (err, result) {
    let resultado;
    if (err) {
      console.log(err);
    } else {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      let x = json.find((id) => id === id);
      if (x === undefined) {
        resultado = false;
        console.log(false);
      } else {
        resultado = true;
        console.log(true);
      }
    }
    res.send(result);
  });
});

app.get("/usuarios", function (req, res) {
  id = req.params.id;
  let sql1 = "SELECT * FROM usuarios";
  connection.query(sql1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.get("/admin-usuarios", function (req, res) {
  id = req.params.id;
  let sql1 = "SELECT DISTINCT usuarios.*, equipos.equipo_id, equipos.nombre AS nombre_equipo, equipos.capitan FROM usuarios LEFT JOIN equipo_usuario ON(usuarios.usuario_id = equipo_usuario.usuario_id) LEFT JOIN equipos ON (equipo_usuario.equipo_id = equipos.equipo_id)";
  connection.query(sql1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.post("/usuarios", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql2 = `INSERT INTO usuarios (usuario_id, nickname, nombre, apellido, url_perfil, nacimiento, correo, nacionalidad, contrasena, biografia, admin) VALUES(null, \"${req.body.nickname}\", \"${req.body.nombre}\", \"${req.body.apellido}\",\"${req.body.url_perfil}\",\"${req.body.nacimiento}\",\"${req.body.correo}\",\"${req.body.nacionalidad}\",\"${req.body.contrasena}\",\"${req.body.biografia}\",\"${req.body.admin}\")`;
    connection.query(sql2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

app.put("/usuarios/ban", function(req, response){
  let usuario_id = req.body.usuario_id;
  let ban = req.body.isBanned;
  let sql = "UPDATE usuarios SET";
  sql += " isBanned="+ban+" WHERE usuario_id="+usuario_id;
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Datos de usuarios actualizados");
    }
    response.send(result);
  });
  
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
  let sql = "UPDATE usuarios SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);
  if (nickname) {
    params.push(nickname);
    modi.push(" nickname = ? ");
  }
  if (nombre) {
    params.push(nombre);
    modi.push(" nombre = ? ");
  }
  if (apellido) {
    params.push(apellido);
    modi.push(" apellido = ? ");
  }
  if (url_perfil) {
    params.push(url_perfil);
    modi.push(" url_perfil = ? ");
  }
  if (nacimiento) {
    params.push(nacimiento);
    modi.push(" nacimiento = ? ");
  }
  if (correo) {
    params.push(correo);
    modi.push(" correo = ? ");
  }
  if (nacionalidad) {
    params.push(nacionalidad);
    modi.push(" nacionalidad = ? ");
  }
  if (contrasena) {
    params.push(contrasena);
    modi.push(" contrasena = ? ");
  }
  if (biografia) {
    params.push(biografia);
    modi.push(" biografia = ? ");
  }
  if (admin) {
    params.push(admin);
    modi.push(" admin = ? ");
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
  let sql4 = `DELETE FROM usuarios WHERE usuario_id=${req.body.usuario_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});

// ENDOINT JUEGOS //

app.get("/juegos/:id", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM juegos WHERE juego_id=" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.get("/juegos", function (req, res) {
  id = req.params.id;
  let sql1 = "SELECT * FROM juegos";
  connection.query(sql1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.post("/juegos", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql2 = `INSERT INTO juegos (juego_id, nombre, foto) VALUES(null, \"${req.body.nombre}\", \"${req.body.foto}\")`;
    connection.query(sql2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

app.put("/juegos", function (req, response) {
  let juego_id = req.body.juego_id;
  let nombre = req.body.nombre;
  let foto = req.body.foto;

  let sql = "UPDATE juegos SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);

  if (nombre) {
    params.push(nombre);
    modi.push(" nombre = ? ");
  }
  if (foto) {
    params.push(foto);
    modi.push(" foto = ? ");
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
  let sql4 = `DELETE FROM juegos WHERE juego_id=${req.body.juego_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});

// ENDPOINT CHAT //

app.get("/chat/:id", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM chat WHERE chat_id=" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.get("/chat", function (req, res) {
  id = req.params.id;
  let sql1 = "SELECT * FROM chat";
  connection.query(sql1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.post("/chat", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql2 = `INSERT INTO chat (chat_id, partido_id, capitan_first, capitan_second) VALUES(null, ${req.body.partido_id}, ${req.body.capitan_first}, ${req.body.capitan_second})`;
    connection.query(sql2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

app.put("/chat_id", function (req, response) {
  let chat_id = req.body.chat_id;
  let partido_id = req.body.partido_id;
  let capitan_first = req.capitan_first;
  let capitan_second = req.capitan_second;

  let sql = "UPDATE chat_id SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);

  if (partido_id) {
    params.push(partido_id);
    modi.push(" partido_id = ? ");
  }
  if (capitan_first) {
    params.push(capitan_first);
    modi.push(" capitan_first = ? ");
  }

  if (capitan_second) {
    params.push(capitan_second);
    modi.push(" capitan_second = ? ");
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
  let sql4 = `DELETE FROM chat WHERE chat_id=${req.body.chat_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});

// ENDPOINT MENSAJES //

app.get("/mensajes/:id", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM mensajes WHERE mensaje_id=" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.get("/mensajes", function (req, res) {
  id = req.params.id;
  let sql1 = "SELECT * FROM mensajes";
  connection.query(sql1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.post("/mensajes", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql2 = `INSERT INTO chat (mensaje_id, chat_id, usuario_id, mensaje) VALUES(null, ${req.body.chat_id}, ${req.body.usuario_id}, \"${req.body.mensaje}\")`;
    connection.query(sql2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

app.put("/mensajes", function (req, response) {
  let mensaje_id = req.body.mensaje_id;
  let chat_id = req.body.chat_id;
  let usuario_id = req.usuario_id;
  let mensaje = req.mensaje;

  let sql = "UPDATE mensaje_id SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);

  if (chat_id) {
    params.push(chat_id);
    modi.push(" chat_id = ? ");
  }
  if (usuario_id) {
    params.push(usuario_id);
    modi.push(" usuario_id = ? ");
  }

  if (mensaje) {
    params.push(mensaje);
    modi.push(" mensaje = ? ");
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
  let sql4 = `DELETE FROM mensajes WHERE mensaje_id=${req.body.mensaje_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});

// ENDPOINT REGLAS //

app.get("/reglas/:id", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM reglas WHERE reglas_id=" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.get("/reglas", function (req, res) {
  id = req.params.id;
  let sql1 = "SELECT * FROM reglas";
  connection.query(sql1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.post("/reglas", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql2 = `INSERT INTO reglas (reglas_id, modo, juego_id, descripcion) VALUES(null, \'${req.body.modo}\', ${req.body.juego_id}, \'${req.body.descripcion}\')`;
    connection.query(sql2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

app.put("/reglas", function (req, response) {
  let reglas_id = req.body.reglas_id;
  let modo = req.body.modo;
  let juego_id = req.body.juego_id;
  let descripcion = req.body.descripcion;
  let sql = "UPDATE reglas SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);
  if (modo) {
    params.push(modo);
    modi.push(" modo = ? ");
  }
  if (juego_id) {
    params.push(juego_id);
    modi.push(" juego_id = ? ");
  }
  if (descripcion) {
    params.push(descripcion);
    modi.push(" descripcion = ? ");
  }
  console.log(params);
  console.log(modi);
  sql += modi.toString() + "WHERE reglas_id = " + reglas_id;
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

app.delete("/reglas", function (req, res) {
  let sql4 = `DELETE FROM reglas WHERE reglas_id=${req.body.reglas_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});

// ENDPOINT EQUIPOS //

app.get("/admin-equipos", function (req, res) {
  id = req.params.id;
  let sql = "SELECT DISTINCT e.equipo_id, e.logo, e.nombre, e.juego_id, juegos.nombre AS juego_nombre, usuarios.usuario_id AS capitan_id, usuarios.nickname AS nickname_capitan, juegos.foto AS juego_foto, e.capitan, e.ganadas, e.perdidas, e.empatadas, e.jugadas, torneos.estado FROM equipo_usuario JOIN equipos AS e ON(equipo_usuario.equipo_id = e.equipo_id) JOIN usuarios ON (e.capitan = usuarios.usuario_id) JOIN juegos ON (e.juego_id = juegos.juego_id) LEFT JOIN equipos_torneos ON (equipo_usuario.equipo_id = equipos_torneos.equipo_id) LEFT JOIN torneos ON (equipos_torneos.torneo_id = torneos.torneo_id)"
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.put("/admin-equipos", function (req, response) {
  let equipo_id = req.body.equipo_id;
  let nombre = req.body.nombre;
  let juego_id = req.body.juego_id;
  let capitan = req.body.capitan;
  let ganadas = req.body.ganadas;
  let perdidas = req.body.perdidas;
  let jugadas = req.body.jugadas;
  let biografia = req.body.biografia;
  let puntuacion = req.body.puntuacion

  let sql = "UPDATE equipos SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);

  if (nombre) {
    params.push(nombre);
    modi.push(" nombre = ? ");
  }
  if (juego_id) {
    params.push(juego_id);
    modi.push(" juego_id = ? ");
  }
  if (capitan) {
    params.push(capitan);
    modi.push(" capitan = ? ");
  }
  if (ganadas) {
    params.push(ganadas);
    modi.push(" ganadas = ? ");
  }
  if (perdidas) {
    params.push(perdidas);
    modi.push(" perdidas = ? ");
  }
  if(jugadas){
    params.push(jugadas)
    modi.push(" jugadas = ? ")
  }
  if(biografia){
    params.push(biografia)
    modi.push(" biografia = ? ")
  }
  if(puntuacion){
    params.push(puntuacion)
    modi.push(" puntuacion = ? ")
  }

  sql += modi.toString() + "WHERE equipo_id= " + equipo_id;
  console.log(sql);
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Datos de EQUIPOS actualizados");
    }
    response.send(result);
  });
});

app.delete("/admin-equipos", function (req, res) {
  let sql4 = `DELETE FROM equipos WHERE equipo_id=${req.body.equipo_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});


// ENDPOINT JUEGOS
app.get("/juegosall", function(req, res){
  let sql = "SELECT DISTINCT e.juego_id, e.nombre AS juego_nombre, e.foto FROM juegos LEFT JOIN juegos AS e ON (juegos.juego_id = juegos.juego_id)";
  connection.query(sql, function (err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
    res.send(result)
  })
})

app.get("/torneosall", function(req, res){
  let sql = "SELECT DISTINCT e.* FROM torneos LEFT JOIN torneos AS e ON (torneos.torneo_id = torneos.torneo_id)";
  connection.query(sql, function (err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
    res.send(result)
  })
})


// ENDPOINT PARTIDOS 
app.get("/admin-equipos-torneos/:id", function (req, res) {
  let id = req.params.id;
  let sql = "SELECT torneos.torneo_id, equipos.equipo_id, equipos.nombre, equipos.logo FROM equipos_torneos LEFT JOIN torneos ON(equipos_torneos.torneo_id = torneos.torneo_id) LEFT JOIN equipos ON (equipos_torneos.equipo_id = equipos.equipo_id) WHERE torneos.torneo_id="+id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.get("/admin-torneos-all", function (req, res) {
  let id = req.params.id;
  let sql = "SELECT DISTINCT torneos.torneo_id, torneos.nombre, juegos.juego_id, juegos.nombre AS juego_nombre, torneos.fases, torneos.fecha, torneos.hora, torneos.estado, torneos.puntos, reglas.reglas_id, reglas.modo AS reglas_modo FROM equipos_torneos LEFT JOIN torneos ON (equipos_torneos.torneo_id = torneos.torneo_id) LEFT JOIN reglas ON (torneos.reglas_id = reglas.reglas_id) LEFT JOIN juegos ON (torneos.game_id = juegos.juego_id)"
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.delete("/admin-torneos-all", function (req, res) {
  let sql4 = `DELETE FROM torneos WHERE torneo_id=${req.body.torneo_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});

// obtener listado de partidas de un usuario

app.get("/mis-partidas", function (req, res) {
  id = req.query.id;
  let sql = "SELECT torneos.nombre, torneos.juego, torneos.fecha, torneos.hora, torneos.puntos, torneos.estado FROM torneos INNER JOIN equipos_torneos ON (torneos.torneo_id = equipos_torneos.torneo_id) INNER JOIN equipo_usuario ON (equipos_torneos.equipo_id = equipo_usuario.equipo_id) INNER JOIN usuarios ON (equipo_usuario.usuario_id = usuarios.usuario_id) WHERE usuarios.usuario_id =" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

// app.get("/mis-partidas", function (req, res) {
//   id = req.query.id;
//   let sql = "SELECT torneos.nombre, torneos.juego, torneos.fecha, torneos.hora, torneos.puntos, torneos.estado FROM torneos INNER JOIN equipos_torneos ON (torneos.torneo_id = equipos_torneos.torneo_id) INNER JOIN equipo_usuario ON (equipos_torneos.equipo_id = equipo_usuario.equipo_id) INNER JOIN usuarios ON (equipo_usuario.usuario_id = usuarios.usuario_id) WHERE usuarios.usuario_id =" + id;
//   connection.query(sql, function (err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }

//     res.send(result);
//   });


app.get("/admin-partidos", function (req, res) {
  id = req.params.id;
  let sql = "SELECT DISTINCT partidos.partido_id, torneos.torneo_id, torneos.nombre AS torneo_nombre, torneos.estado AS estado_torneo, juegos.juego_id, juegos.nombre AS juego_nombre, juegos.foto AS juego_foto, partidos.fecha, partidos.hora, partidos.equipo_first, e1.nombre AS nombre_equipo_first,e1.logo AS logo_first, partidos.equipo_second, e2.nombre AS nombre_equipo_second, e2.logo AS logo_second,partidos.resultado_first, partidos.resultado_second, partidos.comentario FROM partidos LEFT JOIN juegos ON (partidos.juego_id = juegos.juego_id) LEFT JOIN equipos AS e1 ON (partidos.equipo_first = e1.equipo_id) LEFT JOIN equipos AS e2 ON (partidos.equipo_second = e2.equipo_id) LEFT JOIN torneos ON (partidos.torneo_id = torneos.torneo_id)"
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.post("/admin-partidos", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql2 = `INSERT INTO partidos (partido_id, torneo_id, juego_id, fecha, hora, equipo_first, equipo_second, resultado_first, resultado_second, comentario) VALUES(null, ${req.body.torneo_id}, ${req.body.juego_id}, \"${req.body.fecha}\", \"${req.body.hora}\", ${req.body.equipo_first}, ${req.body.equipo_second}, ${req.body.resultado_first}, ${req.body.resultado_second}, \"${req.body.comentario}\")`;
    connection.query(sql2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

app.put("/admin-partidos", function (req, response) {
  let partido_id = req.body.partido_id;
  let torneo_id = req.body.torneo_id;
  let juego_id = req.body.juego_id;
  let fecha = req.body.fecha;
  let hora = req.body.hora;
  let equipo_first = req.body.equipo_first;
  let equipo_second = req.body.equipo_second;
  let resultado_first = req.body.resultado_first;
  let resultado_second = req.body.resultado_second
  let comentario = req.body.comentario

  let sql = "UPDATE partidos SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);

  if (torneo_id) {
    params.push(torneo_id);
    modi.push(" torneo_id = ? ");
  }
  if (juego_id) {
    params.push(juego_id);
    modi.push(" juego_id = ? ");
  }
  if (fecha) {
    params.push(fecha);
    modi.push(" fecha = ? ");
  }
  if (hora) {
    params.push(hora);
    modi.push(" hora = ? ");
  }
  if (equipo_first) {
    params.push(equipo_first);
    modi.push(" equipo_first = ? ");
  }
  if(equipo_second){
    params.push(equipo_second)
    modi.push(" equipo_second = ? ")
  }
  if(resultado_first){
    params.push(resultado_first)
    modi.push(" resultado_first = ? ")
  }
  if(resultado_second){
    params.push(resultado_second)
    modi.push(" resultado_second = ? ")
  }
  if(comentario){
    params.push(comentario)
    modi.push(" comentario = ? ")
  }

  sql += modi.toString() + "WHERE partido_id= " + partido_id;
  console.log(sql);
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Datos de EQUIPOS actualizados");
    }
    response.send(result);
  });
});

app.delete("/admin-partidos", function (req, res) {
  let sql4 = `DELETE FROM partidos WHERE partido_id=${req.body.partido_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});
// FIN

app.get("/admin-equipo/:nombre", function(req, res){
  id = req.params.id
  nombre = req.params.nombre
  let arr = [id, nombre]
  let sql = `SELECT * FROM equipos WHERE nombre = \"${nombre}\"`
  connection.query(sql, function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
    res.send(result)
  }) 
})

// ENDPOINT PARTIDOS //

app.get("/partidos/:id", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM partidos WHERE partido_id=" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

app.get("/partidos", function (req, res) {
  id = req.params.id;
  let sql1 = "SELECT * FROM partidos";
  connection.query(sql1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.post("/partidos", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql2 = `INSERT INTO partidos (partido_id, torneo_id, equipo_first, equipo_second, resultado_first, resultado_second) VALUES(null, ${req.body.torneo_id}, ${req.body.equipo_first}, ${req.body.equipo_second}, ${req.body.resultado_first}, ${req.body.resultado_second})`;
    connection.query(sql2, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

app.put("/partidos", function (req, response) {
  let partido_id = req.body.partido_id;
  let torneo_id = req.body.torneo_id;
  let equipo_first = req.equipo_first;
  let equipo_second = req.equipo_second;
  let resultado_first = req.resultado_first;
  let resultado_second = req.resultado_second;

  let sql = "UPDATE reglas_id SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);

  if (torneo_id) {
    params.push(torneo_id);
    modi.push(" torneo_id = ? ");
  }
  if (equipo_first) {
    params.push(equipo_first);
    modi.push(" equipo_first = ? ");
  }
  if (equipo_second) {
    params.push(equipo_second);
    modi.push(" equipo_second = ? ");
  }
  if (resultado_first) {
    params.push(resultado_first);
    modi.push(" resultado_first = ? ");
  }
  if (resultado_second) {
    params.push(resultado_second);
    modi.push(" resultado_second = ? ");
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
  let sql4 = `DELETE FROM partidos WHERE partido_id=${req.body.partido_id}`;
  connection.query(sql4, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});

// Muestra todos los equipos de la bbdd

app.get("/equipos", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM equipos";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

// Muestra el equipo pasado por id

app.get("/equipo", function (req, res) {
  id = req.query.id;
  let sql = "SELECT DISTINCT e.*, usuarios.usuario_id AS capitan_id, usuarios.nickname AS nickname_capitan, torneos.estado FROM equipo_usuario JOIN equipos AS e ON(equipo_usuario.equipo_id = e.equipo_id) JOIN usuarios ON (e.capitan = usuarios.usuario_id) JOIN juegos ON (e.juego_id = juegos.juego_id) LEFT JOIN equipos_torneos ON (equipo_usuario.equipo_id = equipos_torneos.equipo_id) LEFT JOIN torneos ON (equipos_torneos.torneo_id = torneos.torneo_id) WHERE e.equipo_id=" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

// Muestra los equipos a los que pertenece un usuario.

app.get("/equipos/:id", function(req, res){
    id = req.params.id;
    let arr = [id];
    let sql2 = "SELECT equipos.nombre, logo, usuarios.url_perfil FROM equipos INNER JOIN equipo_usuario ON (equipos.equipo_id = equipo_usuario.equipo_id) INNER JOIN usuarios ON (equipo_usuario.usuario_id = usuarios.usuario_id) WHERE equipos.equipo_id = ?";
    // let sql = "SELECT nombre, logo FROM equipos INNER JOIN equipo_usuario ON (equipos.equipo_id = equipo_usuario.equipo_id) WHERE usuario_id = ?";
    connection.query(sql2, arr, function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result)
        }
    });
});



// app.get("/equipos/equipo_id/:id", function (req, res) {
//   id = req.params.id;
//   let sql = `SELECT * FROM equipos WHERE nickname=\"${req.params.id}\"`;
//   connection.query(sql, function (err, result) {
//     let resultado;
//     if (err) {
//       console.log(err);
//     } else {
//       var string = JSON.stringify(result);
//       var json = JSON.parse(string);
//       let x = json.find((id) => id === id);
//       if (x === undefined) {
//         resultado = false;
//         console.log(false);
//       } else {
//         resultado = true;
//         console.log(true);
//       }
//     }
//     res.send(result);
//   });
// });

// POST equipos (añade un nuevo equipo a la base de datos).

app.post("/equipos", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql = `INSERT INTO equipos (equipo_id, nombre, logo, juego_id, capitan, ganadas, perdidas, jugadas, biografia) VALUES(null, \"${req.body.nombre}\", \"${req.body.logo}\", \"${req.body.juego_id}\",\"${req.body.capitan}\",\"${req.body.ganadas}\",\"${req.body.perdidas}\",\"${req.body.jugadas}\",\"${req.body.biografia}\")`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

// PUT equipos (modifica la información de un equipo de la base de datos).

app.put("/equipos", function (req, response) {
  let equipo_id = req.body.equipo_id;
  let nombre = req.body.nombre;
  let logo = req.body.logo;
  let juego_id = req.body.juego_id;
  let capitan = req.body.capitan;
  let ganadas = req.body.ganadas;
  let perdidas = req.body.perdidas;
  let jugadas = req.body.jugadas;
  let biografia = req.body.biografia;
  let sql = "UPDATE equipos SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);
  if (nombre) {
    params.push(nombre);
    modi.push(" nombre = ? ");
  }
  if (logo) {
    params.push(logo);
    modi.push(" logo = ? ");
  }
  if (juego_id) {
    params.push(juego_id);
    modi.push(" juego_id = ? ");
  }
  if (capitan) {
    params.push(capitan);
    modi.push(" capitan = ? ");
  }
  if (ganadas) {
    params.push(ganadas);
    modi.push(" ganadas = ? ");
  }
  if (perdidas) {
    params.push(perdidas);
    modi.push(" perdidas = ? ");
  }
  if (jugadas) {
    params.push(jugadas);
    modi.push(" jugadas = ? ");
  }
  if (biografia) {
    params.push(biografia);
    modi.push(" biografia = ? ");
  }

  sql += modi.toString() + "WHERE equipo_id = " + equipo_id;
  console.log(sql);
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Datos del equipo actualizados");
    }
    response.send(result);
  });
});

// Delete equipo

app.delete("/equipos", function (req, res) {
  let sql = `DELETE FROM equipos WHERE equipo_id=${req.body.equipo_id}`;
  connection.query(sql, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});

// Muestra todos los torneos de la bbdd

app.get("/torneos", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM torneos";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

// Muestra el torneo pasado por id

app.get("/torneos/:id", function (req, res) {
  id = req.params.id;
  let sql = "SELECT * FROM torneos WHERE torneo_id=" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }

    res.send(result);
  });
});

// Mostrar los torneos en los que está inscrito un usuario

app.get("/torneo", function (req, res) {
  id = req.query.id;
  let sql = "SELECT torneos.nombre, torneos.juego, torneos.fecha, torneos.hora, torneos.puntos, torneos.estado FROM torneos INNER JOIN equipos_torneos ON (torneos.torneo_id = equipos_torneos.torneo_id) INNER JOIN equipo_usuario ON (equipos_torneos.equipo_id = equipo_usuario.equipo_id) INNER JOIN usuarios ON (equipo_usuario.usuario_id = usuarios.usuario_id) WHERE usuarios.usuario_id =" + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

// Mostrar los torneos de un equipo pasado por query

// app.get("/torneo", function (req, res) {
//   id = req.query.id;
//   let sql = "SELECT * FROM torneos WHERE torneo_id=" + id;
//   connection.query(sql, function (err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//     res.send(result);
//   });
// });

// POST torneos (añade un nuevo torneo a la base de datos).

app.post("/torneos", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql = `INSERT INTO torneos (torneo_id, nombre, juego, fecha, fases, reglas_id, hora, puntos, resultado) VALUES(null, \"${req.body.nombre}\", \"${req.body.juego}\", \"${req.body.fecha}\", \"${req.body.fases}\",\"${req.body.reglas_id}\",\"${req.body.hora}\", \"${req.body.puntos}\", \"${req.body.resultado}\")`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

// PUT torneos (modifica la información de un torneo de la base de datos).

app.put("/torneos", function (req, response) {
  let torneo_id = req.body.torneo_id;
  let nombre = req.body.nombre;
  let juego = req.body.juego;
  let fecha = req.body.fecha;
  let fases = req.body.fases;
  let reglas_id = req.body.reglas_id;
  let hora = req.body.hora;
  let puntos = req.body.puntos;
  let resultado = req.body.resultado;
  let sql = "UPDATE torneos SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);
  if (nombre) {
    params.push(nombre);
    modi.push(" nombre = ? ");
  }
  if (juego) {
    params.push(juego);
    modi.push(" juego = ? ");
  }
  if (fecha) {
    params.push(fecha);
    modi.push(" fecha = ? ");
  }
  if (fases) {
    params.push(fases);
    modi.push(" fases = ? ");
  }
  if (reglas_id) {
    params.push(reglas_id);
    modi.push(" reglas_id = ? ");
  }
  if (hora) {
    params.push(hora);
    modi.push(" hora = ? ");
  }
  if (puntos) {
    params.push(puntos);
    modi.push(" puntos = ? ");
  }
  if (resultado) {
    params.push(resultado);
    modi.push(" resultado = ? ");
  }

  sql += modi.toString() + "WHERE torneo_id = " + torneo_id;
  console.log(sql);
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Datos del torneo actualizados");
    }
    response.send(result);
  });
});

// Elimina un torneo pasado por id

app.delete("/torneos", function (req, res) {
  let sql = `DELETE FROM torneos WHERE torneo_id=${req.body.torneo_id}`;
  connection.query(sql, function (err, result) {
    let msg;
    if (err) {
      console.log(err);
      msg =  true
    } else {
      msg = result
      console.log(result);
    }
    res.send(msg);
  });
});


// ENDPOINTS COLOCACION TORNEO

app.post("/colocacion", function (req, res) {
  if (!req.body) {
    console.log("error");
  } else {
    let sql = `INSERT INTO colicacion_torneo (torneo_id, equipo_id, posicion) VALUES(\"${req.body.torneo_id}\", \"${req.body.equipo_id}\", \"${req.body.posicion}\")`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      res.send(result);
    });
  }
});

app.put("/colocacion", function (req, response) {
  let id = req.body.id;
  let torneo_id = req.body.torneo_id;
  let equipo_id = req.body.equipo_id;
  let posicion = req.body.posicion;
  let sql = "UPDATE colicacion_torneo SET";
  let params = new Array();
  let modi = new Array();
  console.log(req.body);
  if (torneo_id) {
    params.push(torneo_id);
    modi.push(" torneo_id = ? ");
  }
  if (equipo_id) {
    params.push(equipo_id);
    modi.push(" equipo_id = ? ");
  }
  if (posicion) {
    params.push(posicion);
    modi.push(" posicion = ? ");
  }

  sql += modi.toString() + "WHERE id = " + id;
  console.log(sql);
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Datos de la colocacion actualizados");
    }
    response.send(result);
  });
});

app.get("/colocacion", function (req, res) {
  id = req.query.id;
  let sql = "SELECT colicacion_torneo.posicion, logo, nombre, resultado_first, resultado_second " + 
  "FROM `colicacion_torneo` INNER JOIN equipos ON (colicacion_torneo.equipo_id = equipos.equipo_id) " +
  "LEFT JOIN partidos ON (partidos.equipo_first = equipos.equipo_id) " + 
  "WHERE colicacion_torneo.torneo_id = " + id;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.send(result);
  });
});

app.listen(8000);
