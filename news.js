var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
    // Empêche une sauvegarde de recherche vide
    if ($("#zone_saisie").val().trim() == "") {
        return;
    }

    // Sauvegarde dans variable recherches
    recherches.push($("#zone_saisie").val());

    // Ajout dans div recherches-stockees
    let rech = $(`<p class="titre-recherche"><label>${$("#zone_saisie").val()}</label>`
    + `<img src="croix30.jpg" class="icone-croix"/></p>`);
    rech.appendTo("#recherches-stockees");

    // Ajout fonctions
    rech.children("label").attr("onclick","selectionner_recherche(this)");
    rech.children("img").attr("onclick", "supprimer_recherche(this)");

    // Cookies
    $.cookie("recherches", JSON.stringify(recherches), { expires: 1000 });
}

function supprimer_recherche(e)
{
    var element = e.parentElement;
    $(element).remove();
    var content = $(element).children("label").html();
    recherches.splice(recherches.indexOf(content),1);

    // Cookies
    $.cookie("recherches", JSON.stringify(recherches), { expires: 1000 });
}


function selectionner_recherche(e)
{
    // Valeur zone de recherche
    var content = e.innerHTML;
    $("#zone_saisie").val(content);
    recherche_courante = content;

    // Chargement valeurs du cookie
    var cookie = $.cookie(recherche_courante);

    // Chargement valeurs si le cookie n'est pas vide
    if (cookie != undefined && cookie.trim() != "") {
      recherche_courante_news = JSON.parse(cookie);

      // Vidage resultats
      $("#resultats").empty();

      // Chargement résultats enregistrés
      recherche_courante_news.forEach(element => {
          var singleresult = $(`<p class="titre_result"><a class="titre_news" href="${element.url}" target="_blank">${element.titre}</a>`
          + `<span class="date_news">${element.date}</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="disk15.jpg"/></span></p> `);
          $("#resultats").append(singleresult);
      });
    }
}


function init()
{
    var rech = $.cookie('recherches');
    if (rech) {
        recherches = JSON.parse(rech);

        recherches.forEach(element => {
        rech = $(`<p class="titre-recherche"><label>${element}</label>`
        + `<img src="croix30.jpg" class="icone-croix"/></p>`);
        rech.appendTo("#recherches-stockees");

        // Ajout fonctions
        rech.children("label").attr("onclick","selectionner_recherche(this)");
        rech.children("img").attr("onclick", "supprimer_recherche(this)");
    });
    }

}


function rechercher_nouvelles()
{
    // Set recherche_courante
    recherche_courante = $("#zone_saisie").val().trim();

    // Vidage resultats
    $("#resultats").empty();

    // Affichage wait
    $("#wait").css('display','block').show();

    // Chargement valeurs du cookie
    var cookie = $.cookie(recherche_courante);

    // Chargement valeurs si le cookie n'est pas vide
    if (cookie != undefined && cookie.trim() != "") {
        recherche_courante_news = JSON.parse(cookie);
    }

    // Appel AJAX
    $.ajaxSetup({async:false});
    $.get(`search.php?data=${recherche_courante}`, maj_resultats);
}


function maj_resultats(res)
{
    $("#wait").hide();
    var resultats = JSON.parse(decodeEntities(res));

    console.log(resultats);
    console.log(recherche_courante_news);

    resultats.forEach(element => {

        var click = "";
        var img = "";

        element.date = format(element.date);

        if (indexOf(recherche_courante_news, element) != -1) { // Nouvelle existe
            click = "supprimer_nouvelle(this)";
            img = "disk15.jpg";
        } else { // Nouvelle n'existe pas
            click = "sauver_nouvelle(this)";
            img = "horloge15.jpg";
        }

        var singleresult = $(`<p class="titre_result"><a class="titre_news" href="${element.url}" target="_blank">${element.titre}</a>`
        + `<span class="date_news">${element.date}</span><span class="action_news" onclick="${click}"><img src="${img}"/></span></p> `);
        $("#resultats").append(singleresult);
    });

}


function sauver_nouvelle(e)
{
    // Changement span action_news
    $(e).children("img").attr("src", "disk15.jpg");
    $(e).attr("onclick", "supprimer_nouvelle(this)");

    // Sauvegarde annonce courante
    var titre = $(e).parent().find(".titre_news").text();
    var date = $(e).parent().children(".date_news").text();
    var url = $(e).parent().find(".titre_news").attr("href");

    var nouvelle = { titre: titre, date: date, url: url };
    if (indexOf(recherche_courante_news, nouvelle) == -1) {
        recherche_courante_news.push(nouvelle);
    }

    // Sauvegarde dans le cookie
    $.cookie(recherche_courante, JSON.stringify(recherche_courante_news));

}


function supprimer_nouvelle(e)
{
    // Changement span action_news
    $(e).children("img").attr("src", "horloge15.jpg");
    $(e).attr("onclick", "sauver_nouvelle(this)");

    // Retrait annonce courante
    var titre = $(e).parent().find(".titre_news").text();
    var date = $(e).parent().children(".date_news").text();
    var url = $(e).parent().find(".titre_news").attr("href");

    var nouvelle = { titre: titre, date: date, url: url };
    var index = indexOf(recherche_courante_news, nouvelle);
    if (index != -1) {
        recherche_courante_news.splice(index, 1);
    }

    // Sauvegarde dans le cookie
    $.cookie(recherche_courante, JSON.stringify(recherche_courante_news));

}
