$("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
    // console.log($(this).css("color"))
    // if ($(this).css("color") === "rgb(128, 128, 128)") {
    //     $(this).css({
    //         "color": "black",
    //         "text-decoration": "none"
    //     });
    // } else {
    //     $(this).css({
    //         "color": "gray",
    //         "text-decoration": "line-through"
    //     });
    // }
})

$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    })
    event.stopPropagation();
})

$("input[type='text']").keypress(function(event) {
    if (event.which === 13) {
        var text = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='far fa-trash-alt'></i></span>" + text + "</li>");
    }
})

$("#toggle-form").click(function(){
    $("input[type='text']").fadeToggle
});