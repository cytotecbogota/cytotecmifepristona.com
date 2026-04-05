/**
 * layout.js
 * Injects the shared header and footer into every page.
 * To update the header or footer sitewide, edit this file only.
 *
 * Usage: include this script BEFORE functions.js, e.g.:
 *   <script src="assets/js/layout.js"></script>
 *   <script src="assets/js/functions.js"></script>
 *
 * Every page that uses this layout needs no placeholder divs —
 * the script replaces the existing <header> and <footer> elements
 * with the canonical versions defined here.
 */
(function () {
    'use strict';

    /* -------------------------------------------------------
       Active-nav detection
    ------------------------------------------------------- */

    var PAGES = {
        home:    ['', 'index.html'],
        contact: ['contact.html'],
        about:   ['page-about.html'],
        faqs:    ['page-faqs.html']
    };

    function currentPage() {
        return window.location.pathname.split('/').pop() || '';
    }

    function activeSection() {
        var page = currentPage();
        for (var section in PAGES) {
            if (PAGES.hasOwnProperty(section) && PAGES[section].indexOf(page) !== -1) {
                return section;
            }
        }
        return 'home';
    }

    /** Returns ' active' when the given section matches the current page. */
    function isActive(section) {
        return activeSection() === section ? ' active' : '';
    }

    /** Returns class="nav-item current" or class="nav-item" for dropdown items. */
    function isCurrent(page) {
        return currentPage() === page
            ? ' class="nav-item current"'
            : ' class="nav-item"';
    }

    /* -------------------------------------------------------
       Shared SVG fragments
    ------------------------------------------------------- */

    var arrowSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 8" width="11" height="8">'
        + '<g><g><g><path class="shp1" d="M11 4L7.01 0L7.01 3L0 3L0 5L7.01 5L7.01 8L11 4Z"></path></g></g></g>'
        + '</svg>';

    var languageDropdown =
        '<div class="selected">'
        +   '<img src="assets/images/module-language/en.png" alt="alt"/>'
        +   '<span>english</span>'
        +   '<i class="fas fa-chevron-down"></i>'
        + '</div>'
        + '<div class="lang-list"><ul>'
        +   '<li><img src="assets/images/module-language/en.png" alt="alt"/><a href="#">english</a></li>'
        +   '<li><img src="assets/images/module-language/ar.png" alt="alt"/><a href="#">arabic</a></li>'
        + '</ul></div>';

    /* -------------------------------------------------------
       Module fullscreen (search overlay)
    ------------------------------------------------------- */

    var moduleFullscreenHTML =
        '<div class="module-content module-fullscreen module-search-box">'
        +   '<div class="pos-vertical-center">'
        +     '<div class="container">'
        +       '<div class="row">'
        +         '<div class="col-sm-12 col-md-12 col-lg-8 offset-lg-2">'
        +           '<form class="form-search">'
        +             '<input class="form-control" type="text" placeholder="type words then enter"/>'
        +             '<button></button>'
        +           '</form>'
        +         '</div>'
        +       '</div>'
        +     '</div>'
        +   '</div>'
        +   '<a class="module-cancel" href="#"><i class="fas fa-times"></i></a>'
        + '</div>';

    /* -------------------------------------------------------
       Header (built dynamically for active-nav state)
    ------------------------------------------------------- */

    function buildHeader() {
        return (
            '<header class="header header-light header-topbar" id="navbar-spy">'

            /* ---- Top bar ---- */
            + '<div class="top-bar">'
            +   '<div class="block-left">'
            +     '<p class="headline">'
            +       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">'
            +         '<g><g><g><path class="shp0" d="M10 10L8 10L8 4L10 4L10 10Z'
            +           'M9 14.3C8.28 14.3 7.7 13.72 7.7 13C7.7 12.28 8.28 11.7 9 11.7'
            +           'C9.72 11.7 10.3 12.28 10.3 13C10.3 13.72 9.72 14.3 9 14.3Z'
            +           'M12.73 0L5.27 0L0 5.27L0 12.73L5.27 18L12.73 18L18 12.73L18 5.27L12.73 0Z">'
            +         '</path></g></g></g>'
            +       '</svg>'
            +       'Our Clinic sees over 10,000 patients every year.'
            +     '</p>'
            +     '<div class="carousel owl-carousel" data-slide="1" data-slide-rs="1"'
            +         ' data-autoplay="true" data-nav="false" data-dots="false"'
            +         ' data-space="0" data-loop="true" data-speed="800">'
            +       '<a href="blog-grid-fullwidth.html"> Hear their real stories ' + arrowSvg + '</a>'
            +       '<a href="blog-grid-fullwidth.html"> tips for eating healthy ' + arrowSvg + '</a>'
            +       '<a href="blog-grid-fullwidth.html"> why wearing a mask ' + arrowSvg + '</a>'
            +       '<a href="blog-grid-fullwidth.html"> why coronavirus cases rise ? ' + arrowSvg + '</a>'
            +     '</div>'
            +   '</div>'
            +   '<div class="block-right">'
            +     '<div class="top-contact">'
            +       '<div class="contact-infos"><i class="fas fa-phone-alt"></i>'
            +         '<div class="contact-body"><a href="tel:123-456-7890">emergency line: 002 010612457410</a></div>'
            +       '</div>'
            +       '<div class="contact-infos"><i class="fas fa-map-marker-alt"></i>'
            +         '<div class="contact-body"><a href="#">location: brooklyn, new york</a></div>'
            +       '</div>'
            +       '<div class="contact-infos"><i class="fas fa-clock"></i>'
            +         '<div class="contact-body"><p>Mon-Fri: 8am \u2013 7pm</p></div>'
            +       '</div>'
            +     '</div>'
            +     '<div class="module module-language">' + languageDropdown + '</div>'
            +   '</div>'
            + '</div>'

            /* ---- Navbar ---- */
            + '<nav class="navbar navbar-expand-xl navbar-sticky" id="primary-menu">'
            +   '<a class="navbar-brand" href="index.html">'
            +     '<img class="logo logo-dark" src="assets/images/logo/logo-dark.svg" alt="Medisch Logo"/>'
            +     '<img class="logo logo-mobile" src="assets/images/logo/logo-mobile.svg" alt="Medisch Logo"/>'
            +   '</a>'
            +   '<div class="module-holder module-holder-phone">'
            +     '<div class="module module-search float-left">'
            +       '<div class="module-icon search-icon"><i class="icon-search" data-hover=""></i></div>'
            +     '</div>'
            +     '<div class="module module-language">' + languageDropdown + '</div>'
            +     '<button class="navbar-toggler collapsed" type="button"'
            +         ' data-bs-toggle="collapse" data-bs-target="#navbarContent"'
            +         ' aria-controls="navbarContent" aria-expanded="false"'
            +         ' aria-label="Toggle navigation">'
            +       '<span class="navbar-toggler-icon"></span>'
            +     '</button>'
            +   '</div>'
            +   '<div class="collapse navbar-collapse" id="navbarContent">'
            +     '<ul class="navbar-nav ">'

            /* Inicio */
            +       '<li class="nav-item' + isActive('home') + '" data-hover="">'
            +         '<a href="index.html"><span>Inicio</span></a>'
            +       '</li>'

            /* Sobre nosotros */
            +       '<li class="nav-item' + isActive('about') + '" data-hover="">'
            +         '<a href="page-about.html"><span>Sobre nosotros</span></a>'
            +       '</li>'

            /* Preguntas frecuentes */
            +       '<li class="nav-item' + isActive('faqs') + '" data-hover="">'
            +         '<a href="page-faqs.html"><span>Preguntas frecuentes</span></a>'
            +       '</li>'

            /* Contacto */
            +       '<li class="nav-item' + isActive('contact') + '" data-hover="">'
            +         '<a href="contact.html"><span>Contacto</span></a>'
            +       '</li>'

            +     '</ul>'
            +     '<div class="module-holder">'
            +     '</div>'
            +   '</div>'
            + '</nav>'

            + '</header>'
        );
    }

    /* -------------------------------------------------------
       Footer
    ------------------------------------------------------- */

    var footerHTML =
        '<footer class="footer footer-1">'
        + '<div class="footer-top">'
        +   '<div class="container">'
        +     '<div class="row">'

        /* Quick contact */
        +       '<div class="col-sm-12 col-md-6 col-lg-4">'
        +         '<div class="footer-widget widget-contact">'
        +           '<div class="footer-widget-title"><h5>Contacto rápido</h5></div>'
        +           '<div class="widget-content">'
        +             '<p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>'
        +             '<ul>'
        +               '<li class="phone"><a href="tel:+01061245741"><i class="fas fa-phone-alt"></i> 01061245741</a></li>'
        +             '</ul>'
        +           '</div>'
        +         '</div>'
        +       '</div>'

        /* Navigation links */
        +       '<div class="col-sm-6 col-md-3 col-lg-4">'
        +         '<div class="footer-widget widget-links">'
        +           '<div class="footer-widget-title"><h5>Navegación</h5></div>'
        +           '<div class="widget-content"><ul>'
        +             '<li><a href="index.html">Inicio</a></li>'
        +             '<li><a href="contact.html">Contacto</a></li>'
        +             '<li><a href="page-about.html">Sobre nosotros</a></li>'
        +             '<li><a href="page-faqs.html">Preguntas frecuentes</a></li>'
        +           '</ul></div>'
        +         '</div>'
        +       '</div>'

        +     '</div>'   /* /row */
        +     '<div class="clearfix"></div>'
        +   '</div>'    /* /container */
        + '</div>'      /* /footer-top */

        + '<div class="footer-bottom">'
        +   '<div class="container">'
        +     '<div class="row">'
        +       '<div class="col-12">'
        +         '<div class="footer-copyright">'
        +           '<div class="copyright">'
        +             '<span>&copy; 2021 medisch by <a href="https://1.envato.market/kP9BV"> Zytheme.com</a>. all rights reserved. </span>'
        +             '<ul class="list-unstyled social-icons">'
        +               '<li><a class="share-facebook" href="#"><i class="fab fa-facebook-f"> </i></a></li>'
        +               '<li><a class="share-instagram" href="#"><i class="fab fa-instagram"></i></a></li>'
        +               '<li><a class="share-twitter" href="#"><i class="fab fa-twitter"></i></a></li>'
        +             '</ul>'
        +           '</div>'
        +         '</div>'
        +       '</div>'
        +     '</div>'
        +   '</div>'
        + '</div>'

        + '</footer>';

    /* -------------------------------------------------------
       DOM injection — runs synchronously at script-parse time.
       Since this script is placed at the bottom of <body>,
       all elements already exist in the DOM.
    ------------------------------------------------------- */

    function replaceElement(existing, htmlString) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = htmlString;
        var replacement = wrapper.firstElementChild;
        if (existing && replacement) {
            existing.parentNode.replaceChild(replacement, existing);
        }
    }

    replaceElement(
        document.querySelector('.module-content.module-fullscreen'),
        moduleFullscreenHTML
    );

    replaceElement(
        document.querySelector('header'),
        buildHeader()
    );

    replaceElement(
        document.querySelector('footer.footer-1'),
        footerHTML
    );

}());
