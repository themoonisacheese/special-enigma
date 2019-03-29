var controler = {};
controler.ajouter_recherche = function()
{
    // Empêche une sauvegarde de recherche vide
    if (view.get_zone_saisie() == "") {
        return;
    }

    model.ajouter_recherche();    

    view.ajouter_recherche();
   

}

controler.supprimer_recherche = function (e)
{
    var content = view.supprimer_recherche(e);
    model.supprimer_recherche(content);
}


controler.selectionner_recherche = function(e)
{
    // Valeur zone de recherche
    var content = e.innerHTML;
    view.set_zone_saisie(content);
    model.set_recherche_courante(content);

    var cookie = model.get_cookie_parse(model.get_recherche_courante);

    if (cookie != undefined) {
      model.set_recherche_courante_news(cookie);


      // Chargement résultats enregistrés
      model.get_recherche_courante_news.forEach(element => {
          view.ajouter_resultat(element);
      });
    }
}


controler.init = function ()
{   
    var rech = model.get_cookie_parse('recherches');
    if (rech) {
        rech.forEach(element => {
            view.init_recherche(element);
        });
    }
}


controler.rechercher_nouvelles = function ()
{
    // Set recherche_courante
    recherche_courante = view.get_zone_saisie();

    // Vidage resultats
    view.vider_resultat();
    // Affichage wait
    model.set_recherche_courante_news(model.get_cookie_parse(model.get_recherche_courante()));

    model.le_seul_appel();
}


controler.maj_resultats = function (res)
{
    view.hide_wait();

    var resultats = JSON.parse(decodeEntities(res));


    resultats.forEach(element => {
        view.ajouter_resultat(element);
    });

}


controler.sauver_nouvelle = function (e)
{
    view.afficher_disque(e);

    // Sauvegarde annonce courante

    model.cond_push(view.get_nouvelle(e));

    

    // Sauvegarde dans le cookie
    model.set_cookie(model.get_recherche_courante(), model.get_recherche_courante_news());

}


controler.supprimer_nouvelle = function (e)
{
    view.afficher_horloge(e);

   
    
    model.cond_splice(view.get_nouvelle(e));
    // Sauvegarde dans le cookie

    model.set_cookie(model.get_recherche_courante(), model.get_recherche_courante_news());


}
