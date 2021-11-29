
filterSelection("all")
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}


// //Isotope filter

// //init Isotope
// var $grid = $('.blog-sec').isotope({
//     // options
// });
// // filter items on button click
// $('.filter-button-group').on('click', 'button', function () {
//     var filterValue = $(this).attr('data-filter');
//     resetFilterBtns();
//     $(this).addClass('active-filter-btn');
//     $grid.isotope({ filter: filterValue });
// });

// var filterBtns = $('.filter-button-group').find('button');
// function resetFilterBtns() {
//     filterBtns.each(function () {
//         $(this).removeClass('active-filter-btn');
//     });
// }

// Filer function

// const filters = document.querySelectorAll('.btn');

// filters.forEach(filterBtn => {
//     filterBtn.addEventListener('click', () => {
//         let id = filterBtn.getAttribute('id');
//         let projectCards = document.querySelectorAll('.grid-col-item');
//         projectCards.forEach(card => {
//             if (card.getAttribute('data-tags').includes(id)) {
//                 card.classList.remove('hide');
//             } else {
//                 card.classList.add('hide');
//             }
//         })

//         filters.forEach(btn => btn.classList.remove('active'));
//         filterBtn.classList.add('active');
//     })
// })