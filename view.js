var view = {}

view.get_zone_saisie = function(){
    return $("#zone_saisie").val().trim();
}

view.set_zone_saisie = function(e){
    $("#zone_saisie").val(e.trim());
}

view.ajouter_recherche = function(){
     // Ajout dans div recherches-stockees
     let rech = $(`<p class="titre-recherche"><label>${view.get_zone_saisie()}</label>`
     + `<img src="croix30.jpg" class="icone-croix"/></p>`);
     rech.appendTo("#recherches-stockees");
 
     // Ajout fonctions
     rech.children("label").attr("onclick","controler.selectionner_recherche(this)");
     rech.children("img").attr("onclick", "controler.supprimer_recherche(this)");
}

view.supprimer_recherche = function(e) {
    var element = e.parentElement;
    $(element).remove();
    return $(element).children("label").html();
}

view.vider_resultat = function () {
    // Vidage resultats
    $("#resultats").empty();
}

view.ajouter_resultat = function (e) {
    
    var click = "";
    var img = "";

    // Teste si la date est valide
    var date_regex = /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\s([0-1]?[0-9]|2?[0-3])h([0-5]\d)$/;
    if (e.date.trim().match(date_regex) == null) {
        e.date = format(e.date);
    }

    if (indexOf(model.get_recherche_courante_news(), e) != -1) { // Nouvelle existe
        click = "controler.supprimer_nouvelle(this)";
        img = "disk15.jpg";
    } else { // Nouvelle n'existe pas
        click = "controler.sauver_nouvelle(this)";
        img = "horloge15.jpg";
    }

    var singleresult = $(`<p class="titre_result"><a class="titre_news" href="${e.url}" target="_blank">${e.titre}</a>`
    + `<span class="date_news">${e.date}</span><span class="action_news" onclick="${click}"><img src="${img}"/></span></p> `);
    $("#resultats").append(singleresult);
}

view.init_recherche = function (element){
    rech = $(`<p class="titre-recherche"><label>${element}</label>`
        + `<img src="croix30.jpg" class="icone-croix"/></p>`);
        rech.appendTo("#recherches-stockees");

        // Ajout fonctions
        rech.children("label").attr("onclick","controler.selectionner_recherche(this)");
        rech.children("img").attr("onclick", "controler.supprimer_recherche(this)");
}

view.show_wait = function () {
    $("#wait").css('display','block').show();
}

view.hide_wait = function() {
    $("#wait").hide();
}

view.afficher_disque = function (e) {
    // Changement span action_news
    $(e).children("img").attr("src", "disk15.jpg");
    $(e).attr("onclick", "controler.supprimer_nouvelle(this)");

    
}

view.afficher_horloge = function(e){
    // Changement span action_news
    $(e).children("img").attr("src", "horloge15.jpg");
    $(e).attr("onclick", "controler.sauver_nouvelle(this)");
}

view.get_nouvelle = function(e){
    var titre = $(e).parent().find(".titre_news").text();
    var date = $(e).parent().children(".date_news").text();
    var url = $(e).parent().find(".titre_news").attr("href");

    return { titre: titre, date: date, url: url };
}