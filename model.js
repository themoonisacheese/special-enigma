var model = {}
model.recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
model.recherche_courante;// chaine de caracteres correspondant a la recherche courante
model.recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)


model.ajouter_recherche = function() {
    this.recherches.push(view.get_zone_saisie());
    $.cookie("recherches", JSON.stringify(this.recherches), { expires: 1000 });
}

model.supprimer_recherche = function (content) {
    model.recherches.splice(model.recherches.indexOf(content),1);

    // Cookies
    $.cookie("recherches", JSON.stringify(this.recherches), { expires: 1000 });
}

model.get_recherche_courante = function(){
    return this.recherche_courante;
}

model.set_recherche_courante = function (e) {
    this.recherche_courante = e;
}

model.get_recherche_courante_news = function(){
    return this.recherche_courante_news;
}

model.set_recherche_courante_news = function(e) {
    if (e == undefined) {
        this.recherche_courante_news = [];
    } else {
        this.recherche_courante_news = e;
    }
}

model.get_cookie_parse = function(e){
    var cookie = $.cookie(e);
    if (cookie != undefined /*&& cookie.trim() != ""*/) {
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
    $.get(`search.php?data=${this.recherche_courante}`, controler.maj_resultats);
}

model.cond_push = function (nouvelle) {
    if (indexOf(this.recherche_courante_news, nouvelle) == -1) {
        this.recherche_courante_news.push(nouvelle);
    }
}

model.cond_splice = function(nouvelle){
    var index = indexOf(this.recherche_courante_news, nouvelle);
    if (index != -1) {
        this.recherche_courante_news.splice(index, 1);
    }
}