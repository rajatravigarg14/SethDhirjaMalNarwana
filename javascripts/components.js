document.addEventListener("DOMContentLoaded", function () {
    ensureHeadAssets();
    renderHeader();
    renderFooter();
    renderBackToTop();
});

function ensureHeadAssets() {
    var headerEl = document.getElementById("header-component");
    var root = headerEl ? (headerEl.getAttribute("data-root") || "") : "";

    // Dynamically guarantee Favicon presence across all pages
    if (!document.querySelector("link[rel*='icon']")) {
        var favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.type = "image/x-icon";
        favicon.href = root + "icons/house.png";
        document.head.appendChild(favicon);
    }

    // Dynamically guarantee Google Fonts & CDN Preconnects for performance
    if (!document.querySelector("link[href*='fonts.googleapis.com'][rel='preconnect']")) {
        var pre1 = document.createElement("link");
        pre1.rel = "preconnect";
        pre1.href = "https://fonts.googleapis.com";
        document.head.appendChild(pre1);

        var pre2 = document.createElement("link");
        pre2.rel = "preconnect";
        pre2.href = "https://fonts.gstatic.com";
        pre2.crossOrigin = "anonymous";
        document.head.appendChild(pre2);

        var pre3 = document.createElement("link");
        pre3.rel = "preconnect";
        pre3.href = "https://cdnjs.cloudflare.com";
        document.head.appendChild(pre3);

        var pre4 = document.createElement("link");
        pre4.rel = "preconnect";
        pre4.href = "https://stackpath.bootstrapcdn.com";
        document.head.appendChild(pre4);
    }

    // Link webmanifest for PWA / Mobile Add-to-Home-Screen
    if (!document.querySelector("link[rel='manifest']")) {
        var manifest = document.createElement("link");
        manifest.rel = "manifest";
        manifest.href = root + "site.webmanifest";
        document.head.appendChild(manifest);
    }
}

function renderHeader() {
    var headerEl = document.getElementById("header-component");
    if (!headerEl) return;

    var root = headerEl.getAttribute("data-root") || "";
    var currentPath = window.location.pathname.split("/").pop() || "index.html";
    if (currentPath === "") currentPath = "index.html";

    // Central Config - Change logo, title, or links here for the entire site!
    var siteConfig = {
        brandTitle: "Seth Dhirja Mal",
        brandLogo: "", // Optional image logo URL relative to root, e.g. "icons/logo.png"
        homeIcon: root + "icons/house.png",
        heartIcon: root + "icons/heart.png",
        navLinks: [
            { name: "Pedigree", url: root + "pedigree.html", file: "pedigree.html" },
            { name: "Families", url: root + "parichya.html", file: "parichya.html" },
            { name: "Monuments", url: root + "monuments.html", file: "monuments.html" },
            { name: "Gallery", url: root + "gallery.html", file: "gallery.html" },
            { name: "Achievements", url: root + "achievements.html", file: "achievements.html" },
            { name: "Contacts", url: root + "contacts.html", file: "contacts.html" }
        ],
        dropdownTitle: "Dhirjas",
        dropdownItems: [
            { name: "Celebrations@2019", url: root + "celebrations/2019/party.html", file: "party.html" },
            { name: "Celebrations@2018", url: root + "celebrations/2018/party.html", file: "party.html" }
        ],
        contactButtonText: "Contact Us",
        contactButtonUrl: root + "contactus.html",
        contactButtonFile: "contactus.html"
    };

    var navLinksHtml = "";
    // Home icon link
    var isHomeActive = (currentPath === "index.html" || currentPath === "") ? "active" : "";
    navLinksHtml += '<li class="nav-item ' + isHomeActive + '">';
    navLinksHtml += '<a class="nav-link" href="' + root + 'index.html" aria-label="Home"><img src="' + siteConfig.homeIcon + '" alt="Home"></a>';
    navLinksHtml += '</li>';

    // Standard nav links
    for (var i = 0; i < siteConfig.navLinks.length; i++) {
        var link = siteConfig.navLinks[i];
        var isActive = (currentPath === link.file) ? "active" : "";
        navLinksHtml += '<li class="nav-item ' + isActive + '">';
        navLinksHtml += '<a class="nav-link" href="' + link.url + '">' + link.name + '</a>';
        navLinksHtml += '</li>';
    }

    // Dropdown menu
    navLinksHtml += '<li class="nav-item dropdown">';
    navLinksHtml += '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
    navLinksHtml += siteConfig.dropdownTitle + ' <img src="' + siteConfig.heartIcon + '" alt="Heart Icon">';
    navLinksHtml += '</a>';
    navLinksHtml += '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">';
    for (var j = 0; j < siteConfig.dropdownItems.length; j++) {
        var dropItem = siteConfig.dropdownItems[j];
        if (j > 0) navLinksHtml += '<div class="dropdown-divider"></div>';
        navLinksHtml += '<a class="dropdown-item" href="' + dropItem.url + '">' + dropItem.name + '</a>';
    }
    navLinksHtml += '</div></li>';

    // Contact button
    var isContactActive = (currentPath === siteConfig.contactButtonFile) ? "active" : "";
    navLinksHtml += '<li class="nav-item">';
    navLinksHtml += '<a class="btn btn-primary contact-primary-button ' + isContactActive + '" href="' + siteConfig.contactButtonUrl + '">' + siteConfig.contactButtonText + '</a>';
    navLinksHtml += '</li>';

    // Brand logo + title
    var brandContent = '';
    if (siteConfig.brandLogo) {
        brandContent += '<img src="' + root + siteConfig.brandLogo + '" alt="' + siteConfig.brandTitle + ' Logo" class="navbar-logo mr-2" style="max-height: 40px; vertical-align: middle;"> ';
    }
    brandContent += '<h2 style="display: inline-block; margin-bottom: 0;">' + siteConfig.brandTitle + '</h2>';

    var headerMarkup = 
        '<div class="container-fluid">' +
            '<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">' +
                '<a class="navbar-brand d-flex align-items-center" href="' + root + 'index.html">' +
                    brandContent +
                '</a>' +
                '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" ' +
                    'aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
                    '<span class="navbar-toggler-icon"></span>' +
                '</button>' +
                '<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
                    '<ul class="navbar-nav ml-auto align-items-lg-center">' +
                        navLinksHtml +
                    '</ul>' +
                '</div>' +
            '</nav>' +
        '</div>';

    headerEl.innerHTML = headerMarkup;
}

function renderFooter() {
    var footerEl = document.getElementById("footer-component");
    if (!footerEl) return;

    var root = footerEl.getAttribute("data-root") || "";

    var footerMarkup = 
        '<footer class="footer-style">' +
            '<div class="container">' +
                '<div class="mb-2">' +
                    '<a href="' + root + 'index.html" class="mx-1"><span class="badge badge-pill badge-warning">Welcome</span></a>' +
                    '<a href="' + root + 'pedigree.html" class="mx-1"><span class="badge badge-pill badge-warning">Pedigree</span></a>' +
                    '<a href="' + root + 'monuments.html" class="mx-1"><span class="badge badge-pill badge-warning">Monuments</span></a>' +
                    '<a href="' + root + 'gallery.html" class="mx-1"><span class="badge badge-pill badge-warning">Gallery</span></a>' +
                    '<a href="' + root + 'contacts.html" class="mx-1"><span class="badge badge-pill badge-warning">Contacts</span></a>' +
                    '<a href="' + root + 'contactus.html" class="mx-1"><span class="badge badge-pill badge-warning">Contact Us</span></a>' +
                '</div>' +
                '<p class="mb-0 text-muted" style="font-size: 0.9rem; color: #ccc !important;">© 2018 RR Web Developers +91-8168499570</p>' +
            '</div>' +
        '</footer>';

    footerEl.innerHTML = footerMarkup;
}

function renderBackToTop() {
    var btn = document.createElement("button");
    btn.id = "backToTopBtn";
    btn.innerHTML = "&#8593;";
    btn.title = "Go to top";
    btn.setAttribute("aria-label", "Back to top");
    btn.style.cssText = "display: none; position: fixed; bottom: 25px; right: 25px; z-index: 999; width: 45px; height: 45px; font-size: 22px; font-weight: bold; border: 2px solid goldenrod; background-color: #343a40; color: goldenrod; border-radius: 50%; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.5);";

    btn.addEventListener("mouseover", function() {
        btn.style.backgroundColor = "goldenrod";
        btn.style.color = "#343a40";
    });
    btn.addEventListener("mouseout", function() {
        btn.style.backgroundColor = "#343a40";
        btn.style.color = "goldenrod";
    });

    btn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(btn);

    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });
}
