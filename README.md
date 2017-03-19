# kml

template parsers built on top [EJS engine](https://github.com/mde/ejs).

```html
<li ::each="item in items"> <?= item ?> </li>
```

will be transform into:

```html
<!-- EJS -->
<? for(var __i = 0; __i < items.length; __i++){ ?>
    <li ::each> <?= items[__i] ?> </li>
<? } ?>
```
