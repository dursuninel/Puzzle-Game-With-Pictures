let Game_Type;


function _Start_Game() {

    const _Unique = (adet = 5, min = 1, max = 9) => {
        let _Arr = []
        while (_Arr.length < adet) {
            const rand = Math.floor(Math.random() * (max - min + 1) + min)
            if (_Arr.indexOf(rand) > -1) continue
            _Arr[_Arr.length] = rand
        }
        return _Arr
    }
    let _Arr = _Unique(9);
    let images = [];



    $(_Arr).each(function (key, value) {
        images.push(value);
    })



    let board = $(".board")[0];
    let _Z_index = 0;
    let first_img;
    let last_img;
    let time = 0;

    function timeUp() {
        time++;
        return time;
    }



    let _Passing_Time;

    let _sure_sayac = setInterval(() => {
        _Passing_Time = timeUp();
    }, 1000);
    board.innerHTML = "";
    for (let index = 0; index < images.length; index++) {
        board.innerHTML += `
        <img src="${Game_Type}/${images[index]}.jpg" />
    `;
    }


    $(".board img").on("mouseenter", function () {
        $(this).css("z-index", _Z_index)
        _Z_index++;
    })

    $(function () {
        $(".board img").draggable({
            containment: ".board",
            revert: true,
            revertDuration: 0,
            start: function (event, ui) {
                first_img = this;
            }
        });
        $(".board img").droppable({
            drop: function (event, ui) {
                last_img = this;
                let new_src = $(last_img).attr("src");
                let old_src = $(first_img).attr("src");

                $(last_img).attr("src", old_src);
                $(first_img).attr("src", new_src);

                let controlNumber = 1;
                let imagesC = $(".board img")

                $(imagesC).each(function (key, value) {
                    let src = $(value).attr("src").split(".")[0].split("/")[1];
                    if (src == controlNumber) {
                        controlNumber++;
                    }
                    else {
                        controlNumber = 1;
                    }
                    console.log(controlNumber)

                    if (controlNumber == 9) {
                        setTimeout(() => {
                            clearInterval(_sure_sayac);
                            $(".board").css("pointer-events", "none")
                            alert("Congratulations. It took you " + _Passing_Time + " seconds to Solve the Puzzle.");
                        }, 50);
                    }
                })
            }
        });
    });
}

$(".item").on("click", function () {
    $(".item").removeClass("active");
    $(this).addClass("active");
    Game_Type = $(".item.active").find("img").attr("src").split("/")[0];

    $("#Game_Start").removeAttr("disabled");

})


$("#Game_Start").on("click", function () {
    $("#Game_Start").attr("disabled", "disabled");
    _Start_Game();
    $(".board").css("pointer-events", "all")
})

