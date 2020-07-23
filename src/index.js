import "./css/global.scss";

import "typeface-inter";
import "alpinejs";
import Prism from "prismjs";

// FontAwesome
// Selectively import icons that we're using in order to minimize the build size.
// See: https://fontawesome.com/how-to-use/javascript-api/setup/importing-icons
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
    faPlayCircle,
    faSpinner,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookSquare,
    faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
library.add(
    faPlayCircle,
    faSpinner,
    faUserCircle,
    faFacebookSquare,
    faTwitterSquare,
);
// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch();


window.addEventListener('DOMContentLoaded', (event) => {
    // Light and responsive YouTube video embeds
    // Credits: https://www.labnol.org/internet/light-youtube-embeds/27941/
    // Embed as: <div class="youtube-player" data-id="VIDEO_ID"></div>
    (function() {
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = youtubeThumb(v[n].dataset.id);
            div.onclick = youtubeIframe;
            v[n].appendChild(div);
        }
    }());

    // Prism syntax highlighting
    document.querySelectorAll('pre[class*=language-]').forEach(function(node) {
        node.classList.add('line-numbers');
    });
    Prism.highlightAll();

    // Open links to external domains found in a post in a new tab
    document.querySelectorAll('.post-full-content a').forEach((link) => {
        var a = new RegExp('/' + window.location.host + '/');
        if (!a.test(link.href)) {
            link.setAttribute("rel", "external");
            link.setAttribute("target", "_blank");
        }
    });
});


function youtubeThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
        play = '<div class="play"><i class="fas fa-play-circle fa-5x"></i></div>';
    return thumb.replace("ID", id) + play;
}

function youtubeIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube-nocookie.com/embed/ID?enablejsapi=1&amp;rel=0&amp;autoplay=1&amp;fs=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}