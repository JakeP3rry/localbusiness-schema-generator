# LocalBusiness Schema Generator

A tiny, dependency-free tool that turns your business details into
[schema.org LocalBusiness](https://schema.org/LocalBusiness) JSON-LD structured
data. Paste the output into the `<head>` of your site to help Google understand
your name, address, phone and opening hours.

## Why

`LocalBusiness` structured data is one of the simplest wins in local SEO, but
hand-writing JSON-LD is fiddly and easy to get wrong. This does it for you -
entirely in the browser, no dependencies, nothing sent anywhere.

## Use it

1. Open `index.html` in any browser (or host the two files anywhere static).
2. Fill in your details.
3. Click **Generate JSON-LD** and copy the block into your page `<head>`.

## Files

- `index.html` - the form + output
- `schema.js` - the generator (vanilla JS, no build step)

## Licence

MIT. Use it, fork it, ship it.

---

Built by [DigiSurf Agency](https://www.digisurfagency.com) - websites and local
SEO for UK small businesses.
