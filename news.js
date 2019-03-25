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
    $.cookie("recherches", JSON.stringify(recherches));
}

function supprimer_recherche(e)
{ 
    var element = e.parentElement;
    $(element).remove();
    var content = $(element).children("label").html();
    recherches.splice(recherches.indexOf(content),1);

    // Cookies
    $.cookie("recherches", JSON.stringify(recherches));
}


function selectionner_recherche(e)
{ 
    var content = e.innerHTML;
    $("#zone_saisie").val(content);
    recherche_courante = content;
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
    // Vidage resultats
    $("#resultats").empty();

    // Affichage wait
    $("#wait").css('display','block').show();

    // Appel AJAX
    $.ajaxSetup({async:false});
    $.get('search.php', maj_resultats);
}


function maj_resultats(res)
{
    $("#wait").hide();
    var resultats = JSON.parse(decodeEntities(res));

    resultats.forEach(element => {
        var singleresult = $(`<p class="titre_result"><a class="titre_news" href="${element.url}" target="_blank">${element.titre}</a><span class="date_news">${format(element.date)}</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="horloge15.jpg"/></span></p> `);
        $("#resultats").append(singleresult);
    });

}


function sauver_nouvelle(e)
{
	
}


function supprimer_nouvelle(e)
{
	
}





	






