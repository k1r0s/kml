# kml

template parsers built on top [EJS engine](https://github.com/mde/ejs).

```html
<li ::each="item in items"> <?= item ?> </li>
```

will be transform into:

```html
<!-- EJS -->
<? for(var __i = 0; __i < items.length; __i++){ ?>
    <li ::each="item in items"> <?= items[__i] ?> </li>
<? } ?>
```
---

```html
<button ::on-click="sayHello()">Go!</button>

```

will be transform into:

```html
<!-- EJS -->
<button kfdhua9d::on-click="sayHello()">Go!</button>
<?
$$on("click", "::kfdhua9d", function(){
    sayHello();
})
?>
```
