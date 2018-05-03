$(document).ready(function() {
    $.ajax({
        url: "https://maintenant.pole-emploi.fr/v2/secteurs"
    }).then(function(data) {
       $('.greeting-id').append(data.secteurs[0].id);
       $('.greeting-content').append(data.secteurs[0].code);
    });
});
