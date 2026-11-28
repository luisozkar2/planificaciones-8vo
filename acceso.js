/* =============================================================================
   INGRESO AL SITIO (barrera visual)
   Cada página carga este archivo en el <head>. Si el visitante no ingresó con
   el usuario y la contraseña, lo manda a login.html.

   OJO: es solo una barrera visual. Los PDF, las fotos y el código siguen
   accesibles con el enlace directo, y el repositorio de GitHub es público.

   CAMBIAR LA CONTRASEÑA: reemplazar HASH por el SHA-256 (en hexadecimal) de
       usuario-en-minúsculas + ":" + contraseña + ":" + SAL
   Por ejemplo, con Node:
       node -e "console.log(require('crypto').createHash('sha256').update('usuario:clave:planificacion-8vo').digest('hex'))"
   Al cambiar el HASH, todas las sesiones guardadas dejan de valer.
   ============================================================================= */
(function () {
  var HASH = "105bfe1287a64538f55497febf3639927c8e0f5d1554e9c12cfe10ab07933e72";
  var SAL = "planificacion-8vo";
  var CLAVE = "acceso8vo";
  var DIAS = 30;

  function leer(almacen) {
    try { return JSON.parse(almacen.getItem(CLAVE) || "null"); } catch (e) { return null; }
  }
  function guardar(almacen, valor) {
    try { almacen.setItem(CLAVE, JSON.stringify(valor)); return true; } catch (e) { return false; }
  }
  function borrar() {
    try { localStorage.removeItem(CLAVE); } catch (e) {}
    try { sessionStorage.removeItem(CLAVE); } catch (e) {}
  }
  function hayAlmacenamiento() {
    try { sessionStorage.setItem("prueba8vo", "1"); sessionStorage.removeItem("prueba8vo"); return true; } catch (e) {}
    try { localStorage.setItem("prueba8vo", "1"); localStorage.removeItem("prueba8vo"); return true; } catch (e) {}
    return false;
  }
  function sesionValida() {
    var s = null, l = null;
    try { s = leer(sessionStorage); } catch (e) {}
    try { l = leer(localStorage); } catch (e) {}
    if (s && s.h === HASH) return true;
    if (l && l.h === HASH && l.vence > Date.now()) return true;
    return false;
  }
  function paginaActual() {
    var p = location.pathname.split("/").pop() || "index.html";
    return p + location.hash;
  }

  /* Lo que usa login.html */
  window.Acceso = {
    async comprobar(usuario, clave) {
      var texto = String(usuario).trim().toLowerCase() + ":" + String(clave) + ":" + SAL;
      var datos = new TextEncoder().encode(texto);
      var hash = await crypto.subtle.digest("SHA-256", datos);
      var hex = Array.from(new Uint8Array(hash)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
      return hex === HASH;
    },
    ingresar(recordar) {
      borrar();
      if (recordar) guardar(localStorage, { h: HASH, vence: Date.now() + DIAS * 864e5 });
      guardar(sessionStorage, { h: HASH });
    },
    sesionValida: sesionValida
  };
  window.cerrarSesion = function () {
    borrar();
    location.href = "login.html";
  };

  if (window.ACCESO_LOGIN) return;           // login.html: no redirigir
  if (!hayAlmacenamiento()) return;          // navegador sin almacenamiento: no dejar a nadie afuera
  if (sesionValida()) return;

  document.documentElement.style.visibility = "hidden";
  location.replace("login.html?volver=" + encodeURIComponent(paginaActual()));
})();
