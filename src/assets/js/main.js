import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "aos/dist/aos.css";
import AOS from "aos";
import $ from "jquery";
import * as Isotope from "isotope-layout";
import JQueryBridget from "jquery-bridget";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";

JQueryBridget("isotope", Isotope, $);

$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
});

AOS.init();

$(document).ready(() => {
  let Sbutton = $(".project-area .button-group button");

  Sbutton.click((e) => {
    $(".project-area .button-group button").removeClass("active");

    e.target.classList.add("active");

    let selector = $(e.target).attr("data-filter");

    $(".project-area .grid").isotope({
      filter: selector,
    });
    return false;
  });

  //!sticky nav
  let nav_offset_top = $(".header_area").height() + 40;

  function navbarFixed() {
    if ($(".header_area").length) {
      $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        if (scroll >= nav_offset_top) {
          $(".header_area .main-menu").addClass("navbar_fixed");
        } else {
          $(".header_area .main-menu").removeClass("navbar_fixed");
        }
      });
    }
  }

  navbarFixed();
});
