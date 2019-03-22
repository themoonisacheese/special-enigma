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

}

function supprimer_recherche(e)
{ 


}


function selectionner_recherche(e)
{ 


}


function init()
{

}


function rechercher_nouvelles()
{
	
	
}


function maj_resultats(res)
{

	
}


function sauver_nouvelle(e)
{
	
}


function supprimer_nouvelle(e)
{
	
}





	






