var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{

}

function supprimer_recherche(e)
{ 
    var element = e.parentElement;
    $(element).remove();
    var content = $(element).children("label").html();
    recherches.splice(recherches.indexOf(content),1);
}


function selectionner_recherche(e)
{ 
    var content = e.html();
    $("#zone_saisie").val(content);
    recherche_courante = content;
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





	






