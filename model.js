var model = {}
model.recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
model.recherche_courante;// chaine de caracteres correspondant a la recherche courante
model.recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)


model.ajouter_recherche = function() {

    this.recherches.push(view.get_zone_saisie());
    
    model.set_cookie("recherches", this.recherches);
}

model.supprimer_recherche = function (content) {
    model.recherches.splice(model.recherches.indexOf(content),1);

    // Sauvegarde
    model.set_cookie("recherches", this.recherches);
}

model.set_recherches = function (rech) {
    this.recherches = rech;
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

    // var resultats = $.cookie(e); // Version cookies
    var resultats = localStorage.getItem(e); // Version WebStorage

    if (resultats != undefined) {
        return JSON.parse(resultats);
    }
    return undefined;
}

model.set_cookie= function(cookie, obj){
    // $.cookie(cookie, JSON.stringify(obj), {expires: 1000}); // Version cookies
    localStorage.setItem(cookie, JSON.stringify(obj)); // WebStorage
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