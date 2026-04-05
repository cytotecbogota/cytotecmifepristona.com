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

    var arrowSvg = '';

    var languageDropdown =
        '';

    /* -------------------------------------------------------
       Module fullscreen (search overlay)
    ------------------------------------------------------- */

    var moduleFullscreenHTML =
        '';

    /* -------------------------------------------------------
       Header (built dynamically for active-nav state)
    ------------------------------------------------------- */

    function buildHeader() {
        return (
            '<header class="header header-light header-topbar" id="navbar-spy">'

          

            /* ---- Navbar ---- */
            + '<nav class="navbar navbar-expand-xl navbar-sticky" id="primary-menu">'
            +   '<a class="navbar-brand" href="index.html">'
            +     '<img class="logo logo-dark" src="assets/images/logo/logo-dark.png" alt="Medisch Logo"/>'
            +     '<img class="logo logo-mobile" src="assets/images/logo/logo-mobile.svg" alt="Medisch Logo"/>'
            +   '</a>'
            +   '<div class="module-holder module-holder-phone">'
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

        /* About / description */
        +       '<div class="col-sm-12 col-md-6 col-lg-4">'
        +         '<div class="footer-widget widget-contact">'
        +           '<div class="footer-widget-title"><h5>Sobre nosotros</h5></div>'
        +           '<div class="widget-content">'
        +             '<p>Brindamos acceso confiable, discreto y acompañado a medicamentos como Mifepristona y Cytotec, respetando siempre la privacidad de cada persona.</p>'
        +             '<p><i class="fas fa-shield-alt"></i> Privacidad garantizada en todo momento.</p>'
        +           '</div>'
        +         '</div>'
        +       '</div>'

        /* Contact info */
        +       '<div class="col-sm-12 col-md-6 col-lg-4">'
        +         '<div class="footer-widget widget-contact">'
        +           '<div class="footer-widget-title"><h5>Contacto</h5></div>'
        +           '<div class="widget-content">'
        +             '<ul>'
        +               '<li><a href="https://wa.me/573245040176"><i class="fab fa-whatsapp"></i> WhatsApp</a></li>'
        +               '<li><a href="mailto:contacto@tusitio.com"><i class="fas fa-envelope"></i> contacto@tusitio.com</a></li>'
        +               '<li><i class="fas fa-clock"></i> Atención todos los días</li>'
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
        +             '<li><a href="page-faqs.html">Preguntas frecuentes</a></li>'
        +             '<li><a href="contact.html">Contacto</a></li>'
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
        +             '<span>© ' + new Date().getFullYear() + ' cytotecmifepristona Todos los derechos reservados.</span>'
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

    /* -------------------------------------------------------
       Floating WhatsApp button
    ------------------------------------------------------- */

    (function injectWhatsApp() {
        var PHONE   = '573245040176';
        var MESSAGE = encodeURIComponent('Hola, me gustaría recibir más información.');
        var HREF    = 'https://wa.me/' + PHONE + '?text=' + MESSAGE;

        /* --- CSS --- */
        var style = document.createElement('style');
        style.textContent = [
            /* Button wrapper */
            '.wa-float{',
            '  position:fixed;bottom:28px;left:24px;z-index:9999;',
            '  display:flex;align-items:center;gap:10px;',
            '  background:#25D366;color:#fff;',
            '  border-radius:50px;',
            '  padding:12px 20px 12px 14px;',
            '  box-shadow:0 6px 24px rgba(37,211,102,.45),0 2px 8px rgba(0,0,0,.18);',
            '  text-decoration:none;font-family:sans-serif;font-size:15px;font-weight:600;',
            '  cursor:pointer;border:none;outline:none;',
            '  animation:waSlideIn .6s cubic-bezier(.22,1,.36,1) both;',
            '  transition:transform .2s ease,box-shadow .2s ease,background .2s ease;',
            '}',
            '.wa-float:hover{',
            '  background:#1ebe5d;transform:translateY(-3px) scale(1.04);',
            '  box-shadow:0 10px 32px rgba(37,211,102,.55),0 4px 12px rgba(0,0,0,.2);',
            '}',
            '.wa-float:active{transform:scale(.97);}',

            /* SVG icon */
            '.wa-float svg{flex-shrink:0;width:28px;height:28px;}',

            /* Label */
            '.wa-float .wa-label{white-space:nowrap;letter-spacing:.01em;}',

            /* Pulse ring */
            '.wa-float::before{',
            '  content:"";position:absolute;inset:-5px;border-radius:inherit;',
            '  border:2.5px solid rgba(37,211,102,.55);',
            '  animation:waPulse 2.2s ease-out infinite;pointer-events:none;',
            '}',

            /* Notification dot */
            '.wa-float .wa-dot{',
            '  position:absolute;top:-4px;right:-4px;',
            '  width:12px;height:12px;border-radius:50%;',
            '  background:#ff3b3b;border:2px solid #fff;',
            '  animation:waBlink 1.4s ease-in-out infinite;',
            '}',

            /* Keyframes */
            '@keyframes waSlideIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}',
            '@keyframes waPulse{0%{transform:scale(1);opacity:.7}70%{transform:scale(1.18);opacity:0}100%{opacity:0}}',
            '@keyframes waBlink{0%,100%{opacity:1}50%{opacity:.3}}',

            /* Mobile — compact (icon only + small label) */
            '@media(max-width:600px){',
            '  .wa-float{padding:12px;border-radius:50%;gap:0;}',
            '  .wa-float .wa-label{display:none;}',
            '  .wa-float svg{width:26px;height:26px;}',
            '}',
        ].join('');
        document.head.appendChild(style);

        /* --- HTML --- */
        var btn = document.createElement('a');
        btn.className  = 'wa-float';
        btn.href       = HREF;
        btn.target     = '_blank';
        btn.rel        = 'noopener noreferrer';
        btn.setAttribute('aria-label', 'Escríbenos por WhatsApp');
        btn.innerHTML  =
            '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
            + '<circle cx="16" cy="16" r="16" fill="#fff"/>'
            + '<path fill="#25D366" d="M16 5.5C10.201 5.5 5.5 10.201 5.5 16c0 1.86.487 3.608 1.34 5.12L5.5 26.5l5.52-1.322A10.447 10.447 0 0016 26.5c5.799 0 10.5-4.701 10.5-10.5S21.799 5.5 16 5.5zm0 19.25a8.71 8.71 0 01-4.44-1.214l-.318-.19-3.276.784.81-3.185-.208-.328A8.706 8.706 0 017.25 16c0-4.825 3.925-8.75 8.75-8.75S24.75 11.175 24.75 16 20.825 24.75 16 24.75zm4.8-6.55c-.263-.132-1.558-.768-1.799-.856-.24-.088-.415-.132-.59.133-.175.264-.678.856-.83 1.031-.154.176-.307.198-.57.066-.264-.132-1.113-.41-2.12-1.308-.784-.7-1.313-1.563-1.467-1.827-.153-.264-.016-.406.116-.537.118-.118.263-.307.395-.46.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.131-.59-1.424-.808-1.95-.213-.512-.43-.443-.59-.451l-.503-.009a.965.965 0 00-.7.33c-.24.263-.918.898-.918 2.19 0 1.29.94 2.537 1.07 2.712.133.176 1.85 2.824 4.482 3.96.627.27 1.116.432 1.497.554.629.2 1.201.172 1.653.104.504-.075 1.558-.637 1.778-1.252.22-.615.22-1.141.153-1.252-.064-.11-.24-.175-.503-.307z"/>'
            + '</svg>'
            + '<span class="wa-label">Escríbenos</span>'
            + '<span class="wa-dot" aria-hidden="true"></span>';

        document.body.appendChild(btn);
    }());

}());
