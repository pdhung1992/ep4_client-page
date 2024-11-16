

export const loadScripts = () => {
    const scripts = [
        { src: '/assets/js/vendor/jquery-3.6.0.min.js' },
        { src: '/assets/js/isotope.pkgd.min.js', defer: true },
        { src: '/assets/js/imagesloaded.pkgd.min.js', defer: true },
        // { src: '/assets/js/jquery.odometer.min.js', defer: true },
        // { src: '/assets/js/jquery.appear.js', defer: true },
        // { src: '/assets/js/ajax-form.js', defer: true },
        { src: '/assets/js/wow.min.js', defer: true },
        { src: '/assets/js/aos.js', defer: true },
        { src: '/assets/js/plugins.js', defer: true },
        { src: '/assets/js/main.js', defer: true }
    ];

    scripts.forEach(({ src, async = false, defer = false }) => {
        const script = document.createElement('script');
        script.src = src;
        if (async) script.async = true;
        if (defer) script.defer = true;
        document.body.appendChild(script);
    });
};
