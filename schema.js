/*
 * LocalBusiness JSON-LD generator - vanilla JS, no dependencies, no network.
 * Reads the form, builds a schema.org LocalBusiness object, prints the
 * <script type="application/ld+json"> block ready to paste into a site head.
 *
 * Built by DigiSurf Agency - https://www.digisurfagency.com
 */
(function () {
  "use strict";

  function val(id) {
    var el = document.getElementById(id);
    return el && el.value ? el.value.trim() : "";
  }

  // "Mo-Fr 09:00-17:00" -> { dayOfWeek, opens, closes } (schema.org OpeningHoursSpecification)
  function parseHoursLine(line) {
    var m = line.trim().match(/^([A-Za-z-]+)\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/);
    if (!m) { return null; }
    return {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": m[1],
      "opens": m[2],
      "closes": m[3]
    };
  }

  function build() {
    var schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness"
    };

    var name = val("name");
    var url = val("url");
    var phone = val("phone");
    if (name) { schema.name = name; }
    if (url) { schema.url = url; }
    if (phone) { schema.telephone = phone; }

    var street = val("street");
    var locality = val("locality");
    var region = val("region");
    var postcode = val("postcode");
    var country = val("country") || "GB";
    if (street || locality || postcode) {
      schema.address = { "@type": "PostalAddress", "addressCountry": country };
      if (street) { schema.address.streetAddress = street; }
      if (locality) { schema.address.addressLocality = locality; }
      if (region) { schema.address.addressRegion = region; }
      if (postcode) { schema.address.postalCode = postcode; }
    }

    var hoursRaw = val("hours");
    if (hoursRaw) {
      var spec = hoursRaw.split(/\n+/).map(parseHoursLine).filter(Boolean);
      if (spec.length) { schema.openingHoursSpecification = spec; }
    }

    return schema;
  }

  function render() {
    var schema = build();
    var block = '<script type="application/ld+json">\n'
      + JSON.stringify(schema, null, 2)
      + '\n<\/script>';
    document.getElementById("out").textContent = block;
  }

  var btn = document.getElementById("gen");
  if (btn) { btn.addEventListener("click", render); }
})();
