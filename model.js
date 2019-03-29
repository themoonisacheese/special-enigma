var model = {}
model.recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
 model.recherche_courante;// chaine de caracteres correspondant a la recherche courante
 model.recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)


model.ajouter_recherche = function() {
    model.recherches.push(view.get_zone_saisie());
    $.cookie("recherches", JSON.stringify(model.recherches), { expires: 1000 });
}

model.supprimer_recherche = function (content) {
    model.recherches.splice(mdoel.recherches.indexOf(content),1);

    // Cookies
    $.cookie("recherches", JSON.stringify(model.recherches), { expires: 1000 });
}

model.set_recherche_courante = function(e){
    model.recherche_courante = e;
}
model.get_recherche_courante = function(){
    return model.recherche_courante;
}

model.get_recherche_courante_news = function(){
    return model.recherche_courante_news;
}

model.set_recherche_courante_news = function(e) {
    model.recherche_courante_news = e;
}

model.get_cookie_parse = function(e){
    var cookie = $.cookie(e);
    if (cookie != undefined && cookie.trim() != "") {
        return JSON.parse(cookie);
    }
    return undefined;
}

model.set_cookie= function(cookie, obj){
    $.cookie(cookie, JSON.stringify(obj), {expires: 1000});
}

model.le_seul_appel = function(){
    // Appel AJAX
    $.ajaxSetup({async:false});
    $.get(`search.php?data=${model.recherche_courante}`, controler.maj_resultats);
}

model.cond_push = function (nouvelle) {
    if (indexOf(model.recherche_courante_news, nouvelle) == -1) {
        model.recherche_courante_news.push(nouvelle);
    }
}

model.cond_splice = function(nouvelle){
    var index = indexOf(model.recherche_courante_news, nouvelle);
    if (index != -1) {
        model.recherche_courante_news.splice(index, 1);
    }
}